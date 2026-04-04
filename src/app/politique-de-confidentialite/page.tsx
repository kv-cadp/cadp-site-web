import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Politique de confidentialité — Campus Alternance Drôme Provence",
  description:
    "Politique de confidentialité et protection des données personnelles du site cadp.pro. RGPD, droits des utilisateurs, cookies, hébergement.",
  path: "/politique-de-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-navy-deep mb-4">Politique de confidentialité</h1>
        <p className="text-gray-mid text-sm mb-10">Dernière mise à jour : avril 2026</p>

        <div className="space-y-10 text-sm leading-relaxed">
          {/* 1. Responsable de traitement */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">1. Responsable du traitement</h2>
            <div className="text-gray-mid space-y-1">
              <p>Le responsable du traitement des données collectées sur le site cadp.pro est :</p>
              <p className="mt-2"><strong className="text-gray-dark">SAS Campus Alternance Drôme Provence - CADP</strong></p>
              <p>2 Boulevard Frédéric Mistral, 26700 Pierrelatte</p>
              <p>SIRET : 932 985 922 00024</p>
              <p>Contact RGPD : <a href="mailto:contact@cadp.pro" className="text-gold hover:text-gold-light">contact@cadp.pro</a></p>
              <p>Téléphone : <a href="tel:+33475003456" className="text-gold hover:text-gold-light">04 75 00 34 56</a></p>
            </div>
          </div>

          {/* 2. Données collectées */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">2. Données personnelles collectées</h2>
            <div className="text-gray-mid space-y-4">
              <p>
                Nous collectons des données personnelles uniquement lorsque vous les transmettez volontairement via les formulaires du site. Aucune donnée n&apos;est collectée automatiquement à votre insu.
              </p>

              <div>
                <h3 className="font-semibold text-gray-dark mb-1">Formulaire de contact (/contact)</h3>
                <p>Données collectées : prénom, nom, adresse email, numéro de téléphone, objet de la demande, message.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-dark mb-1">Questionnaire d&apos;orientation (/orientation)</h3>
                <p>Données collectées : niveau scolaire, situation actuelle, centres d&apos;intérêt (réponses RIASEC), préférences sectorielles, auto-évaluation de compétences, projet professionnel. Si vous choisissez d&apos;être recontacté(e) : prénom, nom, email, téléphone, ville.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-dark mb-1">Questionnaire entreprise (/entreprise-besoin)</h3>
                <p>Données collectées : secteur d&apos;activité, effectif, missions souhaitées, critères de recrutement. Si vous choisissez d&apos;être recontacté(e) : nom de l&apos;entreprise, nom, prénom, fonction, email, téléphone.</p>
              </div>
            </div>
          </div>

          {/* 3. Finalités */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">3. Finalités du traitement</h2>
            <div className="text-gray-mid">
              <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Répondre à vos demandes d&apos;information (formulaire de contact)</li>
                <li>Vous fournir des recommandations d&apos;orientation personnalisées (questionnaire candidat)</li>
                <li>Vous recommander un profil d&apos;alternant adapté à vos besoins (questionnaire entreprise)</li>
                <li>Vous recontacter si vous en avez fait la demande</li>
                <li>Assurer la mise en relation entre candidats et entreprises partenaires</li>
              </ul>
            </div>
          </div>

          {/* 4. Base légale */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">4. Base légale du traitement</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                <strong className="text-gray-dark">Consentement</strong> (article 6.1.a du RGPD) : en soumettant un formulaire sur ce site, vous consentez au traitement de vos données pour les finalités décrites ci-dessus.
              </p>
              <p>
                <strong className="text-gray-dark">Intérêt légitime</strong> (article 6.1.f du RGPD) : le traitement de vos données est également nécessaire pour répondre à vos demandes et assurer le bon fonctionnement de nos services d&apos;orientation.
              </p>
            </div>
          </div>

          {/* 5. Durée de conservation */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">5. Durée de conservation</h2>
            <p className="text-gray-mid">
              Vos données personnelles sont conservées pendant une durée maximale de <strong className="text-gray-dark">3 ans après le dernier contact</strong>. Passé ce délai, elles sont supprimées ou anonymisées.
            </p>
          </div>

          {/* 6. Destinataires */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">6. Destinataires des données</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                Vos données sont destinées exclusivement à l&apos;équipe pédagogique et administrative du CADP.
              </p>
              <p>
                <strong className="text-gray-dark">Aucune donnée n&apos;est transmise, vendue ou louée à des tiers</strong> (publicitaires, partenaires commerciaux, etc.).
              </p>
              <p>
                Les données du formulaire de contact transitent par le service Web3Forms (sous-traitant technique) pour l&apos;acheminement des messages par email.
              </p>
            </div>
          </div>

          {/* 7. Droits des personnes */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">7. Vos droits</h2>
            <div className="text-gray-mid space-y-2">
              <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong className="text-gray-dark">Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong className="text-gray-dark">Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong className="text-gray-dark">Droit d&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-gray-dark">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong className="text-gray-dark">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong className="text-gray-dark">Droit à la limitation :</strong> demander la restriction du traitement</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@cadp.pro" className="text-gold hover:text-gold-light font-semibold">contact@cadp.pro</a>
              </p>
              <p>
                Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) : <span className="text-gray-dark">www.cnil.fr</span>.
              </p>
            </div>
          </div>

          {/* 8. Cookies */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">8. Cookies</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                <strong className="text-gray-dark">Ce site n&apos;utilise pas de cookies de suivi, de publicité ni d&apos;analyse d&apos;audience.</strong>
              </p>
              <p>
                Seuls des cookies strictement nécessaires au fonctionnement technique du site peuvent être déposés par l&apos;hébergeur (Vercel). Ces cookies ne nécessitent pas votre consentement conformément à la réglementation en vigueur.
              </p>
              <p>
                Aucun outil d&apos;analyse d&apos;audience (Google Analytics, Matomo, etc.) n&apos;est utilisé sur ce site.
              </p>
            </div>
          </div>

          {/* 9. Hébergement */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">9. Hébergement des données</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                Ce site est hébergé par <strong className="text-gray-dark">Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              </p>
              <p>
                Les données sont susceptibles d&apos;être hébergées aux États-Unis. Le transfert de données hors de l&apos;Union européenne est encadré par les clauses contractuelles types (CCT) de la Commission européenne, conformément aux articles 46 et 47 du RGPD.
              </p>
            </div>
          </div>

          {/* 10. Modifications */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">10. Modifications de cette politique</h2>
            <p className="text-gray-mid">
              Le CADP se réserve le droit de modifier cette politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous invitons à la consulter régulièrement.
            </p>
          </div>

          {/* Retour */}
          <div className="pt-6 border-t border-gray-200">
            <Link href="/mentions-legales" className="text-gold hover:text-gold-light font-semibold text-sm">
              ← Retour aux mentions légales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
