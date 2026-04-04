import { SITE } from "@/data/site";
import type { Formation } from "@/types/formation";

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Campus Alternance Drôme Provence",
    alternateName: "CADP",
    url: "https://www.cadp.pro",
    logo: "https://www.cadp.pro/logo-cadp.jpg",
    description:
      "Centre de formation en alternance à Pierrelatte (Drôme). BTS MCO, NDRC, GPME, CG, MOS et TP ADVF en promos de 10-12 étudiants.",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.3782,
      longitude: 4.6931,
    },
    openingHours: "Mo-Fr 08:30-17:00",
    foundingDate: "2024-09-02",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "CFA IFIR",
      url: "https://www.ifir.fr",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Qualiopi",
      name: "Certification Qualiopi — Actions de formation par apprentissage",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Drôme" },
      { "@type": "AdministrativeArea", name: "Ardèche" },
      { "@type": "AdministrativeArea", name: "Vaucluse" },
      { "@type": "AdministrativeArea", name: "Gard" },
    ],
  };
}

export function generateCourseJsonLd(formation: Formation) {
  const isAdvf = formation.slug === "tp-advf";

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${formation.fullName} (${formation.code})`,
    description: formation.metaDescription,
    url: `https://www.cadp.pro/formations/${formation.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "CADP — Campus Alternance Drôme Provence",
      url: "https://www.cadp.pro",
    },
    educationalLevel: isAdvf ? "Niveau 3 (CAP/BEP)" : "Bac+2",
    timeRequired: isAdvf ? "P1Y" : "P2Y",
    occupationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: isAdvf ? "Titre Professionnel" : "BTS",
      name: formation.shortName,
      educationalLevel: isAdvf ? "Niveau 3" : "Niveau 5",
      recognizedBy: {
        "@type": "Organization",
        name: isAdvf
          ? "Ministère du Travail"
          : "Ministère de l'Enseignement supérieur",
      },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "mixed",
      courseWorkload:
        "2-3 jours campus / 2-3 jours entreprise (alternance)",
      startDate: "2026-09-01",
      endDate: isAdvf ? "2027-06-30" : "2028-06-30",
      location: {
        "@type": "Place",
        name: "CADP Pierrelatte",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          postalCode: SITE.address.postalCode,
        },
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description:
        "Formation financée par l'OPCO de l'entreprise — gratuit pour l'alternant",
      category: "Apprentissage",
    },
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
    url: "https://www.cadp.pro",
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
      latitude: 44.3782,
      longitude: 4.6931,
    },
  };
}

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
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      sameAs: "https://www.cadp.pro",
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
