import { SITE } from "@/data/site";

interface FormationHeroActionsProps {
  /** Lien vers le formulaire d'inscription (voir lib/inscription.ts) */
  href: string;
  label?: string;
}

/** Appel à candidater du hero des fiches, visible dès le premier écran sur mobile. */
export default function FormationHeroActions({
  href,
  label = "Je candidate à cette formation",
}: FormationHeroActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-base hover:bg-gold-light transition-colors"
      >
        {label}
      </a>
      <a
        href={SITE.phoneHref}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold text-base hover:bg-white hover:text-navy-deep transition-colors"
      >
        Une question ? {SITE.phone}
      </a>
    </div>
  );
}
