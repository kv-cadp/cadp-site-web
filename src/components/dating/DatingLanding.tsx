import Link from "next/link";
import Button from "@/components/ui/Button";
import { getFormationBySlug } from "@/data/formations";
import { getDatingFormationContent } from "@/lib/dating/content";
import {
  DATING_PATH_CITY,
  candidatPath,
  employeurPath,
  getNextDatingForPath,
  type DatingPath,
} from "@/lib/dating/events";
import { buildDatingEventJsonLd } from "@/lib/dating/json-ld";
import { formatSiteRhythmSentence } from "@/lib/format-rhythm";
import { JsonLd } from "@/lib/structured-data";
import DatingEventFacts from "./DatingEventFacts";
import NoUpcomingDating from "./NoUpcomingDating";

function Dot() {
  return (
    <span
      className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
      aria-hidden="true"
    />
  );
}

/**
 * Page d'un lieu d'Alternance Dating (adresse imprimée sur les affiches) :
 * date, lieu exact, présentation du métier et accès aux deux inscriptions.
 */
export default function DatingLanding({ path }: { path: DatingPath }) {
  const event = getNextDatingForPath(path);
  if (!event) return <NoUpcomingDating city={DATING_PATH_CITY[path]} />;

  const content = getDatingFormationContent(event.formationSlug);
  const formation = event.formationSlug ? getFormationBySlug(event.formationSlug) : undefined;
  // Jours de cours du lieu de ce dating (la formation peut avoir d'autres jours ailleurs).
  const siteRhythm = formation
    ? formatSiteRhythmSentence(formation.rhythm, event.venue.city)
    : undefined;

  return (
    <>
      <JsonLd data={buildDatingEventJsonLd(event)} />

      {/* EN-TÊTE : métier, date et lieu */}
      <section className="bg-navy-deep py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] mb-5">
            Alternance Dating · {event.venue.city}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <div>
              {content && (
                <p className="text-cream/70 text-sm mb-2">{content.kicker}</p>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
                {content?.headline ?? event.title}
              </h1>
              {content && (
                <p className="text-cream/90 text-lg mb-6">{content.tagline}</p>
              )}
              {event.intro && (
                <p className="text-cream/80 leading-relaxed">{event.intro}</p>
              )}
            </div>
            <div className="bg-navy-medium rounded-xl p-6 border border-white/10">
              <DatingEventFacts event={event} tone="dark" />
              <p className="mt-5 pt-4 border-t border-white/10 text-gold font-mono text-xs uppercase tracking-widest">
                Entrée libre · inscription conseillée
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href={candidatPath(path)} variant="gold" className="px-8 py-4 text-lg">
              Candidat(e) : je m&apos;inscris
            </Button>
            <Button href={employeurPath(path)} variant="white-outline" className="px-8 py-4 text-lg">
              Employeur : je confirme ma venue
            </Button>
          </div>
        </div>
      </section>

      {content && (
        <>
          {/* LA FORMATION */}
          <section className="py-16 md:py-20 bg-white">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4">
                La formation
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full mb-8" />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.highlights.map((item) => (
                  <li key={item} className="flex gap-3 bg-cream rounded-xl p-5 text-gray-dark leading-relaxed">
                    <Dot />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {siteRhythm && (
                <p className="mt-6 text-gray-dark leading-relaxed">{siteRhythm}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-navy-deep mb-3">
                    Conditions d&apos;accès
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-dark leading-relaxed">
                    {content.conditions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Dot />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-navy-deep mb-3">
                    Le métier
                  </h3>
                  <p className="text-sm text-gray-dark leading-relaxed">{content.job}</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-navy-deep mb-3">
                    Où travailler
                  </h3>
                  <p className="text-sm text-gray-dark leading-relaxed">{content.workplaces}</p>
                </div>
              </div>

              <div className="mt-8 bg-cream border-l-4 border-gold rounded-r-xl p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-navy-deep mb-2">
                  Bon à savoir
                </h3>
                <p className="text-gray-dark leading-relaxed">{content.goodToKnow}</p>
              </div>

              {formation && (
                <p className="mt-8">
                  <Link href={`/formations/${formation.slug}`} className="text-navy-deep font-semibold underline decoration-gold decoration-2 underline-offset-4">
                    Tout savoir sur le {formation.shortName} : programme, rythme, débouchés
                  </Link>
                </p>
              )}
            </div>
          </section>

          {/* EMPLOYEURS */}
          <section className="py-16 md:py-20 bg-cream">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <p className="text-navy-deep/70 font-mono text-xs uppercase tracking-[0.2em] mb-3">
                  Employeurs
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4">
                  {content.employerPitchTitle}
                </h2>
                <p className="text-gray-dark leading-relaxed">{content.employerPitch}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button href={employeurPath(path)} variant="navy" className="px-6 py-3.5">
                  Je confirme ma venue
                </Button>
                <Link href="/entreprises" className="text-center text-sm text-navy-deep underline decoration-gold decoration-2 underline-offset-4">
                  Coût d&apos;un alternant et aides à l&apos;embauche
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CLÔTURE CANDIDATS */}
      <section className="py-16 bg-navy-deep">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          {content && (
            <p className="font-serif text-xl md:text-2xl text-white mb-6">
              {content.candidateClosing}
            </p>
          )}
          <Button href={candidatPath(path)} variant="gold" className="px-8 py-4 text-lg">
            Je m&apos;inscris
          </Button>
          <p className="text-cream/70 text-sm mt-6">
            Une question : <a href="tel:+33475003456" className="text-gold font-semibold hover:text-gold-light">04 75 00 34 56</a>
            {" · "}
            <a href="mailto:contact@cadp.pro" className="text-gold font-semibold hover:text-gold-light">contact@cadp.pro</a>
          </p>
        </div>
      </section>
    </>
  );
}
