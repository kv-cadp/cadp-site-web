import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import {
  formatEventDateLong,
  formatEventTimeRange,
} from "@/lib/format-event";
import {
  DATING_PATH_CITY,
  candidatPath,
  employeurPath,
  getNextDatingForPath,
  type DatingPath,
} from "./events";

export type DatingPageKind = "lieu" | "candidat" | "employeur";

/** Métadonnées des pages de lieu et d'inscription, calculées au rendu. */
export function buildDatingPageMetadata(
  path: DatingPath,
  kind: DatingPageKind,
): Metadata {
  const city = DATING_PATH_CITY[path];
  const pagePath =
    kind === "candidat"
      ? candidatPath(path)
      : kind === "employeur"
        ? employeurPath(path)
        : path;
  const event = getNextDatingForPath(path);

  if (!event) {
    return createPageMetadata({
      title: `Alternance Dating · ${city}`,
      description: `Alternance Dating à ${city} : prochaines dates et inscriptions sur cadp.pro.`,
      path: pagePath,
    });
  }

  const date = formatEventDateLong(event.date);
  const when = `${date}, ${formatEventTimeRange(event.startTime, event.endTime)}`;
  const where = `${event.venue.name}, ${event.venue.city}`;
  const prefix =
    kind === "candidat"
      ? "Inscription candidat · "
      : kind === "employeur"
        ? "Invitation employeurs · "
        : "";
  const description =
    kind === "employeur"
      ? `Rencontrez vos futurs alternants le ${when}, ${where}. Confirmez votre venue en deux minutes.`
      : `${event.intro ?? event.shortDescription} Le ${when}, ${where}.`;

  return createPageMetadata({
    title: `${prefix}${event.title} · ${city}, ${date}`,
    description,
    path: pagePath,
  });
}
