import type { Testimonial } from "@/types/formation";

interface FormationTestimonialProps {
  testimonial: Testimonial;
}

export default function FormationTestimonial({ testimonial }: FormationTestimonialProps) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-deep rounded-xl p-8 md:p-10 text-center relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-4 left-4 text-gold/10 text-8xl font-serif leading-none">
            &ldquo;
          </div>

          <p className="relative text-cream/90 text-lg md:text-xl leading-relaxed italic mb-6 max-w-2xl mx-auto">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div>
            <p className="text-gold font-semibold">{testimonial.name}</p>
            <p className="text-cream/50 text-sm">
              {testimonial.formation} — {testimonial.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
