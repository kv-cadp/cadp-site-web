import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { RESULTATS } from "@/data/resultats";
import type { Formation } from "@/types/formation";

export default function ResultatsBlock({ formation }: { formation?: Formation }) {
  const resultats = formation ? RESULTATS[formation.slug] : undefined;

  if (!resultats || !formation) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-0">
        <h3 className="text-sm font-bold text-navy-deep mb-1">
          Indicateurs de résultats
        </h3>
        <p className="text-sm text-gray-mid">
          Le CADP a ouvert ses portes en septembre 2024. Les taux de réussite,
          d&apos;insertion professionnelle et de poursuite d&apos;études sont
          publiés dès leur disponibilité, à l&apos;issue de chaque promotion.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-2">
          Nos résultats
        </h2>
        <p className="text-gray-mid text-sm mb-8">
          {formation.shortName} — Promotion {resultats.promotion}
        </p>
        <AnimatedCounter
          value={resultats.taux}
          suffix="%"
          label="de réussite à l'examen"
        />
        <p className="mt-6 text-gray-dark">
          <span className="font-semibold text-navy-deep">
            {resultats.admis} admis
          </span>{" "}
          sur {resultats.presentes} présentés à l&apos;examen (session{" "}
          {resultats.session}).
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-gray-mid">
          Résultats de la première promotion du CADP. Diplôme national préparé
          via le CFA IFIR, certifié Qualiopi. Les taux d&apos;insertion
          professionnelle et de poursuite d&apos;études seront publiés dès leur
          disponibilité.
        </p>
      </div>
    </section>
  );
}
