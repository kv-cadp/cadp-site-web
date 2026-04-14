import schemaGraph from "@/data/schema-cadp.json";
import type { Formation } from "@/types/formation";

// Le graph complet pour la homepage (Organization + tous les Course)
export function generateFullGraphJsonLd() {
  return schemaGraph;
}

// Organization seule (pour le layout ou pages secondaires)
export function generateOrganizationJsonLd() {
  const org = (schemaGraph as { "@graph": Record<string, unknown>[] })["@graph"][0];
  return {
    "@context": "https://schema.org",
    ...org,
  };
}

// Course individuel pour une page formation
export function generateCourseJsonLd(formation: Formation) {
  const graph = (schemaGraph as { "@graph": Record<string, unknown>[] })["@graph"];
  const course = graph.find(
    (item) => (item as { url?: string }).url === `https://www.cadp.pro/formations/${formation.slug}`
  );

  if (course) {
    return {
      "@context": "https://schema.org",
      ...course,
      provider: { "@id": "https://www.cadp.pro/#organization" },
    };
  }

  // Fallback si le cours n'est pas dans le graph
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `https://www.cadp.pro/formations/${formation.slug}#course`,
    name: `${formation.fullName} (${formation.code})`,
    description: formation.metaDescription,
    url: `https://www.cadp.pro/formations/${formation.slug}`,
    provider: { "@id": "https://www.cadp.pro/#organization" },
    timeRequired: formation.slug === "tp-advf" ? "P1Y" : "P2Y",
    educationalLevel: formation.slug === "tp-advf" ? "CAP" : "Bac+2",
    courseMode: "blended",
    inLanguage: "fr",
    isAccessibleForFree: true,
    maximumEnrollment: 12,
  };
}

// FAQ
export function generateFAQJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// Contact / LocalBusiness
export function generateContactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.cadp.pro/#organization",
    name: "Campus Alternance Drôme Provence",
    alternateName: "CADP",
    url: "https://www.cadp.pro",
    telephone: "+33475003456",
    email: "contact@cadp.pro",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Boulevard Frédéric Mistral",
      addressLocality: "Pierrelatte",
      postalCode: "26700",
      addressRegion: "Drôme",
      addressCountry: "FR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33475003456",
      email: "contact@cadp.pro",
      contactType: "customer service",
      availableLanguage: "French",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.3537,
      longitude: 4.6977,
    },
  };
}

// WebApplication (outils interactifs)
export function generateWebApplicationJsonLd(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `https://www.cadp.pro${url}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    provider: { "@id": "https://www.cadp.pro/#organization" },
  };
}

// BlogPosting
export function generateBlogPostingJsonLd(article: {
  title: string;
  metaDescription: string;
  dateISO: string;
  updatedDateISO?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.dateISO,
    dateModified: article.updatedDateISO || article.dateISO,
    author: {
      "@type": "Person",
      name: "Kévin Vidard",
      jobTitle: "Responsable Pédagogique",
      worksFor: { "@id": "https://www.cadp.pro/#organization" },
    },
    publisher: { "@id": "https://www.cadp.pro/#organization" },
    mainEntityOfPage: `https://www.cadp.pro/blog/${article.slug}`,
    url: `https://www.cadp.pro/blog/${article.slug}`,
  };
}

// Composant JsonLd réutilisable
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
