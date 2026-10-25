/**
 * Prochaine rentrée de septembre (source unique).
 *
 * Lue par la pastille du header, le menu mobile, l'encart de l'accueil, le
 * bandeau du haut (quand aucun Alternance Dating n'est à venir) et la page
 * /rentree.
 *
 * Changer de saison = mettre à jour `annee` et `formations` ci-dessous.
 * L'URL /rentree ne change pas d'une année sur l'autre.
 */
export interface RentreeFormation {
  /** Sigle affiché en badge, ex. "MCO" */
  code: string;
  name: string;
  niveau: string;
  duree: string;
  /** Slug de la fiche, ex. "bts-mco" */
  slug: string;
  /** Formation qui ouvre pour la première fois cette rentrée */
  nouveau?: boolean;
}

export interface Rentree {
  /** Année de la rentrée de septembre, ex. 2027 */
  annee: number;
  href: string;
  /** Formations ouvertes à cette rentrée, dans l'ordre d'affichage */
  formations: RentreeFormation[];
}

export const RENTREE: Rentree = {
  annee: 2027,
  href: "/rentree",
  formations: [
    { code: "MCO", name: "Management Commercial Opérationnel", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-mco" },
    { code: "NDRC", name: "Négociation et Digitalisation de la Relation Client", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-ndrc" },
    { code: "GPME", name: "Gestion de la PME", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-gpme" },
    { code: "CG", name: "Comptabilité et Gestion", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-cg" },
    { code: "MOS", name: "Management Opérationnel de la Sécurité", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-mos" },
    { code: "GTLA", name: "Gestion des Transports et Logistique Associée", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-gtla", nouveau: true },
    { code: "RQSE", name: "Responsable Qualité Sécurité Environnement", niveau: "Bac+3 — Niveau 6", duree: "12 mois", slug: "bachelor-rqse" },
  ],
};
