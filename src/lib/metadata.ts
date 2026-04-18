import type { Metadata } from "next";

const DEFAULT_OG_IMAGE = {
  url: "/logo-cadp.png",
  width: 1080,
  height: 1350,
  alt: "Campus Alternance Drôme Provence",
};

interface PageMetadataOptions {
  title: NonNullable<Metadata["title"]>;
  description: string;
  path?: string;
  ogImage?: string;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
}: PageMetadataOptions): Metadata {
  const url = `https://www.cadp.pro${path}`;
  const image = ogImage
    ? { ...DEFAULT_OG_IMAGE, url: ogImage }
    : DEFAULT_OG_IMAGE;

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
      images: [image],
    },
  };
}
