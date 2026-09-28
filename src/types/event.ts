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

/** Adresse complète du lieu d'un événement (pages et e-mails d'inscription). */
export interface EventVenue {
  /** Nom du lieu. Ex : "Mairie de Guilherand-Granges" */
  name: string;
  /** Numéro et voie. Ex : "1 place des Cinq-Continents" */
  street: string;
  postalCode: string;
  city: string;
  /** Département. Ex : "Ardèche" */
  region: string;
}

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
  /** Adresse complète du lieu. Obligatoire pour un Alternance Dating à inscription. */
  venue?: EventVenue;
  /** Formation ciblée, slug de `src/data/formations.ts`. Ex : "tp-advf" */
  formationSlug?: string;
  /** Mention d'accueil affichée sous le lieu, en texte seul. */
  hostNote?: string;
  /** Phrase d'accroche de la page de l'événement. */
  intro?: string;
}
