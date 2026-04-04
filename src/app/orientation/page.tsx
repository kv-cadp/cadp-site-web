import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, generateWebApplicationJsonLd } from "@/lib/structured-data";
import OrientationQuiz from "./OrientationQuiz";

export const metadata = createPageMetadata({
  title: "Test d'orientation gratuit — Quelle formation en alternance est faite pour toi ?",
  description:
    "Découvre en quelques minutes quelle formation en alternance correspond à ton profil grâce à notre test RIASEC gratuit. Résultats personnalisés. Campus Alternance Drôme Provence, Pierrelatte.",
  path: "/orientation",
});

export default function OrientationPage() {
  return (
    <>
      <JsonLd
        data={generateWebApplicationJsonLd(
          "Test d'orientation RIASEC — CADP",
          "Test d'orientation gratuit basé sur le profil RIASEC pour découvrir quelle formation en alternance correspond à votre profil.",
          "/orientation"
        )}
      />
      <OrientationQuiz />
    </>
  );
}
