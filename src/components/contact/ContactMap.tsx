"use client";

import { useState } from "react";
import {
  CADP_ADDRESS_LINE,
  CADP_CITY,
  CADP_ORG_NAME,
  CADP_POSTAL_CODE,
  CADP_REGION,
  CADP_STREET,
} from "@/data/org";
import { buildVenueMapUrl } from "@/lib/format-event";
import NewTabHint from "@/components/ui/NewTabHint";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.0!2d4.688!3d44.356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b58d3b2f4c1a1b%3A0x0!2s2%20Boulevard%20Fr%C3%A9d%C3%A9ric%20Mistral%2C%2026700%20Pierrelatte!5e0!3m2!1sfr!2sfr!4v1";

const directionsUrl = buildVenueMapUrl({
  name: CADP_ORG_NAME,
  street: CADP_STREET,
  postalCode: CADP_POSTAL_CODE,
  city: CADP_CITY,
  region: CADP_REGION,
});

/**
 * Carte du campus chargée à la demande. Google Maps dépose ses propres
 * cookies : rien n'est chargé tant que le visiteur ne l'a pas demandé
 * (politique de confidentialité, § 8). L'itinéraire reste accessible sans carte.
 */
export default function ContactMap() {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <div className="rounded-xl overflow-hidden shadow-sm">
        <iframe
          title={`${CADP_ORG_NAME} — ${CADP_ADDRESS_LINE}`}
          src={MAP_EMBED_SRC}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="min-h-[280px] rounded-xl bg-cream flex flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <svg className="size-8 text-navy-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      <p className="font-serif text-lg text-navy-deep">{CADP_ADDRESS_LINE}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setShown(true)}
          className="px-5 py-3 bg-navy-deep text-white rounded-lg font-semibold text-sm hover:bg-navy-medium transition-colors"
        >
          Afficher la carte
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 border-2 border-navy-deep text-navy-deep rounded-lg font-semibold text-sm hover:bg-navy-deep hover:text-white transition-colors"
        >
          Itinéraire
          <NewTabHint />
        </a>
      </div>
      <p className="text-xs text-gray-mid max-w-sm">
        La carte est fournie par Google, qui peut déposer des cookies lorsqu&apos;elle s&apos;affiche.
      </p>
    </div>
  );
}
