"use server";

import { headers } from "next/headers";
import { z } from "zod";
import {
  FROM_EMAIL,
  INBOX_EMAIL,
  resend,
} from "@/lib/email/resend-client";
import {
  buildAccuseEmail,
  buildAdminEmail,
  type DatingInscriptionData,
} from "@/lib/email/templates/dating-inscription";

const FORMATIONS = [
  "BTS MCO",
  "BTS NDRC",
  "BTS GPME",
  "BTS CG",
  "BTS MOS",
  "TP ADVF",
] as const;

const ZONES = ["Drôme", "Ardèche", "Vaucluse", "Gard", "Autre"] as const;
const POSTES = ["1", "2-3", "4-5", "6+"] as const;
const CIVILITES = ["M.", "Mme"] as const;

const PHONE_FR_REGEX = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const SIRET_REGEX = /^\d{14}$/;

export const DatingInscriptionSchema = z.object({
  civilite: z.enum(CIVILITES, { message: "Civilité invalide" }),
  prenom: z.string().trim().min(2, "Le prénom est requis (2 caractères min.)"),
  nom: z.string().trim().min(2, "Le nom est requis (2 caractères min.)"),
  fonction: z.string().trim().min(2, "Votre fonction est requise"),
  entreprise: z.string().trim().min(2, "Le nom de l'entreprise est requis"),
  siret: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v.replace(/\s/g, "") : undefined))
    .refine(
      (v) => v === undefined || SIRET_REGEX.test(v),
      "Le SIRET doit contenir 14 chiffres",
    ),
  email: z.string().trim().toLowerCase().email("Email invalide"),
  telephone: z
    .string()
    .trim()
    .refine(
      (v) => PHONE_FR_REGEX.test(v),
      "Numéro de téléphone français invalide",
    ),
  secteurActivite: z.string().trim().min(2, "Le secteur d'activité est requis"),
  zoneGeo: z.enum(ZONES, { message: "Zone géographique invalide" }),
  formations: z
    .array(z.enum(FORMATIONS))
    .min(1, "Sélectionnez au moins une formation"),
  nbPostes: z.enum(POSTES, { message: "Indiquez un nombre de postes" }),
  commentaire: z
    .string()
    .trim()
    .max(2000, "Commentaire trop long (2000 caractères max.)")
    .optional(),
  consentementRGPD: z.literal(true, {
    message: "Le consentement RGPD est obligatoire",
  }),
  botcheck: z.string().max(0).optional().or(z.literal("")),
});

export type DatingInscriptionInput = z.infer<typeof DatingInscriptionSchema>;

export type DatingActionState = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  fieldValues?: Partial<Record<keyof DatingInscriptionInput, string | string[]>>;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number>();

function getClientIp(forwardedFor: string | null): string {
  if (!forwardedFor) return "unknown";
  const first = forwardedFor.split(",")[0]?.trim();
  return first || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, ts] of rateLimitStore) {
    if (now - ts > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
  }
  const last = rateLimitStore.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW_MS) return true;
  rateLimitStore.set(ip, now);
  return false;
}

export async function submitDatingInscription(
  _prevState: DatingActionState,
  formData: FormData,
): Promise<DatingActionState> {
  const raw = {
    civilite: formData.get("civilite"),
    prenom: formData.get("prenom"),
    nom: formData.get("nom"),
    fonction: formData.get("fonction"),
    entreprise: formData.get("entreprise"),
    siret: formData.get("siret"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    secteurActivite: formData.get("secteurActivite"),
    zoneGeo: formData.get("zoneGeo"),
    formations: formData.getAll("formations"),
    nbPostes: formData.get("nbPostes"),
    commentaire: formData.get("commentaire"),
    consentementRGPD: formData.get("consentementRGPD") === "on",
    botcheck: formData.get("botcheck") ?? "",
  };

  // Honeypot — bot detected → pretend success without sending
  if (typeof raw.botcheck === "string" && raw.botcheck.length > 0) {
    return { ok: true };
  }

  const parsed = DatingInscriptionSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      ok: false,
      errors: flat.fieldErrors as Record<string, string[]>,
      message: "Certains champs sont invalides. Merci de corriger.",
      fieldValues: {
        civilite: typeof raw.civilite === "string" ? raw.civilite : undefined,
        prenom: typeof raw.prenom === "string" ? raw.prenom : undefined,
        nom: typeof raw.nom === "string" ? raw.nom : undefined,
        fonction: typeof raw.fonction === "string" ? raw.fonction : undefined,
        entreprise:
          typeof raw.entreprise === "string" ? raw.entreprise : undefined,
        siret: typeof raw.siret === "string" ? raw.siret : undefined,
        email: typeof raw.email === "string" ? raw.email : undefined,
        telephone:
          typeof raw.telephone === "string" ? raw.telephone : undefined,
        secteurActivite:
          typeof raw.secteurActivite === "string"
            ? raw.secteurActivite
            : undefined,
        zoneGeo: typeof raw.zoneGeo === "string" ? raw.zoneGeo : undefined,
        formations: raw.formations.filter(
          (f): f is string => typeof f === "string",
        ),
        nbPostes: typeof raw.nbPostes === "string" ? raw.nbPostes : undefined,
        commentaire:
          typeof raw.commentaire === "string" ? raw.commentaire : undefined,
      },
    };
  }

  // Rate limit — after validation so bots with bad payloads don't burn entries
  const h = await headers();
  const ip = getClientIp(h.get("x-forwarded-for"));
  if (isRateLimited(ip)) {
    return {
      ok: false,
      message:
        "Merci de patienter quelques secondes avant de soumettre à nouveau.",
    };
  }

  const data: DatingInscriptionData = {
    civilite: parsed.data.civilite,
    prenom: parsed.data.prenom,
    nom: parsed.data.nom,
    fonction: parsed.data.fonction,
    entreprise: parsed.data.entreprise,
    siret: parsed.data.siret,
    email: parsed.data.email,
    telephone: parsed.data.telephone,
    secteurActivite: parsed.data.secteurActivite,
    zoneGeo: parsed.data.zoneGeo,
    formations: parsed.data.formations,
    nbPostes: parsed.data.nbPostes,
    commentaire: parsed.data.commentaire,
  };

  const admin = buildAdminEmail(data);
  const accuse = buildAccuseEmail(data);

  try {
    const results = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: INBOX_EMAIL,
        replyTo: data.email,
        subject: admin.subject,
        html: admin.html,
        text: admin.text,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        replyTo: INBOX_EMAIL,
        subject: accuse.subject,
        html: accuse.html,
        text: accuse.text,
      }),
    ]);

    const adminResult = results[0];
    if (adminResult.status === "rejected") {
      console.error(
        "[dating-inscription] admin email failed:",
        adminResult.reason,
      );
      return {
        ok: false,
        message:
          "Erreur technique lors de l'envoi. Réessayez ou contactez-nous au 04 75 00 34 56.",
      };
    }
    if (results[1].status === "rejected") {
      console.error(
        "[dating-inscription] accuse email failed (admin received):",
        results[1].reason,
      );
    }

    return { ok: true };
  } catch (error) {
    console.error("[dating-inscription] unexpected error:", error);
    return {
      ok: false,
      message:
        "Erreur technique lors de l'envoi. Réessayez ou contactez-nous au 04 75 00 34 56.",
    };
  }
}
