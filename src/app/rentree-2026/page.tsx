import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/lib/structured-data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Rentrée 2026 — Inscriptions ouvertes",
  description:
    "Les inscriptions pour la rentrée de septembre 2026 au Campus Alternance Drôme Provence sont ouvertes. 6 formations en alternance, promos de 10-12 étudiants, 100% financé. Candidatez maintenant.",
  path: "/rentree-2026",
});

const formations = [
  { code: "MCO", name: "Management Commercial Opérationnel", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-mco" },
  { code: "NDRC", name: "Négociation et Digitalisation de la Relation Client", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-ndrc" },
  { code: "GPME", name: "Gestion de la PME", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-gpme" },
  { code: "CG", name: "Comptabilité et Gestion", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-cg" },
  { code: "MOS", name: "Management Opérationnel de la Sécurité", niveau: "Bac+2 — Niveau 5", duree: "2 ans", slug: "bts-mos" },
  { code: "ADVF", name: "Assistant De Vie aux Familles", niveau: "Niveau 3 (CAP/BEP)", duree: "9 à 12 mois", slug: "tp-advf" },
];

const timeline = [
  { date: "Maintenant → Juillet 2026", title: "Candidatures ouvertes", desc: "Les inscriptions sont ouvertes pour toutes les formations. Chaque promo est limitée à 12 étudiants — quand c'est complet, c'est complet." },
  { date: "29 avril 2026", title: "Alternance Dating", desc: "Rencontre directe avec nos entreprises partenaires au campus. Viens avec ton CV, repars avec des propositions. 14h-16h, CADP Pierrelatte." },
  { date: "14 mai 2026", title: "Atelier CV & Coaching entretien", desc: "On t'aide à construire un CV percutant et à préparer tes entretiens. Ouvert à tous les candidats. 10h-12h." },
  { date: "Mai — Juin 2026", title: "Entretiens de motivation", desc: "On se rencontre pour discuter de ton projet. Ce n'est pas un concours — c'est une conversation." },
  { date: "Juin — Août 2026", title: "Signature des contrats", desc: "Avec l'appui de notre réseau de 50+ entreprises partenaires, tu signes ton contrat d'apprentissage." },
  { date: "Septembre 2026", title: "Rentrée au campus", desc: "Début des cours et de l'alternance. C'est parti." },
];

export default function Rentree2026Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Rentrée 2026 — Inscriptions ouvertes | CADP Pierrelatte",
          description: "Les inscriptions pour la rentrée de septembre 2026 au Campus Alternance Drôme Provence sont ouvertes.",
          url: "https://www.cadp.pro/rentree-2026",
          provider: { "@id": "https://cadp.pro/#organization" },
        }}
      />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Alternance Dating — CADP Pierrelatte",
            startDate: "2026-04-29T14:00:00+02:00",
            endDate: "2026-04-29T16:00:00+02:00",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: "CADP", address: { "@type": "PostalAddress", streetAddress: "2 Boulevard Frédéric Mistral", addressLocality: "Pierrelatte", postalCode: "26700", addressCountry: "FR" } },
            organizer: { "@type": "EducationalOrganization", name: "CADP", url: "https://www.cadp.pro" },
            description: "Rencontrez directement les entreprises partenaires du CADP.",
            isAccessibleForFree: true,
          },
          {
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Atelier CV & Coaching entretien — CADP Pierrelatte",
            startDate: "2026-05-14T10:00:00+02:00",
            endDate: "2026-05-14T12:00:00+02:00",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: "CADP", address: { "@type": "PostalAddress", streetAddress: "2 Boulevard Frédéric Mistral", addressLocality: "Pierrelatte", postalCode: "26700", addressCountry: "FR" } },
            organizer: { "@type": "EducationalOrganization", name: "CADP", url: "https://www.cadp.pro" },
            description: "Atelier pour construire un CV percutant et préparer les entretiens.",
            isAccessibleForFree: true,
          },
        ]}
      />

      {/* HERO */}
      <section className="bg-navy-deep py-14 md:py-18">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            Rentrée septembre 2026
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
            Septembre 2026. Ta promo se remplit.
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            6 formations en alternance. Promos de 10-12. Zéro frais. C&apos;est maintenant que ça se joue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/candidater" variant="gold" className="text-lg px-8 py-4">
              Je candidate
            </Button>
            <Button href="/orientation" variant="white-outline" className="text-lg px-8 py-4">
              Test d&apos;orientation →
            </Button>
          </div>
        </div>
      </section>

      {/* FORMATIONS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Six formations. Toutes ouvertes. Toutes gratuites.
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f) => (
              <Link key={f.slug} href={`/formations/${f.slug}`}>
                <Card className="h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="gold">{f.code}</Badge>
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-semibold rounded-full">
                      Places disponibles
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-navy-deep mb-1 group-hover:text-gold transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-gray-mid text-xs mb-3">{f.niveau} — {f.duree}</p>
                  <span className="text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    En savoir plus
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Card>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-mid text-sm mt-8">
            Le <Link href="/formations/bts-gtla" className="text-gold font-semibold hover:text-gold-light">BTS GTLA (Transport et Logistique)</Link> ouvre en 2027. Pré-inscriptions ouvertes.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            D&apos;ici septembre, voilà ce qui se passe.
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="space-y-0">
            {timeline.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`size-4 rounded-full shrink-0 ${i % 2 === 0 ? "bg-gold" : "bg-navy-deep"}`} />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-gray-200" />}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">{step.date}</p>
                  <h3 className="font-semibold text-navy-deep mb-1">{step.title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 RAISONS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Pourquoi maintenant et pas en août.
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="font-serif text-4xl text-gold mb-3">12</div>
              <h3 className="font-semibold text-navy-deep mb-2">places. Pas 13.</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                Quand la promo est complète, on n&apos;ouvre pas de deuxième classe. Pas de liste d&apos;attente, pas de session de rattrapage. C&apos;est ça, la taille humaine.
              </p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl text-gold mb-3">50+</div>
              <h3 className="font-semibold text-navy-deep mb-2">On cherche avec toi.</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                Alternance Dating, ateliers CV, coaching entretien, transmission directe aux recruteurs. Mais on ne peut rien faire si on ne te connaît pas encore.
              </p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl text-gold mb-3">0€</div>
              <h3 className="font-semibold text-navy-deep mb-2">Tu ne paies rien. Tu es payé.</h3>
              <p className="text-gray-mid text-sm leading-relaxed">
                Formation financée par l&apos;OPCO. Zéro frais. Et dès le premier mois, tu touches un salaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ÉTAPES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4 text-center">
            Trois étapes. Pas de dossier à rallonge.
          </h2>
          <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-12" />

          <div className="space-y-10">
            {[
              {
                num: "1",
                title: "Tu candidates en ligne",
                desc: "Remplis le formulaire sur notre site. Choisis ta formation, renseigne tes coordonnées. C'est rapide et sans engagement.",
                cta: { label: "Candidater maintenant →", href: "/candidater" },
              },
              {
                num: "2",
                title: "On se rencontre",
                desc: "On se voit, on discute. Pas de jury, pas de note. On veut comprendre qui tu es et où tu veux aller. Et si ta voie n'est pas chez nous, on te le dit.",
              },
              {
                num: "3",
                title: "On t'aide à trouver ton entreprise",
                desc: "Transmission de ton profil à 50+ entreprises, Alternance Dating, ateliers CV, coaching entretien.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="font-serif text-5xl text-gold leading-none shrink-0 w-12 text-center">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-deep text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{step.desc}</p>
                  {step.cta && (
                    <Link href={step.cta.href} className="text-gold font-semibold text-sm mt-2 inline-block hover:text-gold-light transition-colors">
                      {step.cta.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREPRISES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4">
            Vous cherchez un alternant pour septembre ?
          </h2>
          <p className="text-gray-mid mb-8 max-w-lg mx-auto">
            Dites-nous quel poste vous cherchez à pourvoir. On vous envoie le bon profil, on monte le dossier, on s&apos;occupe de l&apos;OPCO. Coût net réel : environ 500€/mois la première année, aide déduite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/entreprise-besoin" variant="gold">
              Décrire mon besoin — 2 min
            </Button>
            <a
              href="tel:+33475003456"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-navy-deep text-navy-deep rounded-lg font-semibold hover:bg-navy-deep hover:text-white transition-all"
            >
              Appeler Laurent — 04 75 00 34 56
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-navy-deep py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
            Septembre 2026. Première rentrée ou jamais.
          </h2>
          <p className="text-cream/70 mb-10 max-w-lg mx-auto">
            Candidate. On se rencontre. On trouve ton entreprise ensemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button href="/candidater" variant="gold" className="text-lg px-8 py-4">
              Je candidate
            </Button>
            <Button href="/orientation" variant="white-outline" className="text-lg px-8 py-4">
              Test d&apos;orientation →
            </Button>
          </div>
          <p className="text-cream/40 text-sm">
            Des questions ? Appelle-nous au{" "}
            <a href="tel:+33475003456" className="text-gold hover:text-gold-light">04 75 00 34 56</a>{" "}
            ou écris-nous à{" "}
            <a href="mailto:contact@cadp.pro" className="text-gold hover:text-gold-light">contact@cadp.pro</a>
          </p>
        </div>
      </section>
    </>
  );
}
