import Link from "next/link";
import { SITE } from "@/data/site";

/**
 * Information RGPD au point de collecte des formulaires de contact et de
 * candidature. Le texte suit la politique de confidentialité (finalité,
 * conservation 3 ans après le dernier contact, exercice des droits) : à
 * modifier en même temps qu'elle.
 */
export default function FormPrivacyNotice() {
  return (
    <p className="text-xs text-gray-mid leading-relaxed">
      Tes informations servent uniquement à répondre à ta demande et à te recontacter. Elles sont
      conservées 3 ans au plus après notre dernier échange. Pour y accéder, les corriger ou les
      supprimer : {SITE.email}. Voir la{" "}
      <Link
        href="/politique-de-confidentialite"
        target="_blank"
        className="font-semibold text-navy-deep underline decoration-gold underline-offset-2"
      >
        politique de confidentialité
      </Link>
      .
    </p>
  );
}
