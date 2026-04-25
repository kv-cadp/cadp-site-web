import SectionTitle from "@/components/ui/SectionTitle";
import type { AlternanceRhythm as AlternanceRhythmType } from "@/types/formation";

interface AlternanceRhythmProps {
  rhythm: AlternanceRhythmType;
}

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export default function AlternanceRhythm({ rhythm }: AlternanceRhythmProps) {
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Un rythme pensé pour apprendre et travailler en parallèle.">
          Rythme de l&apos;alternance
        </SectionTitle>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="grid grid-cols-5 gap-3 mb-6">
            {days.map((day, i) => {
              const isSchool = rhythm.campusDays.includes(i);
              return (
                <div
                  key={day}
                  className={`rounded-lg p-4 text-center transition-all ${
                    isSchool
                      ? "bg-navy-deep text-white"
                      : "bg-gold/10 text-gold border border-gold/20"
                  }`}
                >
                  <span className="block text-xs font-semibold uppercase mb-1 opacity-70">
                    {day}
                  </span>
                  <span className="block text-sm font-bold">
                    {isSchool ? "Campus" : "Entreprise"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-navy-deep" />
              <span className="text-gray-mid">{rhythm.schoolDays} jours au campus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gold/20 border border-gold/30" />
              <span className="text-gray-mid">{rhythm.companyDays} jours en entreprise</span>
            </div>
          </div>

          <p className="text-center text-sm font-semibold text-navy-deep mt-6">
            Cours : {rhythm.horaires}
          </p>
        </div>

        <p className="text-gray-mid text-center max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
          {rhythm.description}
        </p>
      </div>
    </section>
  );
}
