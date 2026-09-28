export interface ProgramModule {
  name: string;
  hours?: number;
}

export interface ProgramYear {
  title: string;
  modules: ProgramModule[];
}

export interface Career {
  title: string;
  description: string;
  salary?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  formation: string;
  year: string;
  quote: string;
}

/** Lieu de formation dont les jours de cours lui sont propres. */
export interface FormationSite {
  /** Ville. Ex : "Guilherand-Granges" (même graphie que `venue.city` des datings) */
  city: string;
  /** Département. Ex : "Ardèche" */
  department: string;
  /** Indices des jours campus sur ce lieu (0=Lun … 4=Ven) */
  campusDays: number[];
}

export interface AlternanceRhythm {
  schoolDays: number;
  companyDays: number;
  /**
   * Indices des jours campus (0=Lun, 1=Mar, 2=Mer, 3=Jeu, 4=Ven).
   * Vide quand les jours dépendent du lieu : voir `sites`.
   */
  campusDays: number[];
  /** Jours de cours par lieu, pour une formation dispensée sur plusieurs sites. */
  sites?: FormationSite[];
  horaires: string;
  description: string;
}

/** Prochaine entrée en formation, annoncée dans le bandeau de la fiche. */
export interface FormationIntake {
  /** Ex : "février 2027" */
  label: string;
  /** Date (AAAA-MM-JJ, heure de Paris) à partir de laquelle l'annonce disparaît. */
  until: string;
}

export interface CompetenceBlock {
  title: string;
  competences: string[];
}

export interface Formation {
  slug: string;
  code: string;
  fullName: string;
  shortName: string;
  heroTitle: string;
  heroSubtitle: string;
  shortDescription: string;
  duration: string;
  level: string;
  rncp: string;
  rhythm: AlternanceRhythm;
  competenceBlocks: CompetenceBlock[];
  program: ProgramYear[];
  careers: Career[];
  furtherStudies: string[];
  prerequisites: string[];
  faq: FAQItem[];
  testimonial?: Testimonial;
  metaTitle: string;
  metaDescription: string;
  /**
   * Paragraphe de définition du bandeau (lieux, contrat, public), à la place
   * du texte générique « à Pierrelatte ».
   */
  definition?: string;
  nextIntake?: FormationIntake;
}
