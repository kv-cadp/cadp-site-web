/**
 * Résultats d'examen par filière (source unique).
 *
 * Résultats propres au CADP, diplômes préparés via le CFA IFIR (certifié
 * Qualiopi). À ne pas confondre avec l'affichage réglementaire InserJeunes
 * (insertion, poursuite, rupture), porté par IFIR.
 *
 * Publier une nouvelle promotion = ajouter ou mettre à jour l'entrée de la
 * filière ci-dessous. Une filière absente n'affiche pas de résultats : repli
 * "à venir" géré par ResultatsBlock.
 */
export interface FormationResultats {
  /** Libellé de la promotion, ex. "2024-2026" */
  promotion: string;
  /** Session d'examen, ex. "2026" */
  session: string;
  /** Nombre de candidats présentés à l'examen */
  presentes: number;
  /** Nombre de candidats admis */
  admis: number;
  /** Taux de réussite en % (admis / présentés) */
  taux: number;
  /** Mois de publication, ex. "juillet 2026" */
  datePublication: string;
}

/** Clé = slug de la formation (cf. data/formations.ts). */
export const RESULTATS: Record<string, FormationResultats> = {
  "bts-gpme": {
    promotion: "2024-2026",
    session: "2026",
    presentes: 12,
    admis: 12,
    taux: 100,
    datePublication: "juillet 2026",
  },
  "bts-mos": {
    promotion: "2024-2026",
    session: "2026",
    presentes: 6,
    admis: 6,
    taux: 100,
    datePublication: "juillet 2026",
  },
  "bts-ndrc": {
    promotion: "2024-2026",
    session: "2026",
    presentes: 7,
    admis: 6,
    taux: 86,
    datePublication: "juillet 2026",
  },
};

/** Synthèse de la promotion, tous diplômes confondus (page d'accueil). */
export const RESULTATS_PROMO = {
  promotion: "2024-2026",
  session: "2026",
  presentes: 25,
  admis: 24,
  taux: 96,
  datePublication: "juillet 2026",
};
