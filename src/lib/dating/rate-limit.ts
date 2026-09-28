import "server-only";

/**
 * Limiteur des inscriptions dating, en mémoire de l'instance serveur
 * (meilleur effort : chaque instance a sa propre mémoire).
 *
 * Deux règles :
 * - une même personne (connexion + événement + téléphone ou e-mail) :
 *   un envoi par minute, contre les doubles clics et les renvois ;
 * - une même connexion : 30 envois par 10 minutes, contre les rafales.
 *
 * Une tablette d'accueil ou le Wi-Fi d'une agence peut donc enchaîner
 * les inscriptions de personnes différentes (constat
 * F-SITE-LIMITEUR-IP-PARTAGEE, 28/09/2026).
 */

const PERSON_WINDOW_MS = 60_000;
const IP_WINDOW_MS = 10 * 60_000;
const IP_MAX_IN_WINDOW = 30;

const lastByPerson = new Map<string, number>();
const hitsByIp = new Map<string, number[]>();

export type RateLimitVerdict =
  | { ok: true }
  | { ok: false; reason: "person" | "ip" };

function purge(now: number): void {
  for (const [key, ts] of lastByPerson) {
    if (now - ts >= PERSON_WINDOW_MS) lastByPerson.delete(key);
  }
  for (const [ip, hits] of hitsByIp) {
    const kept = hits.filter((ts) => now - ts < IP_WINDOW_MS);
    if (kept.length > 0) hitsByIp.set(ip, kept);
    else hitsByIp.delete(ip);
  }
}

function personKey(ip: string, eventSlug: string, person: string): string {
  return `${ip}|${eventSlug}|${person}`;
}

/** Vérifie et, si l'envoi est permis, l'enregistre. */
export function checkDatingRateLimit(
  ip: string,
  eventSlug: string,
  person: string,
  now: number = Date.now(),
): RateLimitVerdict {
  purge(now);
  const key = personKey(ip, eventSlug, person);
  const last = lastByPerson.get(key);
  if (last !== undefined && now - last < PERSON_WINDOW_MS) {
    return { ok: false, reason: "person" };
  }
  const hits = hitsByIp.get(ip) ?? [];
  if (hits.length >= IP_MAX_IN_WINDOW) {
    return { ok: false, reason: "ip" };
  }
  lastByPerson.set(key, now);
  hits.push(now);
  hitsByIp.set(ip, hits);
  return { ok: true };
}

/**
 * Libère la personne après un échec d'envoi, pour qu'elle puisse
 * réessayer tout de suite. Le compteur de la connexion est conservé.
 */
export function releaseDatingRateLimit(
  ip: string,
  eventSlug: string,
  person: string,
): void {
  lastByPerson.delete(personKey(ip, eventSlug, person));
}

const CONFIRMATION_WINDOW_MS = 24 * 60 * 60_000;
const confirmationsByRecipient = new Map<string, number>();

/**
 * Une seule confirmation par adresse et par événement sur 24 h : l'adresse
 * saisie n'est pas vérifiée, le formulaire ne doit pas servir à inonder une
 * boîte tierce. La notification interne, elle, part toujours.
 */
export function claimConfirmation(
  eventSlug: string,
  email: string,
  now: number = Date.now(),
): boolean {
  for (const [key, ts] of confirmationsByRecipient) {
    if (now - ts >= CONFIRMATION_WINDOW_MS) confirmationsByRecipient.delete(key);
  }
  const key = `${eventSlug}|${email.toLowerCase()}`;
  if (confirmationsByRecipient.has(key)) return false;
  confirmationsByRecipient.set(key, now);
  return true;
}

/** Rend la confirmation possible à nouveau après un échec d'envoi. */
export function releaseConfirmation(eventSlug: string, email: string): void {
  confirmationsByRecipient.delete(`${eventSlug}|${email.toLowerCase()}`);
}

/** Première adresse de `x-forwarded-for` (client), ou "unknown". */
export function getClientIp(forwardedFor: string | null): string {
  if (!forwardedFor) return "unknown";
  const first = forwardedFor.split(",")[0]?.trim();
  return first || "unknown";
}
