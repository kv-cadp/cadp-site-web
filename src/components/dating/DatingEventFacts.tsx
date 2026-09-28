import type { DatingEvent } from "@/lib/dating/events";
import {
  buildVenueMapUrl,
  formatEventDateLongWithWeekday,
  formatEventTimeRange,
  formatVenueAddress,
} from "@/lib/format-event";

function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Date, horaires, lieu, adresse complète et itinéraire d'un dating.
 * `tone="dark"` sur fond navy, `tone="light"` sur fond clair.
 */
export default function DatingEventFacts({
  event,
  tone = "light",
}: {
  event: DatingEvent;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const strong = dark ? "text-white" : "text-navy-deep";
  const body = dark ? "text-cream/85" : "text-gray-dark";
  const soft = dark ? "text-cream/65" : "text-gray-mid";
  const icon = dark ? "text-gold" : "text-navy-deep/60";
  const link = dark
    ? "text-gold hover:text-gold-light"
    : "text-navy-deep underline decoration-gold decoration-2 underline-offset-4 hover:decoration-navy-deep";

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <svg className={`size-5 shrink-0 mt-0.5 ${icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <p>
          <span className={`block font-semibold ${strong}`}>
            {capitalize(formatEventDateLongWithWeekday(event.date))}
          </span>
          <span className={`block ${body}`}>
            De {formatEventTimeRange(event.startTime, event.endTime)}
          </span>
        </p>
      </div>
      <div className="flex gap-3">
        <svg className={`size-5 shrink-0 mt-0.5 ${icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <p>
          <span className={`block font-semibold ${strong}`}>{event.venue.name}</span>
          <span className={`block ${body}`}>{formatVenueAddress(event.venue)}</span>
          <a
            href={buildVenueMapUrl(event.venue)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-1 text-sm font-semibold transition-colors ${link}`}
          >
            Voir l&apos;itinéraire
          </a>
          {event.hostNote && (
            <span className={`block mt-2 text-sm ${soft}`}>{event.hostNote}</span>
          )}
        </p>
      </div>
    </div>
  );
}
