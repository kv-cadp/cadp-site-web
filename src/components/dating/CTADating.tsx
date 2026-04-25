import Button from "@/components/ui/Button";

interface CTADatingProps {
  variant: "banniere" | "carte";
}

const TITLE = "Alternance Dating — 27 mai 2026";
const TAGLINE = "Événement entreprises";
const SUBTITLE =
  "Rencontrez des candidats BTS et TP ADVF pré-qualifiés • 14h – 16h • Pierrelatte";
const HREF = "/entreprises/alternance-dating";
const CTA_LABEL = "S'inscrire";

export default function CTADating({ variant }: CTADatingProps) {
  if (variant === "banniere") {
    return (
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-2xl">
            <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-2">
              {TAGLINE}
            </p>
            <h2 className="font-serif text-xl md:text-2xl text-white mb-2 leading-tight">
              {TITLE}
            </h2>
            <p className="text-cream/70 text-sm md:text-base">{SUBTITLE}</p>
          </div>
          <div className="shrink-0">
            <Button href={HREF} variant="gold" className="px-6 py-3">
              {CTA_LABEL}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // carte
  return (
    <div className="bg-cream border border-gold-pale rounded-xl p-8 text-center">
      <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-3">
        {TAGLINE}
      </p>
      <h3 className="font-serif text-xl text-navy-deep mb-2">{TITLE}</h3>
      <p className="text-gray-mid text-sm mb-5 max-w-md mx-auto">{SUBTITLE}</p>
      <Button href={HREF} variant="gold">
        {CTA_LABEL}
      </Button>
    </div>
  );
}
