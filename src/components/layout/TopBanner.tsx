"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gold text-navy-deep text-sm font-medium h-10 flex items-center justify-center px-12">
      {/* Desktop */}
      <span className="hidden sm:inline">
        Rentrée 2026 — 12 places par formation, pas une de plus.{" "}
        <Link href="/rentree-2026" className="underline font-semibold hover:text-navy-light transition-colors">
          En savoir plus →
        </Link>
      </span>
      {/* Mobile */}
      <span className="sm:hidden">
        Rentrée 2026 — 12 places par promo.{" "}
        <Link href="/rentree-2026" className="underline font-semibold">
          →
        </Link>
      </span>
      {/* Close */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-deep/60 hover:text-navy-deep transition-colors"
        aria-label="Fermer la bannière"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
