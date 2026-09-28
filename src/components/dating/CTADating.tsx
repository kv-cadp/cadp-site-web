import Link from "next/link";
import Button from "@/components/ui/Button";
import { getFormationBySlug } from "@/data/formations";
import { employeurPath, getUpcomingDatings } from "@/lib/dating/events";
import {
  formatEventDateLongWithWeekday,
  formatEventTimeRange,
} from "@/lib/format-event";

interface CTADatingProps {
  variant: "banniere" | "carte";
}

const TAGLINE = "Événement entreprises";
const TITLE = "Alternance Dating : rencontrez vos futurs alternants";

/**
 * Encart des prochains Alternance Dating (bannière de /entreprises, carte
 * des articles). Rien n'est affiché s'il n'y a pas de dating à venir.
 */
export default function CTADating({ variant }: CTADatingProps) {
  const datings = getUpcomingDatings();
  if (datings.length === 0) return null;

  const dark = variant === "banniere";
  const items = datings.map((event) => ({
    key: event.slug,
    href: employeurPath(event.href),
    when: `${formatEventDateLongWithWeekday(event.date)} · ${formatEventTimeRange(event.startTime, event.endTime)}`,
    where: [
      `${event.venue.city} (${event.venue.region})`,
      event.formationSlug ? getFormationBySlug(event.formationSlug)?.shortName : undefined,
    ]
      .filter(Boolean)
      .join(" · "),
  }));

  const list = (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.key}
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg p-4 ${
            dark ? "bg-navy-medium border border-white/10" : "bg-white border border-gold-pale"
          }`}
        >
          <div className="text-left">
            <p className={`font-semibold first-letter:uppercase ${dark ? "text-white" : "text-navy-deep"}`}>
              {item.when}
            </p>
            <p className={`text-sm ${dark ? "text-cream/75" : "text-gray-mid"}`}>{item.where}</p>
          </div>
          <Button href={item.href} variant={dark ? "gold" : "navy"} className="shrink-0 px-5 py-2.5 text-sm">
            Je confirme ma venue
          </Button>
        </li>
      ))}
    </ul>
  );

  if (dark) {
    return (
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-2">{TAGLINE}</p>
          <h2 className="font-serif text-xl md:text-2xl text-white mb-5 leading-tight">{TITLE}</h2>
          {list}
          <p className="mt-4 text-sm">
            <Link href="/entreprises/alternance-dating" className="text-cream/80 underline underline-offset-4 hover:text-white">
              Comment se déroule un Alternance Dating
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-cream border border-gold-pale rounded-xl p-6 sm:p-8">
      <p className="text-navy-deep/70 font-semibold text-xs uppercase tracking-widest mb-2 text-center">{TAGLINE}</p>
      <h3 className="font-serif text-xl text-navy-deep mb-5 text-center">{TITLE}</h3>
      {list}
      <p className="mt-4 text-sm text-center">
        <Link href="/entreprises/alternance-dating" className="text-navy-deep underline decoration-gold decoration-2 underline-offset-4">
          Comment se déroule un Alternance Dating
        </Link>
      </p>
    </div>
  );
}
