import Button from "@/components/ui/Button";
import { candidatPath, getUpcomingDatings } from "@/lib/dating/events";
import {
  formatEventDateLongWithWeekday,
  formatEventTimeRange,
} from "@/lib/format-event";

/**
 * Encadré candidats des prochains Alternance Dating d'une formation, sur sa
 * fiche. Chaque dating disparaît à son heure de fin ; rien n'est affiché
 * s'il n'y en a plus à venir.
 */
export default function DatingFormationBlock({ formationSlug }: { formationSlug: string }) {
  const datings = getUpcomingDatings().filter((event) => event.formationSlug === formationSlug);
  if (datings.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-gold-pale rounded-xl p-6 sm:p-8">
          <p className="text-navy-deep/70 font-semibold text-xs uppercase tracking-widest mb-2 text-center">
            Alternance Dating
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-navy-deep mb-2 text-center">
            Rencontrez les employeurs qui recrutent
          </h2>
          <p className="text-gray-mid text-sm text-center mb-6">
            Entretiens sur place avec les structures du secteur. Entrée libre, inscription conseillée.
          </p>
          <ul className="space-y-3">
            {datings.map((event) => (
              <li
                key={event.slug}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg p-4 bg-white border border-gold-pale"
              >
                <div className="text-left">
                  <p className="font-semibold text-navy-deep first-letter:uppercase">
                    {formatEventDateLongWithWeekday(event.date)} ·{" "}
                    <span className="whitespace-nowrap">{formatEventTimeRange(event.startTime, event.endTime)}</span>
                  </p>
                  <p className="text-sm text-gray-mid">
                    {event.venue.name} · {event.venue.city} ({event.venue.region})
                  </p>
                </div>
                <Button href={candidatPath(event.href)} variant="navy" className="shrink-0 px-5 py-2.5 text-sm">
                  Je m&apos;inscris
                  <span className="sr-only">
                    {" "}au dating du {formatEventDateLongWithWeekday(event.date)} à {event.venue.city}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
