import { useEffect, useState } from "react";

/**
 * Vrai quand la page défile vers le bas au-delà de `seuil` pixels, faux dès
 * qu'elle remonte. Utilisé pour masquer le bandeau du haut pendant la lecture
 * (B2, validé le 25/10/2026).
 */
export function useHideOnScroll(seuil = 80): boolean {
  const [masque, setMasque] = useState(false);

  useEffect(() => {
    let dernier = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Ignore les petits à-coups (inertie, rebond iOS).
      if (Math.abs(y - dernier) < 8) return;
      setMasque(y > dernier && y > seuil);
      dernier = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [seuil]);

  return masque;
}
