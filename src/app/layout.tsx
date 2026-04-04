import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://cadp.pro"),
  title: {
    default: "CADP — Formations en alternance à Pierrelatte | Campus Alternance Drôme Provence",
    template: "%s | CADP",
  },
  description:
    "Centre de formation en alternance à Pierrelatte. BTS MCO, NDRC, GPME en promos de 10-12 étudiants. Accompagnement individualisé, Alternance Dating et certification Qualiopi via CFA IFIR.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://cadp.pro",
    siteName: "CADP - Campus Alternance Drôme Provence",
    title: "CADP — Formations en alternance à Pierrelatte",
    description:
      "Centre de formation en alternance à Pierrelatte. BTS MCO, NDRC, GPME en promos de 10-12 étudiants.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://cadp.pro",
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
        <Header />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
