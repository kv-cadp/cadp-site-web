/**
 * Formatage du rythme d'alternance pour affichage UI.
 *
 * Convertit un tableau de jours campus (indices 0=Lun, 1=Mar, ..., 4=Ven)
 * en chaîne courte lisible (ex. [0,1] → "Lun-Mar").
 *
 * Source canonique des jours campus : src/data/formations.ts
 * (rhythm.campusDays). Pattern aligné sur format-event.ts.
 */
const DAY_LABELS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

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
