import { createPageMetadata } from "@/lib/metadata";
import CandidaterForm from "./CandidaterForm";

export const metadata = createPageMetadata({
  title: "Je candidate — Campus Alternance Drôme Provence",
  description:
    "Candidatez en alternance au CADP à Pierrelatte. BTS MCO, NDRC, GPME, CG, MOS et TP ADVF. Promos de 12 étudiants, accompagnement individualisé.",
  path: "/candidater",
});

export default function CandidaterPage() {
  return <CandidaterForm />;
}
