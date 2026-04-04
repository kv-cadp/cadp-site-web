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

export interface AlternanceRhythm {
  schoolDays: number;
  companyDays: number;
  /** Indices des jours campus semaine longue — 3j campus (0=Lun, 1=Mar, 2=Mer, 3=Jeu, 4=Ven) */
  weekLong: number[];
  /** Indices des jours campus semaine courte — 2j campus */
  weekShort: number[];
  description: string;
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
  testimonial: Testimonial;
  metaTitle: string;
  metaDescription: string;
}
