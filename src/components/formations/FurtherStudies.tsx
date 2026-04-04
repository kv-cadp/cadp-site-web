import SectionTitle from "@/components/ui/SectionTitle";

interface FurtherStudiesProps {
  studies: string[];
  prerequisites: string[];
}

export default function FurtherStudies({ studies, prerequisites }: FurtherStudiesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Poursuites d'études */}
          <div>
            <h2 className="font-serif text-2xl text-navy-deep mb-2">
              Poursuites d&apos;études
            </h2>
            <p className="text-gray-mid text-sm mb-6">
              Les portes qui s&apos;ouvrent après ton diplôme.
            </p>
            <div className="w-12 h-1 bg-gold rounded-full mb-6" />
            <ul className="space-y-3">
              {studies.map((study, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="shrink-0 mt-1">
                    <div className="size-5 rounded-full bg-gold/10 flex items-center justify-center">
                      <svg className="size-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-dark">{study}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prérequis */}
          <div>
            <h2 className="font-serif text-2xl text-navy-deep mb-2">
              Formations accessibles
            </h2>
            <p className="text-gray-mid text-sm mb-6">
              Les profils qui peuvent intégrer cette formation.
            </p>
            <div className="w-12 h-1 bg-gold rounded-full mb-6" />
            <ul className="space-y-3">
              {prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="shrink-0 mt-1">
                    <div className="size-5 rounded-full bg-navy-deep/10 flex items-center justify-center">
                      <svg className="size-3 text-navy-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-dark">{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
