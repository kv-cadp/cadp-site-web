import type { CadpEvent } from "@/types/event";
import {
  CADP_CITY,
  CADP_ORG_NAME,
  CADP_POSTAL_CODE,
  CADP_REGION,
  CADP_STREET,
} from "@/data/org";
import { parisTodayIso } from "@/lib/paris-time";

/**
 * Source unique des événements CADP affichés sur cadp.pro.
 *
 * Convention :
 * - Ajouter les nouveaux événements à la fin du tableau.
 * - Les événements passés peuvent rester (archivage), filtrés via `getUpcomingEvents()`.
 * - Pour un événement permanent (sans date fixe), omettre `date`/`startTime`/`endTime`.
 *
 * Ref: chantier source unique events 24/05/2026.
 */
export const events: CadpEvent[] = [
  {
    slug: "atelier-cv-sept-2026",
    category: "atelier",
    title: "Atelier CV & Coaching entretien",
    date: "2026-09-23",
    startTime: "09:00",
    endTime: "12:00",
    location: "CADP Pierrelatte",
    shortDescription:
      "On t'aide à construire un CV percutant et à préparer tes entretiens. Ouvert à tous les candidats, même si tu n'es pas encore inscrit.",
    publishedOnHome: false,
  },
  {
    slug: "alternance-dating-mai-2026",
    category: "dating",
    title: "Alternance Dating",
    date: "2026-09-23",
    startTime: "14:00",
    endTime: "16:00",
    location: "CADP Pierrelatte",
    shortDescription:
      "Pas encore signé pour la rentrée ? Rencontre nos entreprises partenaires, toutes filières. Viens avec ton CV, repars avec des pistes concrètes.",
    href: "/entreprises/alternance-dating",
    publishedOnHome: true,
  },
  {
    slug: "alternance-dating-nov-2026",
    category: "dating",
    title: "Alternance Dating TP ADVF",
    date: "2026-11-18",
    startTime: "14:00",
    endTime: "16:00",
    location: "CADP Pierrelatte",
    shortDescription:
      "Spéciale TP ADVF : rencontre les structures d'aide à la personne et médico-sociales qui recrutent. Entretiens sur place, entrée en formation en février 2027.",
    href: "/dating-pierrelatte",
    publishedOnHome: true,
    venue: {
      name: CADP_ORG_NAME,
      street: CADP_STREET,
      postalCode: CADP_POSTAL_CODE,
      city: CADP_CITY,
      region: CADP_REGION,
    },
    formationSlug: "tp-advf",
    intro:
      "Nouvelle session de recrutement sur le bassin de Pierrelatte. Entrée en formation début février 2027. Venez nous rencontrer.",
  },
  {
    slug: "visite-campus-rdv",
    category: "visite",
    title: "Visite du campus sur rendez-vous",
    location: "CADP Pierrelatte",
    shortDescription:
      "Tu veux découvrir le campus, rencontrer les formateurs et poser tes questions ? Appelle-nous au 04 75 00 34 56 pour fixer un créneau. On t'accueille individuellement.",
    publishedOnHome: true,
  },
  {
    slug: "alternance-dating-advf-guilherand-nov-2026",
    category: "dating",
    title: "Alternance Dating TP ADVF",
    date: "2026-11-12",
    startTime: "14:00",
    endTime: "16:00",
    location: "Mairie de Guilherand-Granges",
    shortDescription:
      "Spéciale TP ADVF, en Ardèche : rencontre les structures d'aide à la personne et médico-sociales qui recrutent. Entrée en formation en février 2027.",
    href: "/dating-guilherand",
    publishedOnHome: true,
    venue: {
      name: "Mairie de Guilherand-Granges",
      street: "1 place des Cinq-Continents",
      postalCode: "07500",
      city: "Guilherand-Granges",
      region: "Ardèche",
    },
    formationSlug: "tp-advf",
    hostNote:
      "C2A · Campus Alternance Ardèche, campus ardéchois du Campus Alternance Drôme Provence",
    intro:
      "C2A ouvre son campus à Guilherand-Granges et recrute sa première promotion. Entrée en formation début février 2027. Venez nous rencontrer.",
  },
];

/**
 * Retourne les événements à afficher en home, dans l'ordre :
 * 1. Événements datés futurs (date >= aujourd'hui), triés par date croissante
 * 2. Événements permanents (sans date)
 *
 * Les événements datés passés sont filtrés.
 *
 * @param now - Optionnel, pour les tests. Default = new Date().
 */
export function getUpcomingEvents(now: Date = new Date()): CadpEvent[] {
  const todayIso = parisTodayIso(now); // AAAA-MM-JJ, date de Paris

  const dated = events
    .filter((e) => e.publishedOnHome && e.date && e.date >= todayIso)
    .sort((a, b) => {
      const da = a.date ?? "";
      const db = b.date ?? "";
      return da < db ? -1 : da > db ? 1 : 0;
    });

  const permanent = events.filter((e) => e.publishedOnHome && !e.date);

  return [...dated, ...permanent];
}

/**
 * Recherche d'un événement par slug. Utile pour pages dédiées,
 * emails templates, etc.
 */
export function getEventBySlug(slug: string): CadpEvent | undefined {
  return events.find((e) => e.slug === slug);
}
