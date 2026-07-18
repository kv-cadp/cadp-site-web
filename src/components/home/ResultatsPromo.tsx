import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { RESULTATS_PROMO } from "@/data/resultats";

export default function ResultatsPromo() {
  const r = RESULTATS_PROMO;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle={`Première promotion diplômée, session ${r.session}.`}>
          Nos résultats
        </SectionTitle>

        <div className="flex flex-col items-center">
          <AnimatedCounter
            value={r.taux}
            suffix="%"
            label="de réussite à l'examen"
          />
          <p className="mt-6 text-center text-gray-dark">
            <span className="font-semibold text-navy-deep">
              {r.admis} admis
            </span>{" "}
            sur {r.presentes} présentés — promotion {r.promotion}.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-gray-mid">
            100% en BTS GPME et BTS MOS, 86% en BTS NDRC. Diplômes préparés via
            le CFA IFIR, certifié Qualiopi.
          </p>
          <div className="mt-8">
            <Button href="/formations" variant="outline">
              Voir nos formations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
