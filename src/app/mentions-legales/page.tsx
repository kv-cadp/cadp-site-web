import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Mentions légales — Campus Alternance Drôme Provence",
  description:
    "Mentions légales du site cadp.pro — SAS Campus Alternance Drôme Provence, Pierrelatte. SIRET 932 985 922 00024. Informations légales, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-navy-deep mb-10">Mentions légales</h1>

        <div className="space-y-10 text-sm leading-relaxed">
          {/* 1. Éditeur */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Éditeur du site</h2>
            <div className="text-gray-mid space-y-1">
              <p><strong className="text-gray-dark">Raison sociale :</strong> SAS Campus Alternance Drôme Provence - CADP</p>
              <p><strong className="text-gray-dark">Forme juridique :</strong> Société par actions simplifiée (SAS)</p>
              <p><strong className="text-gray-dark">Capital social :</strong> 300 €</p>
              <p><strong className="text-gray-dark">SIRET :</strong> 932 985 922 00024</p>
              <p><strong className="text-gray-dark">RCS :</strong> Romans-sur-Isère</p>
              <p><strong className="text-gray-dark">Siège social :</strong> 2 Boulevard Frédéric Mistral, 26700 Pierrelatte</p>
              <p><strong className="text-gray-dark">Téléphone :</strong> <a href="tel:+33475003456" className="text-gold hover:text-gold-light">04 75 00 34 56</a></p>
              <p><strong className="text-gray-dark">Email :</strong> <a href="mailto:contact@cadp.pro" className="text-gold hover:text-gold-light">contact@cadp.pro</a></p>
              <p><strong className="text-gray-dark">Directeur de la publication :</strong> Laurent Aubret — laurent.aubret@cadp.pro</p>
              <p><strong className="text-gray-dark">Directeur général et responsable pédagogique :</strong> Kévin Vidard — kevin.vidard@cadp.pro</p>
            </div>
          </div>

          {/* 2. Hébergeur */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Hébergement</h2>
            <div className="text-gray-mid space-y-1">
              <p>Ce site est hébergé par <strong className="text-gray-dark">Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p>Site web : vercel.com</p>
            </div>
          </div>

          {/* 3. NDA */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Déclaration d&apos;activité</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                Enregistré sous le numéro <strong className="text-gray-dark">84260401226</strong> auprès du préfet de région Auvergne-Rhône-Alpes.
              </p>
              <p className="italic">
                Cet enregistrement ne vaut pas agrément de l&apos;État.
              </p>
            </div>
          </div>

          {/* 4. Certification */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">CFA de rattachement et certification</h2>
            <p className="text-gray-mid">
              Le CADP est adossé au <strong className="text-gray-dark">CFA IFIR</strong>, certifié <strong className="text-gray-dark">Qualiopi</strong> au titre des actions de formation par apprentissage.
              Les formations sont dispensées dans le cadre réglementaire du CFA IFIR.
            </p>
          </div>

          {/* 5. Propriété intellectuelle */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Propriété intellectuelle</h2>
            <p className="text-gray-mid">
              L&apos;ensemble du contenu de ce site (textes, images, logo, graphismes, vidéos, sons, mise en page) est la propriété exclusive de la SAS Campus Alternance Drôme Provence ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, est interdite sans autorisation préalable écrite, conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </div>

          {/* 6. Limitation de responsabilité */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Limitation de responsabilité</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                Le CADP s&apos;efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, il ne pourra être tenu responsable des oublis, inexactitudes ou carences dans la mise à jour, qu&apos;elles soient de son fait ou de celui des tiers partenaires qui lui fournissent ces informations.
              </p>
              <p>
                Les résultats des questionnaires d&apos;orientation et du simulateur de coût sont fournis à titre indicatif et ne constituent ni un conseil en orientation professionnelle au sens légal, ni un engagement contractuel.
              </p>
            </div>
          </div>

          {/* 7. Accessibilité & Référent handicap */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Accessibilité et handicap</h2>
            <div className="text-gray-mid space-y-2">
              <p>
                Le CADP s&apos;engage à rendre ses formations accessibles aux personnes en situation de handicap. Un accompagnement personnalisé est proposé pour adapter le parcours de formation.
              </p>
              <p>
                <strong className="text-gray-dark">Référent handicap :</strong> Laurent Aubret —{" "}
                <a href="mailto:laurent.aubret@cadp.pro" className="text-gold hover:text-gold-light">laurent.aubret@cadp.pro</a>
              </p>
            </div>
          </div>

          {/* 8. Données personnelles */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Protection des données personnelles</h2>
            <p className="text-gray-mid">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez de droits sur vos données personnelles.
              Pour plus d&apos;informations, consultez notre{" "}
              <Link href="/politique-de-confidentialite" className="text-gold hover:text-gold-light font-semibold">
                politique de confidentialité
              </Link>.
            </p>
          </div>

          {/* 9. Droit applicable */}
          <div>
            <h2 className="font-serif text-xl text-navy-deep mb-3">Droit applicable</h2>
            <p className="text-gray-mid">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, compétence est attribuée aux tribunaux compétents de Valence (Drôme).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
