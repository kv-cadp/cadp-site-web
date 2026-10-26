import Link from "next/link";
import { CADP_ORG_NAME } from "@/data/org";
import { SITE } from "@/data/site";
import NewTabHint from "@/components/ui/NewTabHint";

interface FormPrivacyNoticeProps {
  /** Vouvoiement pour une entreprise ; tutoiement par défaut (candidat). */
  vous?: boolean;
  /** Candidature : le profil est aussi présenté aux entreprises, avec l'accord coché (ConsentCheckbox). */
  candidature?: boolean;
}

const linkClass = "font-semibold text-navy-deep underline decoration-gold underline-offset-2";

/**
 * Information RGPD au point de collecte des formulaires de contact et de
 * candidature. Le texte suit la politique de confidentialité (responsable du
 * traitement, finalité, conservation 3 ans après le dernier contact, exercice
 * des droits) : à modifier en même temps qu'elle.
 */
export default function FormPrivacyNotice({ vous = false, candidature = false }: FormPrivacyNoticeProps) {
  const finalite = candidature
    ? "utilise tes informations pour étudier ta candidature, te recontacter et, avec ton accord, présenter ton profil aux entreprises qui recrutent des alternants."
    : vous
      ? "utilise vos informations uniquement pour répondre à votre demande et vous recontacter."
      : "utilise tes informations uniquement pour répondre à ta demande et te recontacter.";

  return (
    <p className="text-xs text-gray-mid leading-relaxed">
      Le CADP (SAS {CADP_ORG_NAME}), responsable du traitement,{" "}{finalite}{" "}Elles sont
      conservées 3 ans au plus après notre dernier échange. Pour y accéder, les corriger ou les
      supprimer :{" "}
      <a href={`mailto:${SITE.email}`} className={linkClass}>
        {SITE.email}
      </a>
      . Voir la{" "}
      <Link href="/politique-de-confidentialite" target="_blank" className={linkClass}>
        politique de confidentialité
        <NewTabHint />
      </Link>
      .
    </p>
  );
}
