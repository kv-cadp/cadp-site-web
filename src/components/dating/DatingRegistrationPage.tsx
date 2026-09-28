import Link from "next/link";
import { getDatingFormationContent } from "@/lib/dating/content";
import {
  DATING_PATH_CITY,
  getNextDatingForPath,
  type DatingPath,
} from "@/lib/dating/events";
import { formatEventDateLongWithWeekday } from "@/lib/format-event";
import DatingCandidatForm from "./DatingCandidatForm";
import DatingEmployeurForm from "./DatingEmployeurForm";
import DatingEventFacts from "./DatingEventFacts";
import NoUpcomingDating from "./NoUpcomingDating";

/**
 * Page d'inscription d'un lieu (adresses des QR codes) :
 * `/dating-<lieu>/candidat` et `/dating-<lieu>/employeur`.
 */
export default function DatingRegistrationPage({
  path,
  audience,
}: {
  path: DatingPath;
  audience: "candidat" | "employeur";
}) {
  const event = getNextDatingForPath(path);
  if (!event) return <NoUpcomingDating city={DATING_PATH_CITY[path]} />;

  const content = getDatingFormationContent(event.formationSlug);
  const dateLabel = formatEventDateLongWithWeekday(event.date);
  const recap = <DatingEventFacts event={event} tone="light" />;
  const isCandidat = audience === "candidat";

  return (
    <>
      <section className="bg-navy-deep py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] mb-4">
            {isCandidat ? "Inscription candidat" : "Invitation employeurs"} · {event.venue.city}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-3">
            {isCandidat ? event.title : "Rencontrez vos futurs alternants"}
          </h1>
          {content && (
            <p className="text-cream/85 text-lg mb-8">
              {isCandidat ? content.headline : `${event.title} · ${content.headline}`}
            </p>
          )}
          <div className="bg-navy-medium rounded-xl p-6 border border-white/10">
            <DatingEventFacts event={event} tone="dark" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-3">
            {isCandidat ? "Je m'inscris" : "Merci de nous confirmer votre venue"}
          </h2>
          <div className="w-16 h-1 bg-gold rounded-full mb-4" />
          <p className="text-gray-mid mb-10">
            {isCandidat
              ? "Deux minutes suffisent. Entrée libre : l'inscription nous permet de préparer votre venue et de prévenir les employeurs."
              : "Deux minutes suffisent. Nous préparons les entretiens avec les candidats en fonction de vos postes."}
          </p>
          {isCandidat ? (
            <DatingCandidatForm
              eventSlug={event.slug}
              eventDateLabel={dateLabel}
              recap={recap}
              closing={content?.candidateClosing ?? "Venez avec un CV si vous en avez un."}
            />
          ) : (
            <DatingEmployeurForm
              eventSlug={event.slug}
              eventDateLabel={dateLabel}
              recap={recap}
            />
          )}
        </div>
      </section>

      {content && !isCandidat && (
        <section className="py-12 md:py-16 bg-cream">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-navy-deep mb-6">Comment ça se passe</h2>
            <ol className="space-y-3">
              {content.employerSteps.map((step, index) => (
                <li key={step} className="flex gap-4 bg-white rounded-xl p-4">
                  <span className="shrink-0 font-mono text-sm text-navy-deep/70 pt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-dark">{step}</span>
                </li>
              ))}
            </ol>
            <h2 className="font-serif text-2xl text-navy-deep mt-12 mb-4">Le rythme</h2>
            <div className="space-y-3 text-gray-dark leading-relaxed">
              {content.employerRhythm.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link href="/entreprises" className="text-navy-deep font-semibold underline decoration-gold decoration-2 underline-offset-4">
                Coût d&apos;un alternant et aides à l&apos;embauche
              </Link>
            </p>
          </div>
        </section>
      )}

      {content && isCandidat && (
        <section className="py-10 bg-cream">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Link href={path} className="text-navy-deep font-semibold underline decoration-gold decoration-2 underline-offset-4">
              La formation, les conditions d&apos;accès et le métier
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
