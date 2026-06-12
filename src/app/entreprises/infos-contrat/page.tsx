import { createPageMetadata } from "@/lib/metadata";
import InfosContratForm from "./InfosContratForm";

export const metadata = {
  ...createPageMetadata({
    title: "Informations contrat d'alternance",
    description:
      "Transmettez à notre CFA partenaire les informations nécessaires à l'établissement du contrat d'alternance de votre futur(e) alternant(e).",
    path: "/entreprises/infos-contrat",
  }),
  robots: { index: false, follow: false },
};

const INTRO =
  "Vous accueillez un(e) alternant(e) du Campus Alternance Drôme Provence — merci, et bienvenue ! Pour que notre CFA puisse établir le Cerfa du contrat, merci de renseigner les informations ci-dessous (environ 5 minutes). Elles seront transmises directement à notre CFA partenaire.";

export default function InfosContratPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Espace entreprises
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Informations pour l&apos;établissement du contrat d&apos;alternance
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {INTRO}
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <InfosContratForm />
        </div>
      </section>
    </>
  );
}
