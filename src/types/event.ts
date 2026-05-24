/**
 * Source unique des événements affichés sur cadp.pro
 * (Alternance Dating, ateliers, visites, JPO, etc.).
 *
 * Le rendu home filtre via `publishedOnHome` + `getUpcomingEvents()`.
 * Les événements permanents (visite campus sans date fixe) sont supportés
 * en laissant `date` optionnel.
 *
 * Ref: chantier source unique events 24/05/2026.
 */
export type EventCategory = "dating" | "atelier" | "jpo" | "visite";

export interface CadpEvent {
  /** Slug stable, identifiant + clé React */
  slug: string;
  category: EventCategory;
  /** Titre court affiché en home et page dédiée */
  title: string;
  /** Date ISO YYYY-MM-DD. Absent pour événements permanents (visite RDV). */
  date?: string;
  /** Heure de début HH:MM. Optionnel. */
  startTime?: string;
  /** Heure de fin HH:MM. Optionnel. */
  endTime?: string;
  /** Lieu lisible affiché en home et page dédiée */
  location: string;
  /** Description courte pour cartes home (~140 chars max) */
  shortDescription: string;
  /** Page dédiée interne si elle existe */
  href?: string;
  /** Affichage dans la section "Prochains événements" de la home */
  publishedOnHome: boolean;
}
