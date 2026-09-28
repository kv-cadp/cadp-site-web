"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import {
  DATING_INBOX_EMAIL,
  FROM_EMAIL,
  resend,
} from "@/lib/email/resend-client";
import {
  buildCandidatAdminEmail,
  buildCandidatConfirmationEmail,
  buildEmployeurAdminEmail,
  buildEmployeurConfirmationEmail,
  type BuiltEmail,
} from "@/lib/email/templates/dating-registration";
import { normalizePhoneFr } from "@/lib/validation";
import { getOpenDatingBySlug } from "./events";
import type { DatingFormState } from "./options";
import {
  checkDatingRateLimit,
  claimConfirmation,
  getClientIp,
  releaseConfirmation,
  releaseDatingRateLimit,
} from "./rate-limit";
import { DatingCandidatSchema, DatingEmployeurSchema } from "./schema";

type Audience = "candidat" | "employeur";

const PHONE = "04 75 00 34 56";

const MESSAGES: Record<Audience, Record<"closed" | "tooSoon" | "sendError", string>> = {
  candidat: {
    closed: `Les inscriptions en ligne à cet Alternance Dating sont closes. Pour toute question : ${PHONE}.`,
    tooSoon:
      "Votre inscription vient d'être envoyée. Patientez une minute avant un nouvel envoi.",
    sendError: `L'envoi n'a pas abouti : votre inscription n'est pas enregistrée. Réessayez dans un instant ou appelez-nous au ${PHONE}.`,
  },
  employeur: {
    closed: `Les confirmations en ligne pour cet Alternance Dating sont closes. Pour toute question : ${PHONE}.`,
    tooSoon:
      "Votre confirmation vient d'être envoyée. Patientez une minute avant un nouvel envoi.",
    sendError: `L'envoi n'a pas abouti : votre confirmation n'est pas enregistrée. Réessayez dans un instant ou appelez-nous au ${PHONE}.`,
  },
};
const MSG_INVALID = "Certains champs sont à corriger.";
const MSG_TOO_MANY = `Trop d'envois depuis cette connexion. Réessayez dans quelques minutes ou appelez-nous au ${PHONE}.`;

/** Attentes avant chaque nouvel essai d'envoi (limite de débit, panne). */
const RETRY_DELAYS_MS = [800, 1600];

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function fieldErrors(error: z.ZodError): Record<string, string[]> {
  return z.flattenError(error).fieldErrors as Record<string, string[]>;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Envoi par Resend. Le SDK ne lève pas d'exception sur un refus de l'API :
 * il renvoie `{ error }`, qu'il faut lire (sinon un échec passe pour un
 * succès). Nouvel essai sur limite de débit (429), panne (5xx) ou coupure
 * réseau, avec la même clé d'idempotence : Resend n'envoie qu'une fois.
 */
async function sendEmail(
  to: string,
  replyTo: string | undefined,
  email: BuiltEmail,
  idempotencyKey: string,
): Promise<boolean> {
  for (let attempt = 0; ; attempt++) {
    let retryable = false;
    try {
      const { error } = await resend.emails.send(
        {
          from: FROM_EMAIL,
          to,
          ...(replyTo ? { replyTo } : {}),
          subject: email.subject,
          html: email.html,
          text: email.text,
        },
        { idempotencyKey },
      );
      if (!error) return true;
      const status = (error as { statusCode?: number | null }).statusCode;
      retryable = status === 429 || status == null || status >= 500;
      console.error(`[dating] envoi refusé par Resend (essai ${attempt + 1}) :`, error);
    } catch (err) {
      retryable = true;
      console.error(`[dating] envoi en échec (essai ${attempt + 1}) :`, err);
    }
    if (!retryable || attempt >= RETRY_DELAYS_MS.length) return false;
    await sleep(RETRY_DELAYS_MS[attempt]);
  }
}

export async function submitDatingCandidat(
  _prev: DatingFormState,
  formData: FormData,
): Promise<DatingFormState> {
  // Pot de miel : un robot remplit le champ caché, on simule un succès.
  if (field(formData, "botcheck").length > 0) return { ok: true };

  const consentement = formData.get("consentement") === "on";
  const values: Record<string, string> = {
    prenom: field(formData, "prenom"),
    nom: field(formData, "nom"),
    telephone: field(formData, "telephone"),
    email: field(formData, "email"),
    commune: field(formData, "commune"),
    permis: field(formData, "permis"),
    vehicule: field(formData, "vehicule"),
    consentement: consentement ? "on" : "",
  };

  const parsed = DatingCandidatSchema.safeParse({
    ...values,
    eventSlug: field(formData, "eventSlug"),
    consentement,
  });
  if (!parsed.success) {
    return {
      ok: false,
      errors: fieldErrors(parsed.error),
      message: MSG_INVALID,
      values,
    };
  }
  const data = parsed.data;
  const messages = MESSAGES.candidat;

  const event = getOpenDatingBySlug(data.eventSlug);
  if (!event) return { ok: false, message: messages.closed, values };

  const ip = getClientIp((await headers()).get("x-forwarded-for"));
  const person = normalizePhoneFr(data.telephone);
  const verdict = checkDatingRateLimit(ip, event.slug, person);
  if (!verdict.ok) {
    return {
      ok: false,
      message: verdict.reason === "person" ? messages.tooSoon : MSG_TOO_MANY,
      values,
    };
  }

  const submissionId = randomUUID();

  // Notification d'abord : sans elle, l'inscription n'existe pas.
  const notified = await sendEmail(
    DATING_INBOX_EMAIL,
    data.email,
    buildCandidatAdminEmail(data, event),
    `dating/${submissionId}/notification`,
  );
  if (!notified) {
    releaseDatingRateLimit(ip, event.slug, person);
    return { ok: false, message: messages.sendError, values };
  }

  let confirmationSent = false;
  if (data.email && claimConfirmation(event.slug, data.email)) {
    confirmationSent = await sendEmail(
      data.email,
      DATING_INBOX_EMAIL,
      buildCandidatConfirmationEmail(data, event),
      `dating/${submissionId}/confirmation`,
    );
    if (!confirmationSent) releaseConfirmation(event.slug, data.email);
  }

  return { ok: true, confirmationSent };
}

export async function submitDatingEmployeur(
  _prev: DatingFormState,
  formData: FormData,
): Promise<DatingFormState> {
  if (field(formData, "botcheck").length > 0) return { ok: true };

  const consentement = formData.get("consentement") === "on";
  const values: Record<string, string> = {
    entreprise: field(formData, "entreprise"),
    prenom: field(formData, "prenom"),
    nom: field(formData, "nom"),
    fonction: field(formData, "fonction"),
    email: field(formData, "email"),
    telephone: field(formData, "telephone"),
    nbPostes: field(formData, "nbPostes"),
    nbParticipants: field(formData, "nbParticipants"),
    siret: field(formData, "siret"),
    commentaire: field(formData, "commentaire"),
    consentement: consentement ? "on" : "",
  };

  const parsed = DatingEmployeurSchema.safeParse({
    ...values,
    eventSlug: field(formData, "eventSlug"),
    consentement,
  });
  if (!parsed.success) {
    return {
      ok: false,
      errors: fieldErrors(parsed.error),
      message: MSG_INVALID,
      values,
    };
  }
  const data = parsed.data;
  const messages = MESSAGES.employeur;

  const event = getOpenDatingBySlug(data.eventSlug);
  if (!event) return { ok: false, message: messages.closed, values };

  const ip = getClientIp((await headers()).get("x-forwarded-for"));
  const person = data.email;
  const verdict = checkDatingRateLimit(ip, event.slug, person);
  if (!verdict.ok) {
    return {
      ok: false,
      message: verdict.reason === "person" ? messages.tooSoon : MSG_TOO_MANY,
      values,
    };
  }

  const submissionId = randomUUID();

  const notified = await sendEmail(
    DATING_INBOX_EMAIL,
    data.email,
    buildEmployeurAdminEmail(data, event),
    `dating/${submissionId}/notification`,
  );
  if (!notified) {
    releaseDatingRateLimit(ip, event.slug, person);
    return { ok: false, message: messages.sendError, values };
  }

  let confirmationSent = false;
  if (claimConfirmation(event.slug, data.email)) {
    confirmationSent = await sendEmail(
      data.email,
      DATING_INBOX_EMAIL,
      buildEmployeurConfirmationEmail(data, event),
      `dating/${submissionId}/confirmation`,
    );
    if (!confirmationSent) releaseConfirmation(event.slug, data.email);
  }

  return { ok: true, confirmationSent };
}
