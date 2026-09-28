import Link from "next/link";
import Button from "@/components/ui/Button";

/** Page de lieu sans Alternance Dating à venir (date passée ou non programmée). */
export default function NoUpcomingDating({ city }: { city: string }) {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-navy-deep/70 font-mono text-xs uppercase tracking-[0.2em] mb-4">
          Alternance Dating · {city}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-navy-deep leading-tight mb-5">
          Pas de date programmée à {city} pour le moment
        </h1>
        <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-6" />
        <p className="text-gray-dark leading-relaxed mb-8">
          Cet Alternance Dating est passé ou n&apos;est pas encore annoncé.
          Retrouvez les prochaines dates ci-dessous, ou appelez-nous pour
          recruter un alternant ou trouver votre formation dès maintenant.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button href="/entreprises/alternance-dating" variant="navy">
            Voir les prochaines dates
          </Button>
          <a
            href="tel:+33475003456"
            className="font-semibold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
          >
            04 75 00 34 56
          </a>
        </div>
        <p className="text-sm text-gray-mid mt-8">
          <Link href="/formations" className="underline underline-offset-2 hover:text-navy-deep">
            Toutes nos formations en alternance
          </Link>
        </p>
      </div>
    </section>
  );
}
