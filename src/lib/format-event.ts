/**
 * Helpers de formatage des dates et heures pour les événements CADP.
 *
 * Centralisent la mise en forme commune aux différents consumers de
 * `src/data/events.ts` (UpcomingEvents, CTADating, Footer, DatingInscriptionForm, etc.).
 *
 * Ref: chantier source unique events 24/05/2026.
 */

const MONTHS_FR_LONG = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const MONTHS_FR_SHORT_UPPER = [
  "JAN",
  "FÉV",
  "MAR",
  "AVR",
  "MAI",
  "JUIN",
  "JUIL",
  "AOÛT",
  "SEPT",
  "OCT",
  "NOV",
  "DÉC",
];

/**
 * Formate une date ISO en day/month courts pour les cards d'événements home.
 * Ex: "2026-05-27" → { day: "27", month: "MAI" }
 */
export function formatEventDay(dateIso: string): { day: string; month: string } {
  const parts = dateIso.split("-");
  const monthIdx = parseInt(parts[1], 10) - 1;
  return {
    day: parseInt(parts[2], 10).toString(),
    month: MONTHS_FR_SHORT_UPPER[monthIdx] ?? "",
  };
}

/**
 * Formate une date ISO en format long français.
 * Ex: "2026-05-27" → "27 mai 2026"
 */
export function formatEventDateLong(dateIso: string): string {
  const parts = dateIso.split("-");
  const day = parseInt(parts[2], 10);
  const month = MONTHS_FR_LONG[parseInt(parts[1], 10) - 1] ?? "";
  return `${day} ${month} ${parts[0]}`;
}

/**
 * Formate une date ISO en format court français (sans année).
 * Ex: "2026-05-27" → "27 mai"
 */
export function formatEventDateShort(dateIso: string): string {
  const parts = dateIso.split("-");
  const day = parseInt(parts[2], 10);
  const month = MONTHS_FR_LONG[parseInt(parts[1], 10) - 1] ?? "";
  return `${day} ${month}`;
}

/**
 * Formate une heure HH:MM en format français court.
 * Ex: "14:00" → "14h" / "14:30" → "14h30" / "09:00" → "9h"
 */
export function formatEventTime(time: string): string {
  const [h, m] = time.split(":");
  const hh = parseInt(h, 10);
  const mm = parseInt(m, 10);
  return mm === 0 ? `${hh}h` : `${hh}h${mm.toString().padStart(2, "0")}`;
}

/**
 * Compose la ligne de localisation : "Lieu — 14h à 16h" si heures, sinon juste "Lieu".
 */
export function buildEventLocationLine(
  location: string,
  startTime?: string,
  endTime?: string,
): string {
  if (!startTime || !endTime) return location;
  return `${location} — ${formatEventTime(startTime)} à ${formatEventTime(endTime)}`;
}
