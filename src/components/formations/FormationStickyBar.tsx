"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";

interface FormationStickyBarProps {
  /** Lien vers le formulaire d'inscription (voir lib/inscription.ts) */
  href: string;
  label: string;
}

/**
 * Barre d'action fixe en bas d'écran, mobile seulement. Elle apparaît une fois
 * le hero de la fiche (#formation-hero) dépassé et disparaît dès que l'appel
 * final (#formation-cta) entre à l'écran : elle ne double jamais ses boutons
 * et ne couvre pas le footer.
 */
export default function FormationStickyBar({ href, label }: FormationStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("formation-hero");
    const cta = document.getElementById("formation-cta");
    let frame = 0;

    const update = () => {
      frame = 0;
      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < 0
        : window.scrollY > window.innerHeight;
      const ctaReached = cta ? cta.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastHero && !ctaReached);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-40 flex gap-3 bg-navy-deep border-t border-gold/40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] motion-safe:transition-transform motion-safe:duration-300",
        visible ? "translate-y-0" : "translate-y-full invisible",
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center min-h-11 px-4 bg-gold text-navy-deep rounded-lg font-semibold text-base"
      >
        {label}
      </a>
      <a
        href={SITE.phoneHref}
        className="inline-flex items-center justify-center min-h-11 px-4 border-2 border-white text-white rounded-lg font-semibold text-base"
      >
        Appeler
      </a>
    </div>
  );
}
