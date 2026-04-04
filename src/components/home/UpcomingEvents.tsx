import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const events = [
  {
    day: "29",
    month: "AVR",
    title: "Alternance Dating",
    location: "CADP Pierrelatte — 14h à 16h",
    description:
      "Rencontre directe avec nos entreprises partenaires. Viens avec ton CV, repars avec des propositions d'alternance.",
  },
  {
    day: "",
    month: "",
    title: "Visite du campus sur rendez-vous",
    location: "CADP Pierrelatte",
    description:
      "Tu veux découvrir le campus, rencontrer les formateurs et poser tes questions ? Appelle-nous au 04 75 00 34 56 pour fixer un créneau. On t'accueille individuellement.",
    isOpenRdv: true,
  },
  {
    day: "14",
    month: "MAI",
    title: "Atelier CV & Coaching entretien",
    location: "CADP Pierrelatte — 10h à 12h",
    description:
      "On t'aide à construire un CV percutant et à préparer tes entretiens. Ouvert à tous les candidats, même si tu n'es pas encore inscrit.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Rencontres, ateliers, immersions. On t'attend.">
          Prochains événements
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <Card key={i} className="flex gap-4">
              <div className="shrink-0 bg-navy-deep text-center rounded-lg px-3 py-2 min-w-[60px] flex items-center justify-center">
                {event.day ? (
                  <div>
                    <span className="block text-gold font-serif text-2xl leading-none">
                      {event.day}
                    </span>
                    <span className="block text-cream/70 text-xs font-semibold uppercase mt-1">
                      {event.month}
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
                <p className="text-gold text-xs font-medium mb-2">{event.location}</p>
                <p className="text-gray-mid text-sm leading-relaxed">{event.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
