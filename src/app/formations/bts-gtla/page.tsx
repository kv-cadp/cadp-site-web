import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import Accordion from "@/components/ui/Accordion";
import GratuiteBlock from "@/components/formations/GratuiteBlock";
import ResultatsBlock from "@/components/formations/ResultatsBlock";

export const metadata = createPageMetadata({
  title: "BTS GTLA en alternance à Pierrelatte — Transport et Logistique",
  description:
    "BTS Gestion des Transports et Logistique Associée en alternance au CADP à Pierrelatte. Ouverture rentrée 2027. Promos de 12 étudiants, vallée du Rhône, Tricastin.",
  path: "/formations/bts-gtla",
});

const blocs = [
  {
    title: "Bloc 1 — Mettre en oeuvre des opérations de transport et de prestations logistiques",
    text: "Tu organises concrètement les expéditions : choix du mode de transport, planification des tournées, gestion des moyens humains et matériels, suivi en temps réel des opérations.",
  },
  {
    title: "Bloc 2 — Concevoir des opérations de transport et de prestations logistiques",
    text: "Tu analyses la demande du client, tu élabores une solution de transport adaptée (route, rail, maritime, multimodal), tu chiffres et tu proposes. C'est le coeur stratégique du métier.",
  },
  {
    title: "Bloc 3 — Analyser la performance d'une activité de transport",
    text: "Tu construis des tableaux de bord, tu suis les indicateurs (coûts, délais, qualité, empreinte carbone), tu identifies les dysfonctionnements et tu proposes des améliorations.",
  },
  {
    title: "Bloc 4 — Pérenniser et développer l'activité",
    text: "Tu identifies les opportunités de développement, tu participes aux appels d'offres, tu gères la relation commerciale avec les clients et les partenaires.",
  },
];

const debouches = [
  "Agent d'exploitation transport",
  "Affréteur",
  "Assistant logistique",
  "Gestionnaire de stocks",
  "Coordinateur transport",
  "Adjoint au responsable d'exploitation",
];

const faq = [
  {
    question: "Le BTS GTLA est-il difficile ?",
    answer: "Il demande de la rigueur, de l'organisation et un bon niveau en anglais. En revanche, il n'est pas aussi théorique qu'un BTS CG — c'est un diplôme très orienté terrain et cas pratiques.",
  },
  {
    question: "Faut-il le permis de conduire ?",
    answer: "Ce n'est pas une condition d'admission, mais c'est un atout fort pour l'alternance — les entreprises de transport apprécient la mobilité.",
  },
  {
    question: "Peut-on créer son entreprise avec un BTS GTLA ?",
    answer: "Oui. Le diplôme donne par équivalence l'attestation de capacité professionnelle de transport de marchandises par route et celle de commissionnaire de transport. C'est un des rares BTS qui ouvre directement la porte à la création d'entreprise.",
  },
  {
    question: "Quelles sont les différences avec un BTS MCO ?",
    answer: "Le MCO gère un point de vente (clients, équipe, stocks). Le GTLA gère des flux de marchandises (transport, logistique, supply chain). Les deux impliquent du management, mais les environnements professionnels sont très différents.",
  },
  {
    question: "Quel est le salaire en alternance en BTS GTLA ?",
    answer: "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC).",
  },
  {
    question: "Comment s'inscrire au BTS GTLA au CADP ?",
    answer: "Les pré-inscriptions pour la rentrée 2027 sont ouvertes. Contacte-nous via le formulaire de contact ou appelle le 04 75 00 34 56. Les places sont limitées à 12 par promo.",
  },
];

const infos = [
  ["Diplôme", "BTS Gestion des Transports et Logistique Associée — Diplôme d'État"],
  ["Code RNCP", "RNCP38365"],
  ["Niveau", "Bac+2 (niveau 5)"],
  ["Durée", "2 ans en alternance"],
  ["Rythme", "2-3 jours au campus / 2-3 jours en entreprise"],
  ["Coût pour l'alternant", "Gratuit — formation financée par l'OPCO"],
  ["Prérequis", "Bac (général, technologique STMG, ou bac pro transport/logistique)"],
  ["Ouverture", "Rentrée septembre 2027"],
  ["Places", "12 étudiants maximum"],
];

export default function BTSGTLAPage() {
  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": "https://cadp.pro/formations/bts-gtla#course",
          name: "BTS Gestion des Transports et Logistique Associée (GTLA)",
          description:
            "Formation en alternance à la gestion des flux de transport et de logistique. Organisation, optimisation et management des opérations de transport national et international. Diplôme d'État niveau Bac+2. Ouverture prévue rentrée 2027.",
          url: "https://cadp.pro/formations/bts-gtla",
          provider: { "@id": "https://cadp.pro/#organization" },
          timeRequired: "P2Y",
          educationalLevel: "Bac+2",
          courseMode: "blended",
          inLanguage: "fr",
          isAccessibleForFree: true,
          maximumEnrollment: 12,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4 text-sm">GTLA</Badge>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Organise, optimise, achemine.
            <br />
            Deviens le pilote des flux.
          </h1>

          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            Le BTS GTLA te forme à la gestion des transports et de la logistique. En alternance, au coeur de la vallée du Rhône, tu apprends le métier sur le terrain.
          </p>

          {/* Badge ouverture 2027 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/20 border border-gold/40 rounded-full mb-8">
            <span className="size-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold font-semibold text-sm">Ouverture prévue — Rentrée 2027</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">Bac+2 — Niveau 5</span>
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">2 ans en alternance</span>
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">RNCP38365</span>
          </div>

          <p className="text-cream/60 text-sm max-w-3xl mx-auto leading-relaxed">
            Le BTS Gestion des Transports et Logistique Associée en alternance au Campus Alternance Drôme Provence (CADP) à Pierrelatte (Drôme) est une formation Bac+2 sur 2 ans, en promos de 12 étudiants maximum. Le CADP est adossé au CFA IFIR, certifié Qualiopi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="https://app.cadp.pro/inscription?formation=gtla&source=site_fiche" target="_blank" rel="noopener noreferrer">
              <Button variant="gold" className="text-lg px-8 py-4">
                Je me pré-inscris
              </Button>
            </a>
            <Button href="/entreprises" variant="white-outline" className="text-lg px-8 py-4">
              Espace entreprises
            </Button>
          </div>
        </div>
      </section>

      <GratuiteBlock />

      {/* LE MÉTIER */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Celui qui fait en sorte que le bon produit arrive au bon endroit, au bon moment, au meilleur coût.">
            Le métier en un mot
          </SectionTitle>
          <p className="text-gray-mid text-center max-w-3xl mx-auto leading-relaxed">
            Le titulaire du BTS GTLA organise les opérations de transport, coordonne les prestataires (transporteurs, entrepôts, transitaires, douanes), optimise les flux et manage les équipes sur le terrain. C&apos;est un métier de coordination et de résolution de problèmes — chaque journée est différente.
          </p>
        </div>
      </section>

      {/* BLOCS DE COMPÉTENCES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Les compétences que tu vas acquérir.">
            Ce que tu apprendras
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocs.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gold">
                <h3 className="font-semibold text-navy-deep mb-3 text-sm">{b.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DÉBOUCHÉS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Le positionnement à Pierrelatte, au coeur du corridor logistique de la vallée du Rhône, ouvre des débouchés immédiats.">
            Les débouchés dans la vallée du Rhône
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-cream rounded-lg p-5">
              <h3 className="font-semibold text-navy-deep text-sm mb-2">Plateformes logistiques</h3>
              <p className="text-gray-mid text-xs">Montélimar, Valence, Orange, Bollène — Amazon, GLS, Chronopost, DB Schenker</p>
            </div>
            <div className="bg-cream rounded-lg p-5">
              <h3 className="font-semibold text-navy-deep text-sm mb-2">Transporteurs routiers</h3>
              <p className="text-gray-mid text-xs">Régionaux et nationaux — la vallée du Rhône est un axe majeur du fret</p>
            </div>
            <div className="bg-cream rounded-lg p-5">
              <h3 className="font-semibold text-navy-deep text-sm mb-2">Sous-traitants nucléaires du Tricastin</h3>
              <p className="text-gray-mid text-xs">Logistique spécialisée, transport de matières sensibles</p>
            </div>
            <div className="bg-cream rounded-lg p-5">
              <h3 className="font-semibold text-navy-deep text-sm mb-2">Industrie et agroalimentaire</h3>
              <p className="text-gray-mid text-xs">Services expédition/réception, supply chain régionale</p>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-navy-deep mb-3">Postes accessibles dès le BTS</h3>
            <div className="flex flex-wrap gap-2">
              {debouches.map((d) => (
                <span key={d} className="px-3 py-1.5 bg-white rounded-full text-sm text-navy-deep font-medium">
                  {d}
                </span>
              ))}
            </div>
            <p className="text-gray-mid text-sm mt-4">
              <strong className="text-navy-deep">Salaires :</strong> 24 000 à 28 000€ brut/an en début de carrière. Un responsable d&apos;exploitation expérimenté atteint 35 000 à 45 000€.
            </p>
          </div>

          <div className="bg-navy-deep/5 border-l-4 border-gold p-5 rounded-r-lg">
            <p className="text-sm font-medium text-navy-deep">
              <strong>Bonus :</strong> Le BTS GTLA donne par équivalence l&apos;attestation de capacité professionnelle de transport de marchandises et celle de commissionnaire de transport. Avec ce diplôme, tu peux créer ta propre entreprise de transport.
            </p>
          </div>
        </div>
      </section>

      {/* INFORMATIONS PRATIQUES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Informations pratiques</SectionTitle>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {infos.map(([label, value], i) => (
              <div key={label} className={`flex flex-col sm:flex-row sm:items-center px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-cream/30"}`}>
                <span className="font-semibold text-navy-deep text-sm sm:w-1/3">{label}</span>
                <span className="text-gray-mid text-sm sm:w-2/3">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURSUITES D'ÉTUDES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-navy-deep mb-6 text-center">Poursuites d&apos;études</h2>
          <ul className="space-y-3 max-w-md mx-auto">
            {[
              "Licence professionnelle Logistique et Pilotage des Flux",
              "Bachelor Responsable Transport et Logistique",
              "École de commerce (admission parallèle)",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm">
                <div className="shrink-0 mt-1 size-5 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="size-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-dark">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Toutes les réponses à tes questions sur le BTS GTLA.">
            Questions fréquentes
          </SectionTitle>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-deep">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/40 rounded-full mb-6">
            <span className="size-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold font-semibold text-xs">Rentrée 2027</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
            Intéressé par le BTS GTLA ?
          </h2>
          <p className="text-cream/70 mb-8 max-w-lg mx-auto">
            Les pré-inscriptions pour la rentrée 2027 sont ouvertes. Contacte-nous pour en savoir plus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.cadp.pro/inscription?formation=gtla&source=site_fiche" target="_blank" rel="noopener noreferrer">
              <Button variant="gold" className="px-8">
                Je me pré-inscris
              </Button>
            </a>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-deep transition-all"
            >
              04 75 00 34 56
            </a>
          </div>
        </div>
      </section>

      <ResultatsBlock />
    </article>
  );
}
