import SectionTitle from "@/components/ui/SectionTitle";
import Accordion from "@/components/ui/Accordion";
import type { FAQItem } from "@/types/formation";

interface FormationFAQProps {
  faq: FAQItem[];
  formationName: string;
}

export default function FormationFAQ({ faq, formationName }: FormationFAQProps) {
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={`Toutes les réponses à tes questions sur le ${formationName}.`}
        >
          Questions fréquentes
        </SectionTitle>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
