"use client";

import { useState } from "react";
import Link from "next/link";
import type { TopBannerMessage } from "@/lib/top-banner";

export default function TopBanner({ message }: { message: TopBannerMessage }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-navy-deep text-gold text-sm font-medium h-10 flex items-center justify-center px-12 border-b border-white/10">
      {/* Desktop */}
      <span className="hidden sm:inline">
        {message.desktop}{" "}
        <Link href={message.href} className="underline font-semibold hover:text-gold-light transition-colors">
          {message.cta}
        </Link>
      </span>
      {/* Mobile */}
      <span className="sm:hidden">
        {message.mobile}{" "}
        <Link href={message.href} className="underline font-semibold">
          →
        </Link>
      </span>
      {/* Close */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold transition-colors"
        aria-label="Fermer la bannière"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
