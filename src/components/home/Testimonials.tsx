import SectionTitle from "@/components/ui/SectionTitle";
import { homeTestimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-navy-deep py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle light subtitle="Ils vivent l'alternance au CADP. Voici ce qu'ils en disent.">
          Témoignages
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-navy-medium/50 border border-white/10 rounded-xl p-6 relative flex flex-col"
            >
              {/* Decorative quote */}
              <svg
                className="absolute top-4 right-4 size-6 text-gold/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>

              <p className="text-cream/90 leading-relaxed mb-6 italic text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar : photo ou initiales */}
                <div className="size-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-gold font-semibold text-sm">{t.initials}</span>
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm">{t.name}</p>
                  <p className="text-cream/50 text-xs">
                    {t.formation} — {t.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
