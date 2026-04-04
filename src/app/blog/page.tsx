import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { articles, categoryLabels } from "@/data/blog";

export const metadata = createPageMetadata({
  title: "Blog — Alternance, orientation et recrutement",
  description:
    "Conseils pratiques sur l'alternance, l'orientation et le recrutement en Drôme-Ardèche. Articles du Campus Alternance Drôme Provence (CADP) à Pierrelatte.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">Blog</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Nos conseils pour réussir
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Orientation, alternance, recrutement — des articles pratiques pour les candidats, les parents et les entreprises.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {articles.map((article) => {
              const cat = categoryLabels[article.category];
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className="text-xs text-gray-mid">{article.date}</span>
                    </div>
                    <h2 className="font-serif text-xl text-navy-deep mb-2 group-hover:text-gold transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-mid text-sm leading-relaxed mb-3">
                      {article.excerpt}
                    </p>
                    <span className="text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire l&apos;article
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
