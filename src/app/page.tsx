import HeroSection from "@/components/home/HeroSection";
import OrientationSection from "@/components/home/OrientationSection";
import KeyFigures from "@/components/home/KeyFigures";
import ResultatsPromo from "@/components/home/ResultatsPromo";
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
    "Campus d'alternance à Pierrelatte, UFA du CFA IFIR : 5 BTS (MCO, NDRC, GPME, CG, MOS), Bachelor RQSE et TP ADVF. Promos de 12, pédagogie humaine.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateFullGraphJsonLd()} />
      <HeroSection />
      <OrientationSection />
      <KeyFigures />
      <ResultatsPromo />
      <FormationsOverview />
      <Testimonials />
      <UpcomingEvents />
    </>
  );
}
