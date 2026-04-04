import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { JsonLd, generateContactJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contactez le CADP — Campus Alternance Drôme Provence",
  description:
    "Contactez le Campus Alternance Drôme Provence à Pierrelatte (Drôme). Formulaire, téléphone 04 75 00 34 56, email contact@cadp.pro. Renseignements formations en alternance.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={generateContactJsonLd()} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* H1 */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-navy-deep mb-4">
              Contacte-nous
            </h1>
            <p className="text-lg text-gray-mid max-w-2xl mx-auto">
              Une question ? Un projet d&apos;alternance ? On est l&agrave; pour toi.
            </p>
            <div className="w-16 h-1 mx-auto mt-6 rounded-full bg-gold" />
          </div>

          {/* Moyens de contact + carte Maps (pleine largeur au-dessus) */}
          <div className="mb-14">
            <ContactInfo />
          </div>

          {/* Formulaire */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-xl text-navy-deep mb-6">
              Envoie-nous un message
            </h2>
            <ContactForm />

            {/* Lien orientation */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link
                href="/orientation"
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-gold-light transition-colors"
              >
                Pas encore s&ucirc;r de ta formation ? Fais le test d&apos;orientation
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
