import { createPageMetadata } from "@/lib/metadata";
import CandidaterForm from "./CandidaterForm";

export const metadata = createPageMetadata({
  title: "Je candidate — Campus Alternance Drôme Provence",
  description:
    "Candidatez en alternance au CADP à Pierrelatte. BTS MCO, NDRC, GPME, CG, MOS, Bachelor RQSE et TP ADVF. Promos de 12 étudiants, accompagnement individualisé.",
  path: "/candidater",
});

type CandidaterPageProps = {
  searchParams: Promise<{ formation?: string | string[]; source?: string | string[] }>;
};

const premier = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function CandidaterPage({ searchParams }: CandidaterPageProps) {
  // ?formation=mco&source=site_fiche_hero : liens « Je candidate » des fiches (lib/inscription.ts)
  const { formation, source } = await searchParams;
  return <CandidaterForm formationInitiale={premier(formation)} source={premier(source)} />;
}
