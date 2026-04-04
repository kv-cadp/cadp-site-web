import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, generateWebApplicationJsonLd } from "@/lib/structured-data";
import EntrepriseQuiz from "./EntrepriseQuiz";

export const metadata = createPageMetadata({
  title: "Quel alternant pour votre entreprise ? — CADP Pierrelatte",
  description:
    "Décrivez les missions de votre futur alternant en 2 minutes. Le CADP à Pierrelatte vous recommande la formation et le profil adaptés, avec simulation du coût employeur.",
  path: "/entreprise-besoin",
});

export default function EntrepriseBesoinPage() {
  return (
    <>
      <JsonLd
        data={generateWebApplicationJsonLd(
          "Outil de matching alternant-entreprise — CADP",
          "Décrivez vos missions en quelques clics. Le CADP vous recommande le profil d'alternant et la formation adaptés, avec estimation du coût employeur.",
          "/entreprise-besoin"
        )}
      />
      <EntrepriseQuiz />
    </>
  );
}
