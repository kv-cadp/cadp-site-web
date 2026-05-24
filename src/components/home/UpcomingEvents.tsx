import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { getUpcomingEvents } from "@/data/events";
import { formatEventDay, buildEventLocationLine } from "@/lib/format-event";

export default function UpcomingEvents() {
  const events = getUpcomingEvents();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encart rentrée 2026 */}
        <Link href="/rentree-2026">
          <div className="bg-navy-deep rounded-xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-navy-medium transition-colors group">
            <div>
              <p className="text-gold font-semibold text-xs uppercase tracking-wider mb-1">Rentrée septembre 2026</p>
              <p className="text-white font-serif text-lg">Six formations en alternance. 12 places par promo, pas une de plus.</p>
              <p className="text-cream/60 text-sm mt-1">Les inscriptions sont ouvertes.</p>
            </div>
            <span className="shrink-0 px-6 py-2.5 bg-gold text-navy-deep rounded-lg font-semibold text-sm group-hover:bg-gold-light transition-colors">
              Tout savoir →
            </span>
          </div>
        </Link>

        <SectionTitle subtitle="Rencontres, ateliers, immersions. On t'attend.">
          Prochains événements
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => {
            const dayMonth = event.date ? formatEventDay(event.date) : null;
            const locationLine = buildEventLocationLine(event.location, event.startTime, event.endTime);
            const inner = (
              <Card
                className={`flex gap-4 h-full ${event.href ? "border border-transparent hover:border-gold transition-colors" : ""}`}
              >
                <div className="shrink-0 bg-navy-deep text-center rounded-lg px-3 py-2 min-w-[60px] flex items-center justify-center">
                  {dayMonth ? (
                    <div>
                      <span className="block text-gold font-serif text-2xl leading-none">
                        {dayMonth.day}
                      </span>
                      <span className="block text-cream/70 text-xs font-semibold uppercase mt-1">
                        {dayMonth.month}
                      </span>
                    </div>
                  ) : (
                    <svg className="size-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-deep mb-1">{event.title}</h3>
                  <p className="text-gold text-xs font-medium mb-2">{locationLine}</p>
                  <p className="text-gray-mid text-sm leading-relaxed">{event.shortDescription}</p>
                </div>
              </Card>
            );

            if (event.href) {
              return (
                <Link key={event.slug} href={event.href} className="block">
                  {inner}
                </Link>
              );
            }
            return <div key={event.slug}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
