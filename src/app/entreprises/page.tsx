import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Recrutez un alternant au CADP | Entreprises",
  description:
    "Recrutez un alternant en BTS ou TP ADVF au CADP à Pierrelatte. Aide jusqu'à 5 000€, formation financée par l'OPCO, promos de 10-12 étudiants. PME de Drôme, Ardèche, Vaucluse, Gard.",
  path: "/entreprises",
});

const profils = [
  {
    besoin: "un commercial",
    formation: "BTS NDRC",
    desc: "Il prospecte, négocie et développe votre portefeuille clients.",
    secteurs: "Agences, assurances, B2B, services.",
    slug: "bts-ndrc",
  },
  {
    besoin: "un manager de point de vente",
    formation: "BTS MCO",
    desc: "Il anime votre équipe, gère le rayon, pilote les ventes.",
    secteurs: "Retail, grande distribution, e-commerce.",
    slug: "bts-mco",
  },
  {
    besoin: "un assistant de direction polyvalent",
    formation: "BTS GPME",
    desc: "Il gère la compta, le courrier, les RH, la com'. Le bras droit du dirigeant.",
    secteurs: "PME tous secteurs, artisans, TPE en croissance.",
    slug: "bts-gpme",
  },
  {
    besoin: "un comptable junior",
    formation: "BTS CG",
    desc: "Il tient les comptes, prépare les déclarations, assiste le DAF ou l'expert-comptable.",
    secteurs: "Cabinets comptables, PME, associations.",
    slug: "bts-cg",
  },
  {
    besoin: "un responsable sécurité",
    formation: "BTS MOS",
    desc: "Il encadre les agents, organise la sûreté, gère les incidents.",
    secteurs: "Sites industriels, Tricastin, événementiel, surveillance.",
    slug: "bts-mos",
  },
  {
    besoin: "une aide à domicile",
    formation: "TP ADVF",
    desc: "Elle accompagne les personnes fragiles, garde les enfants, intervient à domicile.",
    secteurs: "Associations d'aide à domicile, EHPAD, structures médico-sociales.",
    slug: "tp-advf",
  },
];

const avantages = [
  {
    title: "Vous connaissez chaque alternant qu'on vous envoie",
    text: "On ne transmet pas des CV au hasard. Nos promos font 10 à 12 étudiants — on connaît leurs forces, leurs faiblesses, leur projet. Quand on vous recommande quelqu'un, c'est parce qu'on pense que ça peut marcher.",
  },
  {
    title: "Un interlocuteur, pas un standard",
    text: "Laurent Aubret, co-directeur, est votre contact direct du premier appel jusqu'à la fin du contrat. Pas de plateforme, pas de ticket — un numéro de téléphone et quelqu'un qui décroche.",
  },
  {
    title: "On gère l'administratif avec vous",
    text: "Contrat d'apprentissage, convention de formation, transmission OPCO, aide ASP — on vous accompagne sur chaque étape. Si c'est votre premier alternant, on vous guide de A à Z.",
  },
  {
    title: "On ne disparaît pas après la signature",
    text: "Suivi pédagogique régulier, visites en entreprise, point avec le maître d'apprentissage. Si un problème se pose, vous nous appelez et on le règle ensemble.",
  },
];

export default function EntreprisesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Entreprises
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Décrivez votre besoin.
            <br />
            On vous envoie le bon profil.
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Pas besoin de connaître les diplômes. Dites-nous quel poste vous cherchez à pourvoir, on s&apos;occupe du reste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/entreprise-besoin" variant="gold" className="text-lg px-8 py-4">
              Décrire mon besoin — 2 min
            </Button>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-navy-deep transition-all"
            >
              Appeler Laurent — 04 75 00 34 56
            </a>
          </div>
        </div>
      </section>

      {/* QUEL PROFIL */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Vous cherchez…
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profils.map((p) => (
              <Link key={p.slug} href={`/formations/${p.slug}`}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group h-full">
                  <p className="text-gold font-serif text-lg mb-1">…{p.besoin}</p>
                  <p className="text-navy-deep font-bold text-sm mb-2">{p.formation}</p>
                  <p className="text-gray-mid text-sm leading-relaxed mb-3">{p.desc}</p>
                  <p className="text-xs text-gray-mid/70 italic">{p.secteurs}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COÛT ET AIDES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Ce que ça coûte (vraiment)
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-10" />

          <p className="text-gray-mid text-center mb-10 max-w-2xl mx-auto leading-relaxed">
            Pour une PME de moins de 250 salariés qui recrute un alternant en BTS de 20 ans : le coût net est d&apos;environ{" "}
            <strong className="text-navy-deep">500€ par mois</strong> la première année, aide de l&apos;État déduite.
            La formation est intégralement financée par votre OPCO — le CADP ne vous facture rien.
          </p>

          {/* Tableau */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-deep text-gold">
                  <th className="text-left px-5 py-3 font-semibold">Votre formation</th>
                  <th className="text-right px-5 py-3 font-semibold">Aide 1ère année (PME &lt; 250 sal.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 text-gray-dark">TP ADVF (niveau 3)</td>
                  <td className="px-5 py-4 text-right font-bold text-gold text-lg">5 000 €</td>
                </tr>
                <tr className="bg-cream/30 border-b border-gray-100">
                  <td className="px-5 py-4 text-gray-dark">BTS MCO, NDRC, GPME, CG, MOS (niveau 5)</td>
                  <td className="px-5 py-4 text-right font-bold text-gold text-lg">4 500 €</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-gray-dark">Apprenti reconnu travailleur handicapé</td>
                  <td className="px-5 py-4 text-right font-bold text-gold text-lg">6 000 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-mid text-center italic mb-6">
            Décret n°2026-168 du 6 mars 2026. Aide versée mensuellement par l&apos;ASP pour la 1ère année du contrat.
          </p>

          <div className="text-center mb-8">
            <Link
              href="/blog/combien-coute-un-alternant-entreprise"
              className="text-gold font-semibold text-sm hover:text-gold-light transition-colors"
            >
              Voir la simulation complète du coût →
            </Link>
          </div>

          <p className="text-xs text-gray-mid/60 text-center">
            Entreprises de 250 salariés et plus : aide de 2 000€ (niv. 3-4), 1 500€ (niv. 5) ou 750€ (niv. 6-7), sous condition de seuil de 5% de contrats en alternance.
          </p>
        </div>
      </section>

      {/* POURQUOI LE CADP */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Ce qui change avec nous
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="space-y-8">
            {avantages.map((a) => (
              <div key={a.title}>
                <h3 className="font-semibold text-navy-deep mb-2">{a.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-navy-deep py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-gold mb-4">
            Essayez. Ça prend 2 minutes.
          </h2>
          <p className="text-cream/70 mb-10 max-w-lg mx-auto">
            Décrivez votre besoin via notre formulaire. On vous rappelle sous 48h avec une recommandation de profil adaptée à votre activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button href="/entreprise-besoin" variant="gold" className="px-8 py-4">
              Décrire mon besoin
            </Button>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-deep transition-all"
            >
              Appeler Laurent — 04 75 00 34 56
            </a>
          </div>
          <p className="text-cream/40 text-sm">
            Ou écrivez-nous : <a href="mailto:contact@cadp.pro" className="text-gold hover:text-gold-light">contact@cadp.pro</a>
          </p>
        </div>
      </section>
    </>
  );
}
