/**
 * Formatage du rythme d'alternance pour affichage UI.
 *
 * Convertit un tableau de jours campus (indices 0=Lun, 1=Mar, ..., 4=Ven)
 * en chaîne courte lisible (ex. [0,1] → "Lun-Mar").
 *
 * Source canonique des jours campus : src/data/formations.ts
 * (rhythm.campusDays, ou rhythm.sites quand les jours dépendent du lieu).
 * Pattern aligné sur format-event.ts.
 */
import type { AlternanceRhythm } from "@/types/formation";

const DAY_LABELS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
const DAY_LABELS_LONG = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

/**
 * Convertit un tableau campusDays en chaîne courte affichable.
 *
 * Ex : [0, 1] → "Lun-Mar" ; [2, 3] → "Mer-Jeu" ; [3, 4] → "Jeu-Ven"
 *
 * Note : ne gère que les rythmes contigus 1-2 jours (cas actuel CADP).
 * Si rythmes futurs avec jours non contigus ou 3+ jours, étendre.
 */
export function formatCampusDaysShort(campusDays: number[]): string {
  if (campusDays.length === 0) return "—";
  if (campusDays.length === 1) {
    return DAY_LABELS_SHORT[campusDays[0]] ?? "—";
  }
  const first = campusDays[0];
  const last = campusDays[campusDays.length - 1];
  return `${DAY_LABELS_SHORT[first] ?? "—"}-${DAY_LABELS_SHORT[last] ?? "—"}`;
}

/**
 * Libellé court du rythme d'une formation, jours par lieu compris.
 *
 * Ex : un seul lieu [0, 1] → "Lun-Mar" ; deux lieux → "Lun-Mar ou Jeu-Ven"
 * (dans l'ordre de la semaine).
 */
export function formatRhythmShort(rhythm: AlternanceRhythm): string {
  if (!rhythm.sites?.length) return formatCampusDaysShort(rhythm.campusDays);
  const labels = [...rhythm.sites]
    .sort((a, b) => (a.campusDays[0] ?? 9) - (b.campusDays[0] ?? 9))
    .map((site) => formatCampusDaysShort(site.campusDays));
  return [...new Set(labels)].join(" ou ");
}

/**
 * Jours de cours en toutes lettres.
 *
 * Ex : [0, 1] → "le lundi et le mardi" ; [3] → "le jeudi" ;
 * [0, 1, 2] → "le lundi, le mardi et le mercredi"
 */
export function formatCampusDaysLong(campusDays: number[]): string {
  const days = campusDays
    .map((index) => DAY_LABELS_LONG[index])
    .filter((day): day is string => Boolean(day))
    .map((day) => `le ${day}`);
  if (days.length <= 1) return days[0] ?? "";
  return `${days.slice(0, -1).join(", ")} et ${days[days.length - 1]}`;
}

/**
 * Horaires en toutes lettres.
 *
 * Ex : "8h-12h / 13h-16h" → "de 8h à 12h et de 13h à 16h".
 * Une chaîne sans plage reconnue est rendue telle quelle.
 */
export function formatHorairesLong(horaires: string): string {
  const ranges = [...horaires.matchAll(/(\d{1,2}h\d{0,2})\s*-\s*(\d{1,2}h\d{0,2})/g)].map(
    (match) => `de ${match[1]} à ${match[2]}`,
  );
  return ranges.length > 0 ? ranges.join(" et ") : horaires;
}

/**
 * Phrase des jours de cours d'un lieu, pour les pages d'un événement situé
 * dans cette ville. `undefined` si la formation n'a pas de rythme par lieu
 * ou pas de lieu dans cette ville.
 *
 * Ex : "À Guilherand-Granges, les cours ont lieu le lundi et le mardi,
 * de 8h à 12h et de 13h à 16h, hors vacances scolaires."
 */
export function formatSiteRhythmSentence(
  rhythm: AlternanceRhythm,
  city: string,
): string | undefined {
  const site = rhythm.sites?.find((s) => s.city === city);
  if (!site || site.campusDays.length === 0) return undefined;
  return `À ${site.city}, les cours ont lieu ${formatCampusDaysLong(site.campusDays)}, ${formatHorairesLong(rhythm.horaires)}, hors vacances scolaires.`;
}
