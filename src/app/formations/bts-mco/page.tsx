import { getFormationBySlug } from "@/data/formations";
import { createPageMetadata } from "@/lib/metadata";
import {
  JsonLd,
  generateCourseJsonLd,
  generateFAQJsonLd,
} from "@/lib/structured-data";
import FormationHero from "@/components/formations/FormationHero";
import ProgramSection from "@/components/formations/ProgramSection";
import AlternanceRhythm from "@/components/formations/AlternanceRhythm";
import CareerOutcomes from "@/components/formations/CareerOutcomes";
import FormationFAQ from "@/components/formations/FormationFAQ";
import FormationTestimonial from "@/components/formations/FormationTestimonial";
import FormationCTA from "@/components/formations/FormationCTA";
import CompetenceBlocks from "@/components/formations/CompetenceBlocks";
import FurtherStudies from "@/components/formations/FurtherStudies";

const formation = getFormationBySlug("bts-mco")!;

export const metadata = createPageMetadata({
  title: formation.metaTitle,
  description: formation.metaDescription,
  path: "/formations/bts-mco",
});

export default function BTSMCOPage() {
  return (
    <article>
      <JsonLd data={generateCourseJsonLd(formation)} />
      <JsonLd data={generateFAQJsonLd(formation.faq)} />
      <FormationHero formation={formation} />
      <CompetenceBlocks blocks={formation.competenceBlocks} />
      <ProgramSection program={formation.program} />
      <AlternanceRhythm rhythm={formation.rhythm} />
      <CareerOutcomes careers={formation.careers} />
      <FurtherStudies studies={formation.furtherStudies} prerequisites={formation.prerequisites} />
      <FormationTestimonial testimonial={formation.testimonial} />
      <FormationFAQ faq={formation.faq} formationName={formation.shortName} />
      <FormationCTA formationName={formation.shortName} />
    </article>
  );
}
