import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Nos formations en alternance à Pierrelatte",
  description:
    "5 BTS et 1 Titre Professionnel en alternance à Pierrelatte. Promos de 12 étudiants, formation 100% financée. Comparez nos formations et trouvez celle qui vous correspond.",
  path: "/formations",
});

const formations = [
  {
    slug: "bts-mco", code: "MCO", name: "BTS MCO", full: "Management Commercial Opérationnel",
    niveau: "Bac+2 — Niveau 5", duree: "2 ans", rncp: "RNCP38362",
    enUnMot: "Tu manages une équipe et un point de vente.",
    profil: "À l'aise avec les gens, leadership naturel, sens du commerce.",
    metiers: "Manager de rayon, responsable de magasin, chef de secteur",
    dominante: "Commerce & Management",
    tuAimes: "Manager, animer, vendre",
    rythme: "Lun-Mar (+Mer 1s/2)",
  },
  {
    slug: "bts-ndrc", code: "NDRC", name: "BTS NDRC", full: "Négociation et Digitalisation de la Relation Client",
    niveau: "Bac+2 — Niveau 5", duree: "2 ans", rncp: "RNCP38368",
    enUnMot: "Tu prospectes, tu négocies, tu signes.",
    profil: "Persuasif, à l'aise à l'oral, goût du challenge.",
    metiers: "Business developer, commercial terrain, chargé d'affaires",
    dominante: "Vente & Digital",
    tuAimes: "Convaincre, négocier, prospecter",
    rythme: "Jeu-Ven (+Mer 1s/2)",
  },
  {
    slug: "bts-gpme", code: "GPME", name: "BTS GPME", full: "Gestion de la PME",
    niveau: "Bac+2 — Niveau 5", duree: "2 ans", rncp: "RNCP38363",
    enUnMot: "Tu es le bras droit du dirigeant.",
    profil: "Organisé, polyvalent, rigoureux, à l'aise avec les chiffres et les mots.",
    metiers: "Assistant de gestion, assistant RH, office manager",
    dominante: "Administration & Gestion",
    tuAimes: "Organiser, gérer, administrer",
    rythme: "Lun-Mar (+Mer 1s/2)",
  },
  {
    slug: "bts-cg", code: "CG", name: "BTS CG", full: "Comptabilité et Gestion",
    niveau: "Bac+2 — Niveau 5", duree: "2 ans", rncp: "RNCP39159",
    enUnMot: "Tu maîtrises les chiffres et tu pilotes la performance.",
    profil: "Rigoureux, analytique, à l'aise avec les chiffres, méthodique.",
    metiers: "Comptable, gestionnaire de paie, collaborateur en cabinet",
    dominante: "Comptabilité & Finance",
    tuAimes: "Calculer, analyser, contrôler",
    rythme: "Jeu-Ven (+Mer 1s/2)",
  },
  {
    slug: "bts-mos", code: "MOS", name: "BTS MOS", full: "Management Opérationnel de la Sécurité",
    niveau: "Bac+2 — Niveau 5", duree: "2 ans", rncp: "RNCP41000",
    enUnMot: "Tu diriges des équipes de sécurité et tu gères les risques.",
    profil: "Sens des responsabilités, sang-froid, leadership, rigueur.",
    metiers: "Chef de site sécurité, responsable sûreté, coordinateur QHSE",
    dominante: "Sécurité & Risques",
    tuAimes: "Protéger, diriger, anticiper",
    rythme: "Lun-Mar (+Mer 1s/2)",
  },
  {
    slug: "tp-advf", code: "ADVF", name: "TP ADVF", full: "Assistant De Vie aux Familles",
    niveau: "Niveau 3 (CAP/BEP)", duree: "9 à 12 mois", rncp: "RNCP37715",
    enUnMot: "Tu accompagnes les personnes fragiles au quotidien.",
    profil: "Empathique, patient, sens du service, envie d'aider.",
    metiers: "Aide à domicile, auxiliaire de vie, garde d'enfants",
    dominante: "Aide à la personne",
    tuAimes: "Accompagner, aider, prendre soin",
    rythme: "Mer-Jeu",
  },
];

const comparatifRows = [
  { label: "Niveau", key: "niveau" as const },
  { label: "Durée", key: "duree" as const },
  { label: "Dominante", key: "dominante" as const },
  { label: "Tu aimes...", key: "tuAimes" as const },
  { label: "Rythme campus", key: "rythme" as const },
];

export default function FormationsHubPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Formations en alternance au CADP",
          numberOfItems: 6,
          itemListElement: formations.map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.cadp.pro/formations/${f.slug}`,
            name: f.name,
          })),
        }}
      />

      {/* HERO */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Nos formations
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Six formations. Un même engagement.
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Toutes nos formations sont en alternance, en promos de 12 étudiants, et 100% financées par l&apos;OPCO de ton entreprise. Zéro frais pour toi.
          </p>
        </div>
      </section>

      {/* GRILLE DES FORMATIONS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Trouve ta formation
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f) => (
              <Link key={f.slug} href={`/formations/${f.slug}`}>
                <Card className="h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="gold">{f.code}</Badge>
                    <span className="text-xs text-gray-mid">{f.niveau}</span>
                  </div>
                  <h3 className="font-serif text-lg text-navy-deep mb-1 group-hover:text-gold transition-colors">
                    {f.full}
                  </h3>
                  <p className="text-gold text-sm font-semibold mb-3">{f.enUnMot}</p>
                  <p className="text-gray-mid text-xs mb-3">
                    <strong className="text-gray-dark">Profil :</strong> {f.profil}
                  </p>
                  <p className="text-gray-mid text-xs mb-4">
                    <strong className="text-gray-dark">Métiers :</strong> {f.metiers}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-mid mb-3">
                    <span className="bg-cream px-2 py-0.5 rounded font-medium">{f.duree}</span>
                    <span className="bg-cream px-2 py-0.5 rounded font-medium">Gratuit</span>
                    <span className="bg-cream px-2 py-0.5 rounded font-medium">12 max</span>
                  </div>
                  <div className="flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                    En savoir plus
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TABLEAU COMPARATIF */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Comparatif en un coup d&apos;oeil
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-navy-deep text-gold">
                  <th className="text-left px-4 py-3 rounded-tl-lg font-semibold"></th>
                  {formations.map((f) => (
                    <th key={f.code} className="text-center px-3 py-3 font-semibold last:rounded-tr-lg">
                      {f.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparatifRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-cream/50"}>
                    <td className="px-4 py-3 font-semibold text-navy-deep text-xs">{row.label}</td>
                    {formations.map((f) => (
                      <td key={f.code} className="text-center px-3 py-3 text-gray-mid text-xs">
                        {f[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-white">
                  <td className="px-4 py-3 font-semibold text-navy-deep text-xs">Coût alternant</td>
                  {formations.map((f) => (
                    <td key={f.code} className="text-center px-3 py-3 text-success text-xs font-bold">
                      Gratuit
                    </td>
                  ))}
                </tr>
                <tr className="bg-cream/50">
                  <td className="px-4 py-3 font-semibold text-navy-deep text-xs rounded-bl-lg">Promo max</td>
                  {formations.map((f) => (
                    <td key={f.code} className="text-center px-3 py-3 text-gray-mid text-xs last:rounded-br-lg">
                      12
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AIDE AU CHOIX */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Tu hésites entre deux formations ?
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="space-y-8">
            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-serif text-lg text-navy-deep mb-3">MCO ou NDRC ?</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                <strong className="text-navy-deep">MCO</strong> si tu veux manager une équipe dans un point de vente ou un commerce.{" "}
                <strong className="text-navy-deep">NDRC</strong> si tu préfères aller chercher les clients, prospecter et négocier en face-à-face ou en digital. Le MCO gère un lieu, le NDRC gère une relation.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-serif text-lg text-navy-deep mb-3">GPME ou CG ?</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                <strong className="text-navy-deep">GPME</strong> si tu veux être polyvalent dans une PME : un peu de compta, un peu de RH, un peu de com&apos;, un peu de tout.{" "}
                <strong className="text-navy-deep">CG</strong> si tu veux te spécialiser dans la comptabilité, la fiscalité et la gestion financière. Le GPME est généraliste, le CG est expert.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-serif text-lg text-navy-deep mb-3">BTS ou TP ADVF ?</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                Les 5 BTS mènent à un Bac+2 en 2 ans et visent des métiers tertiaires (commerce, gestion, sécurité). Le{" "}
                <strong className="text-navy-deep">TP ADVF</strong> est un titre de niveau 3 (CAP/BEP) sur 9 à 12 mois, orienté vers les métiers de l&apos;aide à la personne. Ce sont deux univers différents — le bon choix dépend de ton projet, pas de ton niveau.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/orientation"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Pas encore sûr ? Fais le test d&apos;orientation
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUI EST COMMUN */}
      <section className="py-20 bg-navy-deep">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gold mb-12 text-center">
            Ce qui est commun à toutes nos formations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "100% alternance",
                text: "Toutes nos formations se font en contrat d'apprentissage. Tu es salarié, tu apprends en entreprise et au campus.",
              },
              {
                title: "100% financé",
                text: "Aucun frais d'inscription ni de scolarité. La formation est prise en charge par l'OPCO de ton entreprise.",
              },
              {
                title: "12 par promo",
                text: "Pas de cours magistral devant 40 personnes. Ici, tes formateurs te connaissent et s'adaptent à toi.",
              },
              {
                title: "Accompagnement emploi",
                text: "Alternance Dating, ateliers CV, coaching entretien, transmission de ton profil à 50+ entreprises partenaires.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-navy-medium/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-serif text-lg text-gold mb-2">{item.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-8">
            Prêt à te lancer ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button href="/candidater" variant="navy">
              Je candidate
            </Button>
            <Button href="/orientation" variant="outline">
              Fais le test d&apos;orientation
            </Button>
          </div>
          <Link
            href="/entreprise-besoin"
            className="text-gold font-semibold text-sm hover:text-gold-light transition-colors"
          >
            Vous êtes une entreprise ?
          </Link>
        </div>
      </section>
    </>
  );
}
