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
import GratuiteBlock from "@/components/formations/GratuiteBlock";
import ResultatsBlock from "@/components/formations/ResultatsBlock";
import DatingFormationBlock from "@/components/dating/DatingFormationBlock";

const formation = getFormationBySlug("tp-advf")!;

export const metadata = createPageMetadata({
  title: formation.metaTitle,
  description: formation.metaDescription,
  path: "/formations/tp-advf",
});

// Fiche au vouvoiement (public en grande partie adulte, comme les affiches
// et les pages Alternance Dating) : les intertitres communs sont réécrits ici.
export default function TPADVFPage() {
  return (
    <article>
      <JsonLd data={generateCourseJsonLd(formation)} />
      <JsonLd data={generateFAQJsonLd(formation.faq)} />
      <FormationHero formation={formation} />
      <GratuiteBlock />
      <DatingFormationBlock formationSlug={formation.slug} />
      <CompetenceBlocks
        blocks={formation.competenceBlocks}
        subtitle="Les compétences que vous allez acquérir, bloc par bloc."
      />
      <ProgramSection
        program={formation.program}
        subtitle="Ce que vous allez apprendre, certificat par certificat."
      />
      <AlternanceRhythm rhythm={formation.rhythm} />
      <CareerOutcomes
        careers={formation.careers}
        subtitle="Les métiers qui vous attendent après votre titre."
      />
      <FurtherStudies
        studies={formation.furtherStudies}
        prerequisites={formation.prerequisites}
        studiesSubtitle="Les portes qui s'ouvrent après votre titre."
        prerequisitesTitle="Conditions d'accès"
        prerequisitesSubtitle="Qui peut entrer en formation."
      />
      <FormationTestimonial testimonial={formation.testimonial} />
      <FormationFAQ
        faq={formation.faq}
        formationName={formation.shortName}
        subtitle={`Toutes les réponses à vos questions sur le ${formation.shortName}.`}
      />
      <FormationCTA
        formationName={formation.shortName}
        formationCode={formation.code.toLowerCase()}
        title={`Le ${formation.shortName} vous intéresse ?`}
        text="Les places sont limitées à 12 par promotion. Déposez votre candidature ou contactez-nous pour en savoir plus."
      />
      <ResultatsBlock formation={formation} />
    </article>
  );
}
