import HeroSection from "@/components/home/HeroSection";
import OrientationSection from "@/components/home/OrientationSection";
import KeyFigures from "@/components/home/KeyFigures";
import FormationsOverview from "@/components/home/FormationsOverview";
import Testimonials from "@/components/home/Testimonials";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { JsonLd, generateFullGraphJsonLd } from "@/lib/structured-data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: {
    absolute: "CADP Pierrelatte — BTS en alternance Drôme Provence",
  },
  description:
    "CFA à Pierrelatte : 5 BTS (MCO, NDRC, GPME, CG, MOS) et TP ADVF en alternance. Promos de 10-12, pédagogie humaine, rentrée 2026 ouverte.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateFullGraphJsonLd()} />
      <HeroSection />
      <OrientationSection />
      <KeyFigures />
      <FormationsOverview />
      <Testimonials />
      <UpcomingEvents />
    </>
  );
}
