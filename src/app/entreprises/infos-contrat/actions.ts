"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { FROM_EMAIL, INBOX_EMAIL, resend } from "@/lib/email/resend-client";
import {
  buildAccuseEmail,
  buildCfaEmail,
} from "@/lib/email/templates/contrat-infos";
import { SIRET_REGEX } from "@/app/entreprises/alternance-dating/schema";
import { infosContratSchema } from "./schema";

const SEND_ERROR_MESSAGE =
  "L'envoi a échoué, vos informations n'ont pas été transmises. Merci de réessayer dans quelques instants ou de nous écrire à contact@cadp.pro.";

const RATE_LIMIT_WINDOW_MS = 60_000;
const submitRateLimitStore = new Map<string, number>();

function getClientIp(forwardedFor: string | null): string {
  if (!forwardedFor) return "unknown";
  const first = forwardedFor.split(",")[0]?.trim();
  return first || "unknown";
}

function checkSubmitRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, ts] of submitRateLimitStore) {
    if (now - ts > RATE_LIMIT_WINDOW_MS) submitRateLimitStore.delete(key);
  }
  const last = submitRateLimitStore.get(ip);
  return Boolean(last && now - last < RATE_LIMIT_WINDOW_MS);
}

function markSubmitRateLimited(ip: string): void {
  submitRateLimitStore.set(ip, Date.now());
}

export async function submitInfosContrat(
  payload: unknown,
): Promise<
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
> {
  // Honeypot — bot detected → pretend success without sending
  if (
    typeof payload === "object" &&
    payload !== null &&
    "botcheck" in payload &&
    typeof (payload as { botcheck: unknown }).botcheck === "string" &&
    (payload as { botcheck: string }).botcheck.length > 0
  ) {
    return { ok: true };
  }

  const h = await headers();
  const ip = getClientIp(h.get("x-forwarded-for"));
  if (checkSubmitRateLimited(ip)) {
    return {
      ok: false,
      error:
        "Trop de tentatives. Merci de patienter une minute avant de réessayer.",
    };
  }

  const parsed = infosContratSchema.safeParse(payload);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      ok: false,
      error: "Certains champs sont invalides ou manquants.",
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
    };
  }

  markSubmitRateLimited(ip);

  const cfaEmail = process.env.CONTRAT_CFA_EMAIL;
  if (!cfaEmail) {
    console.error(
      "[infos-contrat] CONTRAT_CFA_EMAIL is missing or empty. Set it in Vercel project environment variables.",
    );
    return { ok: false, error: SEND_ERROR_MESSAGE };
  }

  const data = parsed.data;
  const cfaMail = buildCfaEmail(data);

  // Envoi principal (bloquant) — resend v6 résout avec { data, error } sans throw
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [cfaEmail, INBOX_EMAIL],
      replyTo: data.interlocuteur_email,
      subject: cfaMail.subject,
      html: cfaMail.html,
      text: cfaMail.text,
    });
    if (error) {
      console.error("[infos-contrat] CFA email failed:", error);
      return { ok: false, error: SEND_ERROR_MESSAGE };
    }
  } catch (error) {
    console.error("[infos-contrat] CFA email failed:", error);
    return { ok: false, error: SEND_ERROR_MESSAGE };
  }

  // Accusé de réception (best-effort, non bloquant)
  const accuse = buildAccuseEmail(data);
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.interlocuteur_email,
      replyTo: INBOX_EMAIL,
      subject: accuse.subject,
      html: accuse.html,
      text: accuse.text,
    });
    if (error) {
      console.error(
        "[infos-contrat] accuse email failed (CFA email sent):",
        error,
      );
    }
  } catch (error) {
    console.error(
      "[infos-contrat] accuse email failed (CFA email sent):",
      error,
    );
  }

  return { ok: true };
}

const LOOKUP_RATE_LIMIT_MAX = 10;
const lookupRateLimitStore = new Map<
  string,
  { windowStart: number; count: number }
>();

function isLookupRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, entry] of lookupRateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      lookupRateLimitStore.delete(key);
    }
  }
  const current = lookupRateLimitStore.get(ip);
  if (!current) {
    lookupRateLimitStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  if (current.count >= LOOKUP_RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

export async function lookupSiret(
  siretInput: string,
): Promise<
  { ok: true; raisonSociale: string; adresse: string | null } | { ok: false }
> {
  try {
    const siret = siretInput.replace(/\s/g, "");
    if (!SIRET_REGEX.test(siret)) {
      return { ok: false };
    }

    const h = await headers();
    const ip = getClientIp(h.get("x-forwarded-for"));
    if (isLookupRateLimited(ip)) {
      return { ok: false };
    }

    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siret}&page=1&per_page=1`,
      { signal: AbortSignal.timeout(4000), cache: "no-store" },
    );
    if (!response.ok) {
      console.error(
        `[infos-contrat] SIRET lookup HTTP ${response.status} for ${siret}`,
      );
      return { ok: false };
    }

    const json: unknown = await response.json();
    const body = json as {
      total_results?: number;
      results?: Array<{
        nom_complet?: string;
        nom_raison_sociale?: string;
        matching_etablissements?: Array<{ adresse?: string }>;
        siege?: { siret?: string; adresse?: string };
      }>;
    } | null;

    const first = body?.results?.[0];
    if (!body?.total_results || !first) {
      return { ok: false };
    }

    const raisonSociale = first.nom_complet ?? first.nom_raison_sociale;
    if (!raisonSociale) {
      return { ok: false };
    }

    let adresse: string | null = null;
    if (first.matching_etablissements?.[0]?.adresse) {
      adresse = first.matching_etablissements[0].adresse;
    } else if (first.siege?.siret === siret && first.siege?.adresse) {
      adresse = first.siege.adresse;
    }

    return { ok: true, raisonSociale, adresse };
  } catch (error) {
    console.error("[infos-contrat] SIRET lookup failed:", error);
    return { ok: false };
  }
}
