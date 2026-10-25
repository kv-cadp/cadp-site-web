import { getUpcomingEvents } from "@/data/events";
import { RENTREE } from "@/data/rentree";
import { formatEventDateNumeric, formatEventDateShort } from "@/lib/format-event";

/** Message du bandeau du haut, calculé côté serveur à chaque régénération. */
export interface TopBannerMessage {
  /** Texte affiché à partir de `sm` */
  desktop: string;
  /** Version courte pour mobile */
  mobile: string;
  href: string;
  /** Libellé du lien en version desktop */
  cta: string;
}

/** Page qui regroupe les Alternance Dating à venir (inscriptions candidat et employeur). */
const DATING_HUB = "/entreprises/alternance-dating";

/**
 * Le prochain Alternance Dating tant qu'il est à venir, sinon la rentrée de
 * septembre. Les pages étant régénérées toutes les heures, le bandeau passe
 * de l'un à l'autre sans redéploiement.
 *
 * Plusieurs datings du même nom (même session sur deux lieux) sont annoncés
 * ensemble, deux au plus.
 */
export function getTopBannerMessage(now: Date = new Date()): TopBannerMessage {
  const datings = getUpcomingEvents(now).filter((e) => e.category === "dating" && e.date);
  const first = datings[0];

  if (first) {
    const session = datings.filter((e) => e.title === first.title).slice(0, 2);
    const lieux = session
      .map((e) => `${formatEventDateShort(e.date!)} à ${e.venue?.city ?? e.location}`)
      .join(", ");
    const jours = session.map((e) => Number(e.date!.slice(8, 10)));
    const memeMois = session.every((e) => e.date!.slice(5, 7) === first.date!.slice(5, 7));
    const dates = memeMois
      ? `${jours.join(" et ")}/${first.date!.slice(5, 7)}`
      : session.map((e) => formatEventDateNumeric(e.date!)).join(" et ");

    return {
      desktop: `${first.title} : ${lieux}.`,
      mobile: `${first.title} · ${dates}`,
      href: session.length === 1 ? (first.href ?? DATING_HUB) : DATING_HUB,
      cta: "S'inscrire →",
    };
  }

  return {
    desktop: `Rentrée ${RENTREE.annee} — 12 places par formation, pas une de plus.`,
    mobile: `Rentrée ${RENTREE.annee} — 12 places par promo.`,
    href: RENTREE.href,
    cta: "En savoir plus →",
  };
}
