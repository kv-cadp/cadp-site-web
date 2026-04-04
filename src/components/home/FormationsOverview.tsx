import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { formations } from "@/data/formations";

export default function FormationsOverview() {
  return (
    <section id="formations" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Pas de promo à 40. Ici on te connaît par ton prénom.">
          Nos formations en alternance
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <Link key={formation.slug} href={`/formations/${formation.slug}`}>
              <Card className="h-full group">
                <Badge variant="gold" className="mb-4">
                  {formation.code}
                </Badge>
                <h3 className="font-serif text-xl text-navy-deep mb-3 group-hover:text-gold transition-colors">
                  {formation.fullName}
                </h3>
                <p className="text-gray-mid text-sm leading-relaxed mb-4">
                  {formation.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-mid">
                  <span className="bg-cream px-2 py-0.5 rounded text-xs font-medium">
                    {formation.level}
                  </span>
                  <span className="bg-cream px-2 py-0.5 rounded text-xs font-medium">
                    {formation.duration}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                  En savoir plus
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
