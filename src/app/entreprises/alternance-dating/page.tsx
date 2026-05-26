import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";
import DatingInscriptionForm from "./DatingInscriptionForm";
import { getEventBySlug } from "@/data/events";
import {
  formatEventDateLong,
  formatEventDateShort,
  formatEventTime,
} from "@/lib/format-event";
import {
  CADP_ORG_NAME,
  CADP_CITY,
  CADP_STREET,
  CADP_POSTAL_CODE,
  CADP_REGION,
} from "@/data/org";

const SLUG_DATING = "alternance-dating-mai-2026";

const eventLookup = getEventBySlug(SLUG_DATING);
if (
  !eventLookup ||
  !eventLookup.date ||
  !eventLookup.startTime ||
  !eventLookup.endTime
) {
  throw new Error(
    `Configuration error: dating event "${SLUG_DATING}" not found or missing required fields (date, startTime, endTime).`,
  );
}
// Re-bind after guard so the declared type excludes undefined and the
// narrowing survives across the React component function boundary.
const event = eventLookup;
const eventDate: string = eventLookup.date;
const eventStartTime: string = eventLookup.startTime;
const eventEndTime: string = eventLookup.endTime;

const eventDateLong = formatEventDateLong(eventDate);
const eventDateShort = formatEventDateShort(eventDate);
const eventTimeRange = `${formatEventTime(eventStartTime)} – ${formatEventTime(eventEndTime)}`;
const startDateISO = `${eventDate}T${eventStartTime}:00+02:00`;
const endDateISO = `${eventDate}T${eventEndTime}:00+02:00`;
const venueShort = `CADP ${CADP_CITY}`;

export const metadata = createPageMetadata({
  title: `${event.title} — ${eventDateLong} | ${CADP_CITY}`,
  description: `Rencontrez en un après-midi des candidats BTS et TP ADVF pré-qualifiés. ${eventDateLong}, ${eventTimeRange}, ${venueShort}. Inscription entreprises.`,
  path: "/entreprises/alternance-dating",
});

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "BusinessEvent",
  name: `${event.title} — ${venueShort}`,
  description:
    "Rencontre directe entre entreprises de Drôme-Ardèche-Vaucluse-Gard et candidats en BTS / TP ADVF pré-qualifiés par le CADP. Format speed-meeting, 2h, profils ciblés selon les besoins exprimés à l'inscription.",
  startDate: startDateISO,
  endDate: endDateISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: "https://cadp.pro/entreprises/alternance-dating",
  image: "https://cadp.pro/og-default.png",
  location: {
    "@type": "Place",
    name: CADP_ORG_NAME,
    address: {
      "@type": "PostalAddress",
      streetAddress: CADP_STREET,
      addressLocality: CADP_CITY,
      postalCode: CADP_POSTAL_CODE,
      addressRegion: CADP_REGION,
      addressCountry: "FR",
    },
  },
  organizer: {
    "@type": "Organization",
    name: CADP_ORG_NAME,
    url: "https://cadp.pro",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://cadp.pro/entreprises/alternance-dating",
    validFrom: "2026-04-01T00:00:00+02:00",
  },
  isAccessibleForFree: true,
};

const pourquoi = [
  {
    title: "Profils pré-qualifiés",
    text: "Nous rencontrons chaque candidat en amont. Le jour J, vous ne voyez que des profils qui correspondent aux missions décrites à l'inscription — pas de CV au hasard.",
  },
  {
    title: "Gain de temps",
    text: "En 2h, vous rencontrez 5 à 10 candidats. Équivalent d'une semaine de sourcing. Format speed-meeting, 10-15 minutes par entretien, organisation fluide.",
  },
  {
    title: "Zone locale",
    text: "Candidats motivés par l'alternance en Drôme-Ardèche-Vaucluse-Gard. Mobilité réelle, ancrage territorial, pas de profils parisiens de passage.",
  },
];

const etapes = [
  {
    n: "1",
    title: "Vous vous inscrivez ici",
    text: "Quelques minutes suffisent. Vous décrivez vos besoins (postes, formations ciblées, secteur).",
  },
  {
    n: "2",
    title: "Nous vous rappelons sous 48h",
    text: "Laurent Aubret vous contacte pour qualifier précisément vos attentes et commencer la pré-sélection des candidats pertinents.",
  },
  {
    n: "3",
    title: `Le ${eventDateShort}, vous rencontrez des profils ciblés`,
    text: `Accueil ${formatEventTime(eventStartTime)}, rencontres enchaînées jusqu'à ${formatEventTime(eventEndTime)}. Nous vous présentons uniquement des candidats qui collent à votre besoin.`,
  },
];

export default function AlternanceDatingPage() {
  return (
    <>
      <JsonLd data={eventJsonLd} />

      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Événement entreprises
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            {event.title}
          </h1>
          <p className="text-gold font-semibold text-lg md:text-xl mb-6">
            {eventDateLong} &bull; {eventTimeRange} &bull; {venueShort}
          </p>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Un après-midi, une salle, vos futurs alternants. Le CADP vous
            présente des candidats BTS et TP ADVF pré-qualifiés selon vos
            besoins réels.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#inscription"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy-deep rounded-lg font-semibold text-lg hover:bg-gold-light transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy-deep"
            >
              S&apos;inscrire
            </a>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-navy-deep transition-all"
            >
              Appeler Laurent — 04 75 00 34 56
            </a>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Pourquoi participer
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pourquoi.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-semibold text-navy-deep mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-mid text-sm leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA SE PASSE */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Comment ça se passe
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />
          <ol className="space-y-6">
            {etapes.map((e) => (
              <li
                key={e.n}
                className="flex gap-5 bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="shrink-0 size-12 rounded-full bg-navy-deep text-gold flex items-center justify-center font-serif text-xl">
                  {e.n}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-deep mb-1">
                    {e.title}
                  </h3>
                  <p className="text-gray-mid text-sm leading-relaxed">
                    {e.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="inscription" className="py-20 bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Inscrire mon entreprise
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-6" />
          <p className="text-gray-mid text-center mb-12 max-w-xl mx-auto">
            Remplissez ce formulaire en 2-3 minutes. Nous vous rappelons sous
            48h pour qualifier précisément vos besoins.
          </p>
          <DatingInscriptionForm />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-navy-deep py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl md:text-2xl text-gold mb-3">
            Une question avant de vous inscrire&nbsp;?
          </h2>
          <p className="text-cream/70 mb-6">
            Laurent Aubret, co-directeur, répond directement au téléphone.
          </p>
          <a
            href="tel:+33475003456"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy-deep rounded-lg font-semibold text-lg hover:bg-gold-light transition-all"
          >
            04 75 00 34 56
          </a>
        </div>
      </section>
    </>
  );
}
