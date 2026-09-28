/**
 * Dates et heures du fuseau Europe/Paris, indépendantes du fuseau du
 * serveur (Vercel exécute le rendu en UTC).
 */

const PARIS_DATE_PARTS = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Date du jour à Paris, au format AAAA-MM-JJ.
 * Ex : 11/11/2026 à 23 h 30 UTC → "2026-11-12".
 */
export function parisTodayIso(now: Date = new Date()): string {
  const parts = PARIS_DATE_PARTS.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

const PARIS_DATETIME_PARTS = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * Date et heure locales de Paris, au format AAAA-MM-JJTHH:MM (comparable
 * comme une chaîne). Ex : 12/11/2026 à 15 h UTC → "2026-11-12T16:00".
 */
export function parisNowLocal(now: Date = new Date()): string {
  const parts = PARIS_DATETIME_PARTS.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

/** Dernier dimanche d'un mois (0 = janvier), à 01:00 UTC. */
function lastSundayAt1hUtc(year: number, month: number): number {
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const offsetToSunday = lastDay.getUTCDay(); // 0 = dimanche
  return Date.UTC(year, month, lastDay.getUTCDate() - offsetToSunday, 1, 0, 0);
}

/**
 * Décalage UTC de l'heure de Paris pour une date et une heure locales.
 * Règle européenne : heure d'été du dernier dimanche de mars au dernier
 * dimanche d'octobre, bascules à 01:00 UTC.
 * Ex : ("2026-11-12", "14:00") → "+01:00" ; ("2026-09-23", "14:00") → "+02:00".
 */
export function parisUtcOffset(
  dateIso: string,
  time: string = "12:00",
): "+01:00" | "+02:00" {
  const [year, month, day] = dateIso.split("-").map((v) => parseInt(v, 10));
  const [hours, minutes] = time.split(":").map((v) => parseInt(v, 10));
  // Instant calculé en heure d'hiver (UTC+1), comparé aux bascules.
  const instant = Date.UTC(year, month - 1, day, hours - 1, minutes);
  const summerStart = lastSundayAt1hUtc(year, 2);
  const summerEnd = lastSundayAt1hUtc(year, 9);
  return instant >= summerStart && instant < summerEnd ? "+02:00" : "+01:00";
}

/** Date et heure locales de Paris au format ISO 8601 avec décalage. */
export function toParisIso8601(dateIso: string, time: string): string {
  return `${dateIso}T${time}:00${parisUtcOffset(dateIso, time)}`;
}

const PARIS_DATETIME = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Horodatage lisible à l'heure de Paris. Ex : "12/11/2026 14:05". */
export function formatParisDateTime(now: Date = new Date()): string {
  return PARIS_DATETIME.format(now).replace(",", "");
}
