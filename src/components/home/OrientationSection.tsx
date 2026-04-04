import Link from "next/link";

export default function OrientationSection() {
  return (
    <section className="bg-navy-deep py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl text-gold text-center mb-14">
          On vous aide à trouver
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Carte candidat */}
          <div className="bg-navy-medium rounded-2xl p-8 flex flex-col">
            <h3 className="font-serif text-2xl text-gold mb-4">
              Tu cherches ta voie ?
            </h3>
            <p className="text-cream text-[0.95rem] leading-relaxed mb-8 flex-1">
              Découvre quelle formation est faite pour toi en quelques minutes.
              On est honnêtes : si ta voie n&apos;est pas chez nous, on te le dit.
            </p>
            <Link
              href="/orientation"
              className="inline-flex items-center gap-2 self-start px-7 py-3 bg-gold text-navy-deep rounded-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Faire le test d&apos;orientation &rarr;
            </Link>
          </div>

          {/* Carte entreprise */}
          <div className="bg-navy-medium rounded-2xl p-8 flex flex-col">
            <h3 className="font-serif text-2xl text-gold mb-4">
              Vous cherchez un alternant ?
            </h3>
            <p className="text-cream text-[0.95rem] leading-relaxed mb-8 flex-1">
              Décrivez vos besoins en 2 minutes. Pas besoin de connaître
              les diplômes — on vous recommande le bon profil.
            </p>
            <Link
              href="/entreprise-besoin"
              className="inline-flex items-center gap-2 self-start px-7 py-3 border-2 border-gold text-gold rounded-lg font-semibold hover:bg-gold hover:text-navy-deep transition-colors"
            >
              Trouver le bon profil &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
