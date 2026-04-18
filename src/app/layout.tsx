import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SEO_TITLE = "CADP Pierrelatte — Formations BTS en alternance Drôme";
const SEO_DESCRIPTION =
  "Centre de formation en alternance à Pierrelatte (26). BTS MCO, NDRC, GPME en promos de 10-12. Accompagnement individualisé, certification Qualiopi IFIR.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cadp.pro"),
  title: {
    default: SEO_TITLE,
    template: "%s | CADP",
  },
  description: SEO_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
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
      className={`${dmSans.variable} ${dmSerifDisplay.variable} antialiased`}
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
