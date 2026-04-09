import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-navy-deep min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-medium to-navy-light opacity-80" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-6 animate-fade-in">
          Campus Alternance Drôme Provence
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl mx-auto leading-tight mb-6">
          Première génération.
          <br />
          <span className="text-gold">Zéro routine.</span>
          <br />
          Tout à prouver.
        </h1>

        <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Formations en alternance à Pierrelatte. Diplôme, expérience, emploi.
          Promos de 12 étudiants, accompagnement individualisé.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#formations" variant="gold" className="text-lg px-8 py-4">
            Découvrir nos formations
          </Button>
          <Button href="/contact" variant="white-outline" className="text-lg px-8 py-4">
            Nous contacter
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <svg
            className="size-8 text-gold/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
