import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Campus Alternance Drôme Provence",
};

interface PageMetadataOptions {
  title: NonNullable<Metadata["title"]>;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
}

function resolveTitleString(
  title: NonNullable<Metadata["title"]>,
): string | undefined {
  if (typeof title === "string") return title;
  if ("absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  if ("default" in title && typeof title.default === "string") {
    return title.default;
  }
  return undefined;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = path || "/";
  const image = ogImage
    ? { ...DEFAULT_OG_IMAGE, url: ogImage }
    : DEFAULT_OG_IMAGE;
  const twitterTitle = resolveTitleString(title);

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
      type,
      locale: "fr_FR",
      siteName: "CADP - Campus Alternance Drôme Provence",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description,
      images: [image.url],
    },
  };
}
