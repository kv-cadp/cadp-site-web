import type { CadpEvent, EventVenue } from "@/types/event";
import { events } from "@/data/events";
import { parisNowLocal } from "@/lib/paris-time";

/**
 * Pages d'Alternance Dating, une par lieu. Ces adresses sont imprimées
 * (affiches, invitations, QR codes) : ne jamais les renommer.
 * Chaque page affiche le prochain dating dont `href` est son adresse.
 */
export const DATING_PATHS = ["/dating-guilherand", "/dating-pierrelatte"] as const;
export type DatingPath = (typeof DATING_PATHS)[number];

/** Ville de chaque page de lieu, affichée même sans dating programmé. */
export const DATING_PATH_CITY: Record<DatingPath, string> = {
  "/dating-guilherand": "Guilherand-Granges",
  "/dating-pierrelatte": "Pierrelatte",
};

/** Dating complet : date, horaires, lieu et page d'inscription renseignés. */
export type DatingEvent = CadpEvent & {
  category: "dating";
  date: string;
  startTime: string;
  endTime: string;
  venue: EventVenue;
  href: DatingPath;
};

export function isDatingPath(value: string | undefined): value is DatingPath {
  return (DATING_PATHS as readonly string[]).includes(value ?? "");
}

function isCompleteDating(event: CadpEvent): event is DatingEvent {
  return (
    event.category === "dating" &&
    typeof event.date === "string" &&
    typeof event.startTime === "string" &&
    typeof event.endTime === "string" &&
    event.venue !== undefined &&
    isDatingPath(event.href)
  );
}

/**
 * Un dating reste ouvert aux inscriptions jusqu'à son heure de fin (heure
 * de Paris) : inscription possible sur place pendant l'événement, plus
 * après sa clôture.
 */
export function isDatingOpen(event: DatingEvent, now: Date = new Date()): boolean {
  return parisNowLocal(now) < `${event.date}T${event.endTime}`;
}

function byDateAsc(a: DatingEvent, b: DatingEvent): number {
  const ka = `${a.date}T${a.startTime}`;
  const kb = `${b.date}T${b.startTime}`;
  return ka < kb ? -1 : ka > kb ? 1 : 0;
}

/** Datings à venir et publiés, du plus proche au plus lointain. */
export function getUpcomingDatings(now: Date = new Date()): DatingEvent[] {
  return events
    .filter(isCompleteDating)
    .filter((e) => e.publishedOnHome && isDatingOpen(e, now))
    .sort(byDateAsc);
}

/**
 * Prochain dating d'une page de lieu, publié ou non : la page imprimée
 * doit fonctionner même si l'événement n'est pas mis en avant sur l'accueil.
 */
export function getNextDatingForPath(
  path: DatingPath,
  now: Date = new Date(),
): DatingEvent | undefined {
  return events
    .filter(isCompleteDating)
    .filter((e) => e.href === path && isDatingOpen(e, now))
    .sort(byDateAsc)[0];
}

/** Dating ouvert aux inscriptions, pour les actions serveur. */
export function getOpenDatingBySlug(
  slug: string,
  now: Date = new Date(),
): DatingEvent | undefined {
  const event = events.find((e) => e.slug === slug);
  if (!event || !isCompleteDating(event) || !isDatingOpen(event, now)) {
    return undefined;
  }
  return event;
}

export function candidatPath(path: DatingPath): string {
  return `${path}/candidat`;
}

export function employeurPath(path: DatingPath): string {
  return `${path}/employeur`;
}
