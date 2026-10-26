"use server";

import { headers } from "next/headers";
import { z } from "zod";

/**
 * Transmission des candidatures, demandes d'information et demandes du test
 * d'orientation à CADP Connect (POST /api/portail/candidat/pre-inscription).
 *
 * La clé partagée SITE_PREINSCRIPTION_KEY ne quitte jamais le serveur du site.
 * Si CADP Connect ne répond pas ou refuse la demande, `{ ok: false }` invite le
 * formulaire à l'envoyer par e-mail (Web3Forms) : aucune demande n'est perdue.
 */

const CADP_CONNECT_URL = process.env.CADP_CONNECT_URL?.trim() || "https://app.cadp.pro";
const TIMEOUT_MS = 8_000;

const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { windowStart: number; count: number }>();

function getClientIp(forwardedFor: string | null): string {
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
  }
  const current = rateLimitStore.get(ip);
  if (!current) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

// Champs transmis tels quels ; CADP Connect fait la validation métier
const code = z.string().regex(/^[a-z0-9_]{1,40}$/);
const demandeSchema = z.object({
  intention: z.enum(["candidature", "information", "orientation"]),
  prenom: z.string().trim().min(1).max(80),
  nom: z.string().trim().min(1).max(80),
  email: z.string().trim().max(254),
  telephone: z.string().trim().max(30),
  formations: z.array(code).max(8),
  profil: z.string().max(3).optional(),
  recommandations: z.array(z.string().trim().max(120)).max(5).optional(),
  situation: z.string().trim().max(80).optional(),
  ville: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  source: code.optional(),
  url_source: code.optional(),
  consentement_rgpd: z.literal(true),
  botcheck: z.boolean().optional(),
});

export type DemandeCadpConnect = z.input<typeof demandeSchema>;

export type ResultatDemande =
  | { ok: true; statut: "cree" | "existant" }
  | { ok: false; limite?: true };

export async function transmettreDemande(payload: DemandeCadpConnect): Promise<ResultatDemande> {
  const parsed = demandeSchema.safeParse(payload);
  if (!parsed.success) return { ok: false };
  const { botcheck, ...demande } = parsed.data;

  // Honeypot : robot détecté, succès simulé sans transmission
  if (botcheck) return { ok: true, statut: "cree" };

  const h = await headers();
  if (isRateLimited(getClientIp(h.get("x-forwarded-for")))) return { ok: false, limite: true };

  const cle = process.env.SITE_PREINSCRIPTION_KEY;
  if (!cle) {
    console.error("[preinscription] SITE_PREINSCRIPTION_KEY is missing. Set it in Vercel project environment variables.");
    return { ok: false };
  }

  try {
    const response = await fetch(`${CADP_CONNECT_URL}/api/portail/candidat/pre-inscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-cadp-site-key": cle },
      body: JSON.stringify(demande),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const body = (await response.json().catch(() => ({}))) as { statut?: string; error?: string };
    if (response.ok && (body.statut === "cree" || body.statut === "existant")) {
      return { ok: true, statut: body.statut };
    }
    console.error(`[preinscription] CADP Connect ${response.status} (${demande.intention}):`, body.error ?? "réponse inattendue");
  } catch (error) {
    console.error(`[preinscription] CADP Connect injoignable (${demande.intention}):`, error);
  }
  return { ok: false };
}
