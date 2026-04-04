import Button from "@/components/ui/Button";

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
          <Button href="/contact" variant="gold" className="px-8">
            Je candidate
          </Button>
          <Button href="/contact" variant="white-outline" className="px-8">
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  );
}
