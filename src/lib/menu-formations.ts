import { getFormationBySlug } from "@/data/formations";
import { RENTREE } from "@/data/rentree";
import { parisTodayIso } from "@/lib/paris-time";

/** Formation du menu mobile : sigle et domaine en clair. */
export interface MenuFormation {
  href: string;
  label: string;
  domaine: string;
}

/** Intitulés courts validés par la direction le 25/10/2026. */
const MENU = [
  { slug: "bts-mco", label: "BTS MCO", domaine: "Commerce et management" },
  { slug: "bts-ndrc", label: "BTS NDRC", domaine: "Vente et relation client" },
  { slug: "bts-gpme", label: "BTS GPME", domaine: "Gestion de PME" },
  { slug: "bts-cg", label: "BTS CG", domaine: "Comptabilité et gestion" },
  { slug: "bts-mos", label: "BTS MOS", domaine: "Sécurité" },
  { slug: "bachelor-rqse", label: "Bachelor RQSE", domaine: "Qualité, sécurité, environnement · Bac+3" },
  { slug: "tp-advf", label: "TP ADVF", domaine: "Aide à la personne" },
  { slug: "bts-gtla", label: "BTS GTLA", domaine: "Transport et logistique" },
];

/**
 * Liste du menu mobile, calculée côté serveur (pages régénérées toutes les
 * heures) : la prochaine entrée du TP ADVF et les nouveautés de la rentrée
 * viennent des données et disparaissent d'elles-mêmes.
 */
export function getMenuFormations(now: Date = new Date()): MenuFormation[] {
  const intake = getFormationBySlug("tp-advf")?.nextIntake;
  const advf = intake && parisTodayIso(now) < intake.until ? intake.label : undefined;
  const nouveaux = new Set(RENTREE.formations.filter((f) => f.nouveau).map((f) => f.slug));

  return MENU.map(({ slug, label, domaine }) => ({
    href: `/formations/${slug}`,
    label,
    domaine:
      slug === "tp-advf" && advf
        ? `${domaine} · entrée ${advf}`
        : nouveaux.has(slug)
          ? `${domaine} · rentrée ${RENTREE.annee}`
          : domaine,
  }));
}
