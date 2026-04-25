import { z } from "zod";

export const FORMATIONS = [
  "BTS MCO",
  "BTS NDRC",
  "BTS GPME",
  "BTS CG",
  "BTS MOS",
  "TP ADVF",
] as const;

export const ZONES = ["Drôme", "Ardèche", "Vaucluse", "Gard", "Autre"] as const;
export const POSTES = ["1", "2-3", "4-5", "6+"] as const;
export const CIVILITES = ["M.", "Mme"] as const;

export const PHONE_FR_REGEX = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
export const SIRET_REGEX = /^\d{14}$/;

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
