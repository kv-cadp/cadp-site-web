/**
 * Textes des pages d'Alternance Dating, par formation ciblée.
 * Source : affiches candidats et invitations employeurs de novembre 2026
 * (TP ADVF), validées par la direction. Une formation sans entrée ici
 * affiche la page sans les blocs de présentation du métier.
 */
export interface DatingFormationContent {
  /** Surtitre. Ex : "Titre professionnel · Ministère du Travail" */
  kicker: string;
  /** Intitulé du métier, titre de la page. */
  headline: string;
  /** Phrase d'accroche sous le titre. */
  tagline: string;
  /** Points clés de la formation. */
  highlights: string[];
  /** Conditions d'accès. */
  conditions: string[];
  /** Encadré « Bon à savoir ». */
  goodToKnow: string;
  /** Le métier, en une phrase. */
  job: string;
  /** Où travailler, en une phrase. */
  workplaces: string;
  /** Phrase de clôture côté candidats. */
  candidateClosing: string;
  /** Argument employeurs (encadré d'ouverture). */
  employerPitchTitle: string;
  employerPitch: string;
  /** Déroulé pour les employeurs. */
  employerSteps: string[];
  /** Rythme de l'alternance, présenté aux employeurs. */
  employerRhythm: string[];
}

const TP_ADVF: DatingFormationContent = {
  kicker: "Titre professionnel · Ministère du Travail",
  headline: "Assistant de vie aux familles",
  tagline: "Un métier utile, tous les jours. Un titre reconnu par l'État.",
  highlights: [
    "Titre professionnel reconnu par l'État · niveau 3 · 12 mois en alternance",
    "Formation gratuite · vous êtes salarié et payé chaque mois",
    "Promotion limitée à 12 personnes · un formateur qui vous suit individuellement",
    "Entretiens d'embauche sur place, avec les employeurs du bassin",
  ],
  conditions: [
    "Aucun diplôme, aucun niveau scolaire exigé",
    "Parler français et savoir lire quelques lignes en français",
    "Jeunes et adultes en reconversion · le type de contrat s'adapte à votre âge et à votre situation, nous en parlons avec vous le jour J",
  ],
  goodToKnow:
    "Les employeurs du secteur demandent le permis B et un véhicule : les interventions se font au domicile des personnes, sur plusieurs communes dans la même journée.",
  job: "Aide à la toilette, aux repas et aux déplacements · entretien du cadre de vie · garde d'enfants · accompagnement aux actes de la vie quotidienne.",
  workplaces:
    "Services d'aide à domicile · associations · EHPAD · particuliers employeurs. Un secteur qui recrute toute l'année.",
  candidateClosing:
    "Venez avec un CV si vous en avez un. Sinon, venez quand même.",
  employerPitchTitle:
    "Un levier de recrutement sur un métier en très forte tension",
  employerPitch:
    "En un an, vous avez une personne formée à vos méthodes, à votre organisation et à vos publics, et opérationnelle. Sur un métier où les candidatures spontanées sont rares, c'est la voie de recrutement la plus directe.",
  employerSteps: [
    "Accueil, présentation du parcours en dix minutes",
    "Entretiens de quinze minutes avec les candidats que vous choisissez",
    "Le campus monte le dossier de contrat et fait le lien avec votre OPCO",
    "Réponse et mise en relation sous quarante-huit heures",
  ],
  employerRhythm: [
    "450 heures de formation sur l'année, en moyenne 2 jours par semaine au campus hors vacances scolaires, avec des semaines sans cours. Le calendrier détaillé vous est remis avant la signature.",
    "Le reste du temps, l'alternant est chez vous, et à temps plein pendant toutes les vacances scolaires, congés payés déduits. Vos semaines les plus tendues, l'été et les périodes de congés de vos salariés, sont donc celles où il est présent sans interruption.",
    "La répartition s'ajuste à vos périodes de tension. Le volume de formation contractuel reste le même, c'est sa répartition qui s'adapte. Signalez-nous vos échéances avant la signature.",
  ],
};

const CONTENT_BY_FORMATION: Record<string, DatingFormationContent> = {
  "tp-advf": TP_ADVF,
};

export function getDatingFormationContent(
  formationSlug: string | undefined,
): DatingFormationContent | undefined {
  return formationSlug ? CONTENT_BY_FORMATION[formationSlug] : undefined;
}
