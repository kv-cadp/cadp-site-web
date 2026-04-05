import HeroSection from "@/components/home/HeroSection";
import OrientationSection from "@/components/home/OrientationSection";
import KeyFigures from "@/components/home/KeyFigures";
import FormationsOverview from "@/components/home/FormationsOverview";
import Testimonials from "@/components/home/Testimonials";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { JsonLd, generateFullGraphJsonLd } from "@/lib/structured-data";

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
