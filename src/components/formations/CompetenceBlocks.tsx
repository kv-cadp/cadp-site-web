import SectionTitle from "@/components/ui/SectionTitle";
import type { CompetenceBlock } from "@/types/formation";

interface CompetenceBlocksProps {
  blocks: CompetenceBlock[];
}

export default function CompetenceBlocks({ blocks }: CompetenceBlocksProps) {
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Les compétences que tu vas acquérir, bloc par bloc.">
          Blocs de compétences
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blocks.map((block, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gold"
            >
              <h3 className="font-semibold text-navy-deep mb-4 text-sm leading-snug">
                {block.title}
              </h3>
              <ul className="space-y-2">
                {block.competences.map((comp, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-mid">
                    <svg
                      className="size-4 shrink-0 text-gold mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
