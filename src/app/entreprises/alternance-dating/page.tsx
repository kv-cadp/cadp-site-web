import Link from "next/link";
import Button from "@/components/ui/Button";
import DatingEventFacts from "@/components/dating/DatingEventFacts";
import { getFormationBySlug } from "@/data/formations";
import {
  candidatPath,
  employeurPath,
  getUpcomingDatings,
} from "@/lib/dating/events";
import { buildDatingEventJsonLd } from "@/lib/dating/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Alternance Dating : prochaines dates",
  description:
    "Rencontrez vos futurs alternants en un après-midi, en entretien court. Prochaines dates, lieux et inscriptions employeurs et candidats.",
  path: "/entreprises/alternance-dating",
});

const etapes = [
  "Vous confirmez votre venue en deux minutes, sur la page du dating.",
  "Le jour J : accueil, présentation du parcours, puis entretiens de quinze minutes avec les candidats que vous choisissez.",
  "Le campus monte le dossier de contrat et fait le lien avec votre OPCO.",
  "Réponse et mise en relation sous quarante-huit heures.",
];

export default function AlternanceDatingPage() {
  const datings = getUpcomingDatings();

  return (
    <>
      {datings.length > 0 && (
        <JsonLd data={datings.map((event) => buildDatingEventJsonLd(event))} />
      )}

      {/* EN-TÊTE */}
      <section className="bg-navy-deep py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] mb-4">
            Alternance Dating
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Rencontrez vos futurs alternants
          </h1>
          <p className="text-cream/85 text-lg max-w-2xl mx-auto leading-relaxed">
            Un après-midi pour rencontrer les candidats retenus sur le bassin,
            en entretien court. Vous repartez avec les profils qui vous
            intéressent, et nous montons ensuite le dossier de contrat avec
            vous.
          </p>
        </div>
      </section>

      {/* PROCHAINES DATES */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Prochaines dates
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-10" />

          {datings.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center max-w-2xl mx-auto">
              <p className="text-gray-dark leading-relaxed mb-6">
                Aucun Alternance Dating n&apos;est programmé pour le moment.
                Pour recruter un alternant dès maintenant, décrivez votre
                besoin ou appelez-nous au{" "}
                <a href="tel:+33475003456" className="font-semibold text-navy-deep">
                  04 75 00 34 56
                </a>
                .
              </p>
              <Button href="/entreprise-besoin" variant="navy">
                Décrire mon besoin
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datings.map((event) => {
                const formation = event.formationSlug
                  ? getFormationBySlug(event.formationSlug)
                  : undefined;
                return (
                  <article
                    key={event.slug}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
                  >
                    <p className="text-navy-deep/70 font-mono text-xs uppercase tracking-widest mb-2">
                      {formation ? formation.shortName : "Toutes formations"}
                    </p>
                    <h3 className="font-serif text-2xl text-navy-deep mb-5">
                      {event.venue.city}{" "}
                      <span className="text-gray-mid text-lg">({event.venue.region})</span>
                    </h3>
                    <div className="mb-6">
                      <DatingEventFacts event={event} tone="light" />
                    </div>
                    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                      <Button href={employeurPath(event.href)} variant="navy">
                        Employeur : je confirme ma venue
                      </Button>
                      <Button href={candidatPath(event.href)} variant="gold">
                        Candidat(e) : je m&apos;inscris
                      </Button>
                      <Link
                        href={event.href}
                        className="text-center text-sm text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
                      >
                        Détails de la journée
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* COMMENT ÇA SE PASSE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Comment ça se passe
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-10" />
          <ol className="space-y-4">
            {etapes.map((etape, index) => (
              <li key={etape} className="flex gap-5 bg-cream rounded-xl p-5">
                <span className="shrink-0 size-10 rounded-full bg-navy-deep text-gold flex items-center justify-center font-serif text-lg">
                  {index + 1}
                </span>
                <p className="text-gray-dark leading-relaxed pt-1.5">{etape}</p>
              </li>
            ))}
          </ol>
          <p className="text-center text-sm mt-8">
            <Link href="/entreprises" className="text-navy-deep font-semibold underline decoration-gold decoration-2 underline-offset-4">
              Coût d&apos;un alternant et aides à l&apos;embauche
            </Link>
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-navy-deep py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-3">
            Une question avant de vous inscrire&nbsp;?
          </h2>
          <p className="text-cream/80 mb-6">
            Appelez-nous, nous vous répondons directement.
          </p>
          <a
            href="tel:+33475003456"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy-deep rounded-lg font-semibold text-lg hover:bg-gold-light transition-all"
          >
            04 75 00 34 56
          </a>
        </div>
      </section>
    </>
  );
}
