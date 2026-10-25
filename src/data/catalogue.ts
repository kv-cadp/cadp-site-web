import { formations } from "@/data/formations";

/**
 * Formations ouvertes cette année (source unique du nombre affiché).
 *
 * Lue par la grille de l'accueil et le chiffre clé « formations ». Le
 * Bachelor RQSE a sa page dédiée, hors `formations`. Le BTS GTLA, qui ouvre
 * à la rentrée 2027, n'y figure pas encore (voir data/rentree.ts).
 */
export interface CatalogueCard {
  slug: string;
  code: string;
  fullName: string;
  shortDescription: string;
  level: string;
  duration: string;
}

export const CATALOGUE: CatalogueCard[] = [
  ...formations.map((f) => ({
    slug: f.slug,
    code: f.code,
    fullName: f.fullName,
    shortDescription: f.shortDescription,
    level: f.level,
    duration: f.duration,
  })),
  {
    slug: "bachelor-rqse",
    code: "RQSE",
    fullName: "Bachelor Responsable QSE",
    shortDescription:
      "Pilote la démarche qualité, sécurité et environnement d'une entreprise : conformité, audits ISO, prévention des risques. Un Bac+3 en 12 mois.",
    level: "Bac+3 — Niveau 6",
    duration: "12 mois",
  },
];
