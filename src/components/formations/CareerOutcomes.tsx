import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import type { Career } from "@/types/formation";

interface CareerOutcomesProps {
  careers: Career[];
}

export default function CareerOutcomes({ careers }: CareerOutcomesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Les métiers qui t'attendent après ton diplôme.">
          Débouchés professionnels
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career, i) => (
            <Card key={i}>
              <h3 className="font-semibold text-navy-deep text-lg mb-2">
                {career.title}
              </h3>
              <p className="text-gray-mid text-sm leading-relaxed mb-3">
                {career.description}
              </p>
              {career.salary && (
                <div className="flex items-center gap-2 text-gold text-sm font-medium">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {career.salary}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
