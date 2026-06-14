import type { Metadata } from "next";
import localFont from "next/font/local";
import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-500-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-600-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/dm-sans-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const dmSerifDisplay = localFont({
  src: [
    { path: "./fonts/dm-serif-display-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display-400-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono-500-latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const SEO_TITLE = "CADP Pierrelatte — Formations BTS en alternance Drôme";
const SEO_DESCRIPTION =
  "Centre de formation en alternance à Pierrelatte (26). BTS MCO, NDRC, GPME en promos de 12. Accompagnement individualisé, certification Qualiopi IFIR.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cadp.pro"),
  title: {
    default: SEO_TITLE,
    template: "%s | CADP",
  },
  description: SEO_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CADP - Campus Alternance Drôme Provence",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${dmMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans text-gray-dark bg-white">
        <TopBanner />
        <Header />
        <main className="flex-1 pt-30 md:pt-34">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
