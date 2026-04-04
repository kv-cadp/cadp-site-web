import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
}

export function createPageMetadata({
  title,
  description,
  path = "",
}: PageMetadataOptions): Metadata {
  const url = `https://cadp.pro${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: "CADP - Campus Alternance Drôme Provence",
    },
  };
}
