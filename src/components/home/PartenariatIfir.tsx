import SectionTitle from "@/components/ui/SectionTitle";
import NewTabHint from "@/components/ui/NewTabHint";

/**
 * Partenariat CADP / CFA IFIR mis en avant sur l'accueil, avec renvoi vers
 * www.ifir.fr (consigne de la responsable qualité de l'IFIR, 27/10/2026).
 * Texte seul : ni logo IFIR ni mention Qualiopi.
 */
export default function PartenariatIfir() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle className="mb-6">Partenaire du CFA IFIR</SectionTitle>
        <p className="text-gray-dark leading-relaxed">
          Le CADP est un organisme de formation. Ses BTS sont proposés en
          apprentissage en partenariat avec le CFA IFIR. Pour en savoir plus sur
          le CFA IFIR :{" "}
          <a
            href="https://www.ifir.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy-deep underline hover:text-gold transition-colors"
          >
            www.ifir.fr
            <NewTabHint />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
