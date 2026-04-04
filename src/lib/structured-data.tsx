import { SITE } from "@/data/site";
import type { Formation } from "@/types/formation";

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    telephone: "+33475003456",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed,
    foundingDate: "2024",
    description: SITE.description,
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: SITE.cfa,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Qualiopi (via CFA IFIR)",
    },
  };
}

export function generateCourseJsonLd(formation: Formation) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${formation.fullName} en alternance`,
    description: formation.metaDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "blended",
      courseWorkload: "P2Y",
      location: {
        "@type": "Place",
        name: "CADP Pierrelatte",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.city,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
      },
    },
    educationalCredentialAwarded: `${formation.shortName} (${formation.level})`,
  };
}

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

export function generateContactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    telephone: "+33475003456",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
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
      email: SITE.email,
      contactType: "customer service",
      availableLanguage: "French",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.3558,
      longitude: 4.6908,
    },
  };
}

export function generateWebApplicationJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE.url}${url}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      sameAs: SITE.url,
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
