import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, generateFAQJsonLd } from "@/lib/structured-data";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import Accordion from "@/components/ui/Accordion";
import GratuiteBlock from "@/components/formations/GratuiteBlock";
import ResultatsBlock from "@/components/formations/ResultatsBlock";
import FormationCTA from "@/components/formations/FormationCTA";

export const metadata = createPageMetadata({
  title: "Bachelor RQSE en alternance à Pierrelatte",
  description:
    "Prépare ton Bachelor Responsable Qualité Sécurité Environnement (RQSE) en alternance au CADP à Pierrelatte. Bac+3 en 12 mois : conformité, audits ISO, prévention des risques. Promos de 12, secteur en tension.",
  path: "/formations/bachelor-rqse",
});

const heroTitle = "Qualité, sécurité, environnement : c'est toi qui pilotes.";

const heroSubtitle =
  "Le Bachelor RQSE te forme en un an à piloter la démarche qualité, sécurité et environnement d'une entreprise : conformité réglementaire, audits ISO, prévention des risques, performance. Un Bac+3 en alternance, sur un marché qui manque de cadres.";

const heroAeo =
  "Le Bachelor Responsable Qualité Sécurité Environnement en alternance au Campus Alternance Drôme Provence (CADP) à Pierrelatte (Drôme) est une formation de niveau 6 (Bac+3) sur 12 mois, en promos de 12 étudiants maximum, avec accompagnement individualisé. Le CADP est adossé au CFA IFIR, certifié Qualiopi. Le titre est délivré par la CCI Portes de Normandie et la CCI Île de la Réunion (RNCP 40563).";

const metierText =
  "Le Responsable QSE met en œuvre la politique de l'entreprise autour de trois objectifs : garantir la qualité des produits ou services, préserver la santé et la sécurité des salariés, et maîtriser l'impact environnemental de l'activité. Tu représentes la direction et tu fais le lien entre tous les services, dans un cadre réglementaire de plus en plus exigeant.";

const blocs = [
  {
    title: "Bloc 1 — Soutenir la direction dans l'élaboration de la stratégie QSE",
    text: "Tu cartographies les parties prenantes et les exigences clients, tu recenses les normes et certifications applicables, tu conduis une veille réglementaire et juridique permanente, tu produis le diagnostic interne et externe de l'organisation, tu analyses les risques majeurs et tu construis un plan d'actions de mise en conformité.",
  },
  {
    title: "Bloc 2 — Communiquer et informer en lien avec l'activité QSE",
    text: "Tu participes à la stratégie de communication QSE, tu conçois des supports adaptés à chaque cible, tu animes les réunions internes, tu transmets les informations dans les délais, tu appuies la direction en communication externe et tu contribues à la résolution de crise.",
  },
  {
    title: "Bloc 3 — Déployer le système de management QSE",
    text: "Tu mets en place et tu formalises les processus métiers, tu contribues à la sécurisation du système d'information, tu animes un réseau de pilotes de processus, tu réalises des audits internes et externes et tu prépares les audits de certification.",
  },
  {
    title: "Bloc 4 — Optimiser la performance du système de management QSE",
    text: "Tu construis les indicateurs et tableaux de bord de pilotage, tu évalues en continu l'efficacité du système, tu identifies les dysfonctionnements et leurs causes, tu prépares et animes la revue de direction, tu pilotes les plans d'amélioration et les mesures correctives.",
  },
];

const activites = [
  "Identification du cadre normatif et réglementaire",
  "Veille réglementaire, normative et juridique",
  "Diagnostic interne et externe de l'organisation",
  "Recommandations de mise en conformité et prévention",
  "Stratégie de communication QSE de l'organisation",
  "Diffusion interne des informations QSE",
  "Communication externe de l'organisation",
  "Création et mise à jour des processus du système",
  "Animation du réseau de pilotes du système",
  "Audits internes et externes de l'organisation",
  "Préparation des audits de certification externes",
  "Outils et indicateurs de pilotage du système",
  "Évaluation continue des processus et du système",
  "Plans d'amélioration et revues de direction QSE",
];

const evaluationText =
  "Chaque bloc de compétences est évalué séparément et reste capitalisable. L'obtention du titre passe aussi par un rapport de mission : tu rends compte d'une mission QSE réelle menée en entreprise, puis tu la présentes à l'oral devant un jury (25 minutes de présentation, 15 minutes d'échange), validée à partir de 12/20. L'accès à cette épreuve suppose au moins 700 heures de présence effective en entreprise. La certification est aussi accessible par la VAE.";

const rythmePoints = [
  {
    title: "Une vraie expérience professionnelle",
    text: "Sur 12 mois, tu passes environ 9 mois en entreprise, sur un poste à responsabilités. Tu sors avec un diplôme et une expérience concrète qui fait la différence sur le marché de l'emploi.",
  },
  {
    title: "Des périodes de formation regroupées",
    text: "Les semaines au campus sont organisées en blocs de plusieurs semaines consécutives. Tu te concentres pleinement sur tes apprentissages, puis sur tes missions, sans coupure fragmentée chaque semaine.",
  },
  {
    title: "Une montée en compétences rapide",
    text: "Le Bachelor est un cycle court d'un an après un Bac+2. Tu arrives avec un socle solide et tu acquiers la spécialisation QSE en 12 mois.",
  },
  {
    title: "Un calendrier prévisible",
    text: "Le calendrier des semaines de campus est communiqué dès la signature de ton contrat et reste stable sur les 12 mois. Toi et ton entreprise vous organisez sereinement.",
  },
];

const romes = [
  { code: "ROME H1502", label: "Management et ingénierie qualité industrielle" },
  { code: "ROME H1302", label: "Management et ingénierie HSE industriels" },
  { code: "ROME F1204", label: "QSE et protection santé du BTP" },
];

const secteursText =
  "Industrie (métallurgie, agroalimentaire, pharmaceutique, chimie, plasturgie), énergie et environnement, construction et BTP, transport et logistique, santé, services. Le profil QSE est particulièrement recherché dans les organisations engagées dans des démarches de certification ISO ou soumises à de fortes contraintes réglementaires, comme sur le bassin du Tricastin.";

const marcheText =
  "Selon France Travail (T1 2025), près de 80 % des offres de Responsable QSE proposent une rémunération comprise entre 1 820 € et 3 333 € brut par mois, sur un marché marqué par une forte difficulté de recrutement. Autrement dit : un diplôme qui mène à l'emploi.";

const poursuiteText =
  "Le Bachelor vise d'abord l'insertion directe sur un poste qualifié. Il ouvre aussi la voie vers un Bac+5 (niveau 7) en QHSE ou en management des risques, en alternance ou en formation continue.";

const eligibilite = [
  "Tout BTS ou Bac+2 tertiaire, notamment GPME et MOS, dont les compétences en gestion des risques mènent naturellement au QSE",
  "BTS et Bac+2 techniques ou industriels (Maintenance, CRSA, PCEPC, DUT ou BUT HSE, Génie industriel)",
  "Licence 2 ou équivalent, toutes orientations compatibles",
  "Salariés en reconversion vers les métiers de la qualité, de la sécurité et de l'environnement",
];

const derogationText =
  "À titre dérogatoire, l'accès est ouvert aux titulaires d'un Bac justifiant d'au moins 3 ans d'expérience professionnelle hors période d'alternance, une voie particulièrement adaptée aux parcours de reconversion. Un entretien de positionnement valide ton projet dans tous les cas.";

const etapes = [
  {
    title: "Vérifie ton éligibilité",
    text: "Contacte le CADP pour valider que ton profil correspond aux prérequis et échanger sur ton projet professionnel.",
  },
  {
    title: "Constitue ton dossier et passe l'entretien",
    text: "Dossier de candidature, puis entretien de motivation et de positionnement avec l'équipe pédagogique, qui évalue ton adéquation au métier QSE.",
  },
  {
    title: "Trouve ton entreprise",
    text: "L'alternance suppose un employeur. Le CADP t'accompagne dans ta recherche et peut te mettre en relation avec ses entreprises partenaires du bassin.",
  },
];

const infos: [string, string][] = [
  ["Diplôme", "Bachelor Responsable Qualité Sécurité Environnement"],
  ["Code RNCP", "RNCP 40563"],
  ["Niveau", "Bac+3 (niveau 6)"],
  ["Durée", "12 mois en alternance"],
  ["Rythme", "Regroupements : 12-13 semaines au campus, 39-40 en entreprise"],
  ["Coût pour l'alternant", "Gratuit, formation financée par l'OPCO"],
  ["Prérequis", "Bac+2 validé (dérogation : Bac + 3 ans d'expérience)"],
  ["Certificateur", "CCI Portes de Normandie et CCI Île de la Réunion (RNCP enregistré jusqu'au 30 avril 2028)"],
  ["Ouverture", "Rentrée septembre 2026"],
  ["Places", "12 étudiants maximum"],
];

const faq = [
  {
    question: "Quel est le salaire en alternance en Bachelor RQSE ?",
    answer:
      "Le Bachelor étant un cycle Bac+3, la rémunération en apprentissage est calculée sur la base de la 3e année d'exécution du contrat, quel que soit ton parcours antérieur. Un apprenti de 18-20 ans perçoit 67 % du SMIC (environ 1 250,90 € brut par mois), de 21-25 ans 78 % (environ 1 456,28 €), et 100 % à partir de 26 ans (1 867,02 €). Sous le seuil de 50 % du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales.",
  },
  {
    question: "Quels sont les prérequis pour intégrer le Bachelor RQSE ?",
    answer:
      "Il faut être titulaire d'un diplôme de niveau 5 (Bac+2) validé. La formation est ouverte aux profils tertiaires comme techniques : un BTS GPME ou MOS, dont les compétences en gestion des risques mènent au QSE, autant qu'un BTS Maintenance, CRSA, PCEPC, un DUT ou BUT HSE ou Génie industriel, ou une L2. À titre dérogatoire, l'accès est aussi ouvert aux titulaires d'un Bac justifiant d'au moins 3 ans d'expérience professionnelle, une voie adaptée aux reconversions vers les métiers de la qualité, de la sécurité et de l'environnement.",
  },
  {
    question: "Combien de temps dure la formation ?",
    answer:
      "La formation dure 12 mois. Les semaines de cours sont regroupées en blocs au campus de Pierrelatte (environ 12 à 13 semaines, soit près de 500 heures de formation), le reste du temps se passe en entreprise (environ 39 à 40 semaines).",
  },
  {
    question: "Quels métiers après le Bachelor RQSE ?",
    answer:
      "Responsable QSE, coordinateur QSE, animateur qualité ou HSE, chargé de mission QSE, préventeur des risques. Les métiers visés relèvent des codes ROME H1502, H1302 et F1204. Le marché manque de cadres : selon France Travail, le recrutement est marqué par une forte tension.",
  },
  {
    question: "Peut-on poursuivre ses études après le Bachelor RQSE ?",
    answer:
      "Oui. Le Bachelor vise d'abord l'insertion professionnelle directe, mais il ouvre aussi la voie vers un titre de niveau 7 (Bac+5) en QHSE ou en management des risques, en alternance ou en formation continue, selon ton projet.",
  },
  {
    question: "Quel est le rythme de l'alternance au CADP ?",
    answer:
      "Le rythme est organisé en regroupements : des blocs de plusieurs semaines au campus de Pierrelatte, puis des périodes longues en entreprise. Le calendrier est communiqué dès la signature du contrat et reste stable sur les 12 mois. La formation se déroule en présentiel.",
  },
  {
    question: "Apprentissage ou contrat de professionnalisation ?",
    answer:
      "Les deux sont possibles. En apprentissage, la rémunération suit le barème de la 3e année d'exécution (67 %, 78 %, 100 % selon l'âge). Le contrat de professionnalisation suit un barème distinct et est géré par le CFA IFIR au même tarif. Le dispositif est arrêté avec ton entreprise et le CFA.",
  },
  {
    question: "Le Bachelor RQSE est-il reconnu par l'État ?",
    answer:
      "Oui. Le titre de Responsable Qualité Sécurité Environnement est enregistré au RNCP sous le numéro 40563 (niveau 6, Bac+3), délivré par la CCI Portes de Normandie et la CCI Île de la Réunion. Au CADP, tu le prépares dans le cadre du CFA IFIR, certifié Qualiopi.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://cadp.pro/formations/bachelor-rqse#course",
  name: "Bachelor Responsable Qualité Sécurité Environnement (RQSE)",
  description:
    "Bachelor RQSE en alternance au CADP à Pierrelatte. Bac+3 (RNCP 40563) en 12 mois : conformité réglementaire, audits ISO, prévention des risques, performance QSE.",
  url: "https://cadp.pro/formations/bachelor-rqse",
  provider: { "@id": "https://cadp.pro/#organization" },
  timeRequired: "P1Y",
  educationalLevel: "Bac+3",
  educationalCredentialAwarded: {
    "@type": "EducationalOccupationalCredential",
    name: "Responsable Qualité Sécurité Environnement (RNCP 40563)",
    credentialCategory: "Certification professionnelle de niveau 6 (Bac+3)",
    recognizedBy: [
      { "@type": "Organization", name: "CCI Portes de Normandie" },
      { "@type": "Organization", name: "CCI Île de la Réunion" },
    ],
  },
  courseMode: "blended",
  inLanguage: "fr",
  isAccessibleForFree: true,
  maximumEnrollment: 12,
};

export default function BachelorRQSEPage() {
  return (
    <article>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={generateFAQJsonLd(faq)} />

      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-6 text-sm">
            Bachelor RQSE
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
              Bac+3 — Niveau 6
            </span>
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
              12 mois en alternance
            </span>
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
              RNCP 40563
            </span>
          </div>
          <p className="text-cream/60 text-sm max-w-3xl mx-auto leading-relaxed">
            {heroAeo}
          </p>
        </div>
      </section>

      <GratuiteBlock />

      {/* LE METIER */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Un pilote transversal de la performance de l'entreprise.">
            Le métier
          </SectionTitle>
          <p className="text-gray-mid text-center max-w-3xl mx-auto leading-relaxed">
            {metierText}
          </p>
        </div>
      </section>

      {/* BLOCS DE COMPETENCES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Quatre blocs de compétences, capitalisables.">
            Ce que tu apprendras
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocs.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gold"
              >
                <h3 className="font-semibold text-navy-deep mb-3 text-sm">{b.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="33 compétences professionnelles structurées en 14 activités.">
            Le programme
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {activites.map((a, i) => (
              <div key={a} className="flex items-start gap-3 bg-cream rounded-lg p-4">
                <span className="font-serif text-gold text-lg font-bold shrink-0">{i + 1}</span>
                <span className="text-gray-dark text-sm">{a}</span>
              </div>
            ))}
          </div>
          <div className="bg-navy-deep/5 border-l-4 border-gold p-5 rounded-r-lg max-w-3xl mx-auto">
            <h3 className="font-semibold text-navy-deep mb-2 text-sm">L&apos;évaluation</h3>
            <p className="text-gray-mid text-sm leading-relaxed">{evaluationText}</p>
          </div>
        </div>
      </section>

      {/* RYTHME */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Une présence forte en entreprise, des cours en regroupement.">
            Ton rythme en alternance
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-gold rounded-xl p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-navy-deep font-bold mb-1">12-13</p>
              <p className="text-navy-deep font-semibold">semaines au campus</p>
              <p className="text-navy-deep/70 text-sm mt-1">≈ 500 h de formation</p>
            </div>
            <div className="bg-navy-deep rounded-xl p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-white font-bold mb-1">39-40</p>
              <p className="text-cream font-semibold">semaines en entreprise</p>
              <p className="text-cream/70 text-sm mt-1">≈ 1 400 h de pratique professionnelle</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rythmePoints.map((p, i) => (
              <div key={p.title} className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-gold text-xl font-bold">{i + 1}</span>
                  <h3 className="font-semibold text-navy-deep text-sm">{p.title}</h3>
                </div>
                <p className="text-gray-mid text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEBOUCHES */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Un métier qui recrute, des perspectives ouvertes.">
            Les débouchés
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {romes.map((r) => (
              <div key={r.code} className="bg-cream rounded-lg p-5 text-center">
                <p className="font-mono text-xs text-gold font-semibold mb-2">{r.code}</p>
                <p className="text-navy-deep text-sm font-medium">{r.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-mid text-sm leading-relaxed mb-6 max-w-3xl mx-auto text-center">
            {secteursText}
          </p>
          <div className="bg-gold/10 border border-gold/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-navy-deep mb-2 text-sm">Un marché favorable</h3>
            <p className="text-gray-mid text-sm leading-relaxed">{marcheText}</p>
          </div>
          <div className="bg-navy-deep/5 border-l-4 border-gold p-5 rounded-r-lg">
            <h3 className="font-semibold text-navy-deep mb-1 text-sm">Et après ?</h3>
            <p className="text-gray-mid text-sm leading-relaxed">{poursuiteText}</p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITE */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Le Bachelor s'adresse aux titulaires d'un Bac+2.">
            Es-tu éligible ?
          </SectionTitle>
          <ul className="space-y-3 mb-6">
            {eligibilite.map((e) => (
              <li key={e} className="flex items-start gap-3 text-sm">
                <div className="shrink-0 mt-1 size-5 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg
                    className="size-3 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-dark">{e}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white border-l-4 border-gold p-5 rounded-r-lg">
            <p className="text-gray-mid text-sm leading-relaxed">{derogationText}</p>
          </div>
        </div>
      </section>

      {/* COMMENT CANDIDATER */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Trois étapes, et on t'accompagne pour trouver ton entreprise.">
            Comment candidater
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {etapes.map((e, i) => (
              <div key={e.title} className="bg-cream rounded-xl p-6">
                <div className="size-9 rounded-full bg-gold flex items-center justify-center font-serif font-bold text-navy-deep mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-navy-deep text-sm mb-2">{e.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Informations pratiques</SectionTitle>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {infos.map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row sm:items-center px-5 py-3.5 ${
                  i % 2 === 0 ? "bg-white" : "bg-cream/30"
                }`}
              >
                <span className="font-semibold text-navy-deep text-sm sm:w-1/3">{label}</span>
                <span className="text-gray-mid text-sm sm:w-2/3">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Toutes les réponses à tes questions sur le Bachelor RQSE.">
            Questions fréquentes
          </SectionTitle>
          <div className="bg-cream rounded-xl shadow-sm p-6 md:p-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <FormationCTA formationName="Bachelor RQSE" formationCode="rqse" />
      <ResultatsBlock />
    </article>
  );
}
