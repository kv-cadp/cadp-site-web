import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles, getArticleBySlug, categoryLabels } from "@/data/blog";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, generateBlogPostingJsonLd, generateFAQJsonLd } from "@/lib/structured-data";
import Button from "@/components/ui/Button";
import CTADating from "@/components/dating/CTADating";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return createPageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cat = categoryLabels[article.category];

  return (
    <>
      <JsonLd data={generateBlogPostingJsonLd(article)} />
      {article.faqQuestions && (
        <JsonLd data={generateFAQJsonLd(article.faqQuestions)} />
      )}

      {/* Hero */}
      <section className="bg-navy-deep py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-cream/50 text-xs">
              {article.updatedDateISO
                ? `${article.date} — Mis à jour le ${new Date(article.updatedDateISO).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
                : article.date}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-white">
        <div
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose-cadp"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-200">
          {article.cta === "candidat" && (
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="font-serif text-xl text-navy-deep mb-3">Prêt à te lancer ?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/orientation" variant="gold">Fais le test d&apos;orientation</Button>
                <Button href="/candidater" variant="outline">Je candidate</Button>
              </div>
            </div>
          )}
          {article.cta === "entreprise" && (
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="font-serif text-xl text-navy-deep mb-3">Prêt à recruter votre alternant ?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/entreprise-besoin" variant="gold">Trouver le bon profil</Button>
                <Button href="/entreprises/alternance-dating" variant="navy">S&apos;inscrire au Dating du 27 mai</Button>
                <Button href="/contact" variant="outline">Nous contacter</Button>
              </div>
            </div>
          )}
          {article.cta === "entreprise-dating" && (
            <CTADating variant="carte" />
          )}
          {article.cta === "orientation" && (
            <div className="bg-cream rounded-xl p-8 text-center">
              <h3 className="font-serif text-xl text-navy-deep mb-3">Tu hésites encore ?</h3>
              <Button href="/orientation" variant="gold">Fais le test d&apos;orientation</Button>
            </div>
          )}

          {/* Retour blog */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-gold font-semibold text-sm hover:text-gold-light transition-colors">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
