import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";
import Button from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Qui sommes-nous — L'équipe du CADP",
  description:
    "Découvrez l'équipe du CADP à Pierrelatte : direction, formateurs, valeurs. Un campus à taille humaine fondé en 2024 pour proposer une alternance de qualité en Drôme-Ardèche.",
  path: "/equipe",
});

// Initiales avatar
function Avatar({ initials, size = "lg" }: { initials: string; size?: "lg" | "sm" }) {
  const s = size === "lg" ? "size-24 text-2xl" : "size-16 text-lg";
  return (
    <div className={`${s} rounded-full bg-navy-deep flex items-center justify-center font-serif text-gold shrink-0`}>
      {initials}
    </div>
  );
}

const direction = [
  {
    name: "Kévin Vidard",
    role: "Directeur Général & Responsable Pédagogique",
    initials: "KV",
    email: "kevin.vidard@cadp.pro",
    bio: "Formateur avant d'être directeur. Kévin a enseigné dans plusieurs filières BTS — GPME, NDRC, Assurance — avant de cofonder le CADP en 2024 avec une conviction : un étudiant qu'on connaît par son prénom est un étudiant qui réussit. Il continue d'enseigner en BTS GPME et BTS NDRC, conçoit les progressions pédagogiques de toutes les formations et coordonne l'ensemble de l'activité du campus.",
  },
  {
    name: "Laurent Aubret",
    role: "Directeur Général & Relations Entreprises",
    initials: "LA",
    email: "laurent.aubret@cadp.pro",
    bio: "Laurent construit les ponts entre le campus et les entreprises du territoire. Il a développé un réseau de plus de 50 partenaires en Drôme, Ardèche, Vaucluse et Gard, accompagne chaque alternant dans sa recherche de contrat et intervient en formation sur les matières professionnelles. Il est également référent handicap du CADP.",
  },
  {
    name: "Véronique Eyguesier",
    role: "Directrice Générale & Relations Institutionnelles",
    initials: "VE",
    email: "veronique.eyguesier@cadp.pro",
    bio: "Élue locale et engagée dans le développement du territoire, Véronique porte la voix du CADP auprès des institutions, des collectivités et des acteurs de l'emploi. Elle apporte au campus son réseau, sa connaissance du tissu économique régional et sa vision stratégique.",
  },
];

const equipe = [
  {
    name: "Karen Rohan",
    role: "Formatrice Anglais",
    initials: "KR",
    accroche: "Si j'avais eu Karen depuis le collège, je serais déjà bilingue.",
    source: "Ce que nos étudiants disent d'elle",
  },
  {
    name: "Marc Gérard",
    role: "Formateur BTS GPME",
    initials: "MG",
    accroche: "Le plus expérimenté d'entre nous. Une référence pédagogique, toujours de bon conseil pour les étudiants comme pour l'équipe.",
  },
  {
    name: "Sébastien Stéphanne",
    role: "Formateur BTS MOS",
    initials: "SS",
    accroche: "Des années d'expérience sur le terrain. Pompier volontaire, auditeur sécurité, formateur SST — Sébastien apporte à ses étudiants ce qu'aucun manuel ne peut enseigner.",
  },
  {
    name: "Maëvane Laval",
    role: "Responsable du pôle Sanitaire & Social",
    initials: "ML",
    accroche: "Sophrologue de formation, toujours à l'écoute. Maëvane adapte sa pédagogie aux besoins de chaque apprenante et pilote le développement du pôle ADVF.",
  },
  {
    name: "Isabelle Marchand",
    role: "Formatrice ADVF — Co-responsable du pôle Sanitaire & Social",
    initials: "IM",
    accroche: "Des années d'accompagnement d'enfants en tant qu'ATSEM. Isabelle transmet son savoir-faire avec la douceur et la bienveillance qui font la différence dans les métiers du soin.",
  },
  {
    name: "Anaïs Amato",
    role: "Assistante de direction — Communication & Événements",
    initials: "AA",
    accroche: "Ancienne alternante en BTS GPME devenue indispensable. Anaïs organise les événements du CADP, gère la communication et veille sur les alternants avec une attention que tout le campus lui reconnaît.",
  },
  {
    name: "Safae El Badaoui",
    role: "Chargée de développement commercial",
    initials: "SE",
    accroche: "Alternante en BTS NDRC et déjà moteur de l'équipe. Safae prospecte, convainc et embarque tout le monde dans son énergie. La preuve vivante que l'alternance, ça forme.",
  },
];

const valeurs = [
  {
    title: "Taille humaine",
    text: "12 étudiants par promo. On te connaît par ton prénom, pas par ton numéro d'inscription.",
  },
  {
    title: "Droit à l'erreur",
    text: "On a le droit de se tromper, d'échouer, de recommencer. C'est comme ça qu'on trouve sa voie.",
  },
  {
    title: "Formés ici, recrutés ici",
    text: "On forme pour le Tricastin, la Drôme, l'Ardèche. Nos entreprises partenaires sont ici, nos diplômés restent ici.",
  },
  {
    title: "Exigence bienveillante",
    text: "On pousse nos étudiants vers le haut, mais on ne lâche personne en route.",
  },
];

export default function EquipePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "L'équipe du CADP",
          description: "Direction, formateurs et valeurs du Campus Alternance Drôme Provence.",
          url: "https://cadp.pro/equipe",
        }}
      />

      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Qui sommes-nous
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Des visages, pas des numéros.
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Le CADP, c&apos;est une équipe qui croit qu&apos;on apprend mieux quand on est connu, accompagné et respecté. Voici les gens qui font tourner le campus.
          </p>
        </div>
      </section>

      {/* GENÈSE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-8 text-center">
            Pourquoi le CADP existe
          </h2>
          <div className="space-y-6 text-gray-mid leading-relaxed">
            <p>
              Avant de créer le CADP, nous avons passé des années dans des centres de formation où l&apos;étudiant est un numéro. Des promos surchargées, des relations impersonnelles, des parcours standardisés — et un bassin du Tricastin qui manquait cruellement de formations en alternance accessibles à taille humaine.
            </p>
            <p>
              En 2024, on a ouvert le Campus Alternance Drôme Provence avec une conviction simple : proposer une formation de qualité, axée sur l&apos;humain, où on a le droit de se tromper, d&apos;échouer, de recommencer pour trouver sa voie. Pas de promo à 40. Pas de cours magistral devant un amphi. Ici, chaque étudiant a un prénom, un projet, et une équipe qui s&apos;en souvient.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTION */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            La direction
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {direction.map((person) => (
              <div key={person.initials} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <Avatar initials={person.initials} />
                </div>
                <h3 className="font-serif text-lg text-navy-deep mb-1">{person.name}</h3>
                <p className="text-gold text-sm font-semibold mb-4">{person.role}</p>
                <p className="text-gray-mid text-sm leading-relaxed mb-4">{person.bio}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
                >
                  {person.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            L&apos;équipe
          </h2>
          <p className="text-gray-mid text-center mb-12">
            Les gens qui font la différence au quotidien.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipe.map((person) => (
              <div key={person.initials} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar initials={person.initials} size="sm" />
                  <div>
                    <h3 className="font-semibold text-navy-deep text-sm">{person.name}</h3>
                    <p className="text-gold text-xs font-medium">{person.role}</p>
                  </div>
                </div>
                <p className="text-gray-mid text-sm leading-relaxed italic">
                  {person.source ? `"${person.accroche}"` : person.accroche}
                </p>
                {person.source && (
                  <p className="text-gray-mid/50 text-xs mt-2">— {person.source}</p>
                )}
              </div>
            ))}
          </div>

          <p className="text-gray-mid/60 text-sm text-center mt-8 italic">
            Et toute notre équipe de formateurs experts issus du monde professionnel.
          </p>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-20 bg-navy-deep">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gold mb-12 text-center">
            Ce en quoi on croit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valeurs.map((v) => (
              <div key={v.title} className="bg-navy-medium/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-serif text-lg text-gold mb-2">{v.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4">
            Envie de nous rencontrer ?
          </h2>
          <p className="text-gray-mid mb-8">
            Passe nous voir au campus, appelle-nous, ou dépose ta candidature en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="navy">
              Nous contacter
            </Button>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-navy-deep text-navy-deep rounded-lg font-semibold text-base hover:bg-navy-deep hover:text-white transition-all"
            >
              04 75 00 34 56
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
