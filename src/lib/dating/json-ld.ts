import { CADP_ORG_NAME } from "@/data/org";
import { toParisIso8601 } from "@/lib/paris-time";
import type { DatingEvent } from "./events";

const SITE_URL = "https://cadp.pro";

/** Données structurées schema.org d'un Alternance Dating (une page de lieu). */
export function buildDatingEventJsonLd(event: DatingEvent) {
  const url = `${SITE_URL}${event.href}`;
  return {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: `${event.title} · ${event.venue.city}`,
    description: event.intro ?? event.shortDescription,
    startDate: toParisIso8601(event.date, event.startTime),
    endDate: toParisIso8601(event.date, event.endTime),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url,
    image: `${SITE_URL}/og-default.png`,
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue.street,
        addressLocality: event.venue.city,
        postalCode: event.venue.postalCode,
        addressRegion: event.venue.region,
        addressCountry: "FR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: CADP_ORG_NAME,
      url: SITE_URL,
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}
