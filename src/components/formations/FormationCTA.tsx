interface FormationCTAProps {
  formationName: string;
}

export default function FormationCTA({ formationName }: FormationCTAProps) {
  return (
    <section className="py-16 bg-navy-deep">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
          Le {formationName} t&apos;intéresse ?
        </h2>
        <p className="text-cream/70 mb-8 max-w-lg mx-auto">
          Les places sont limitées à 12 par promo. Dépose ta candidature ou contacte-nous pour en savoir plus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://app.cadp.pro/inscription"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-base hover:bg-gold-light transition-colors"
          >
            Je candidate à cette formation
          </a>
          <a
            href="https://app.cadp.pro/connexion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-lg font-semibold text-base hover:bg-gold hover:text-navy-deep transition-colors"
          >
            Déjà inscrit ? Mon espace
          </a>
        </div>
      </div>
    </section>
  );
}
