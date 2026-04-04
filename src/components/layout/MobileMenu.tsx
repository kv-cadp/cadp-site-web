"use client";

import { useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const formations = [
  { href: "/formations/bts-mco", label: "BTS MCO" },
  { href: "/formations/bts-ndrc", label: "BTS NDRC" },
  { href: "/formations/bts-gpme", label: "BTS GPME" },
  { href: "/formations/bts-cg", label: "BTS CG" },
  { href: "/formations/bts-mos", label: "BTS MOS" },
  { href: "/formations/tp-advf", label: "TP ADVF" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-deep/95 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white p-2"
          aria-label="Fermer le menu"
        >
          <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <NavLink href="/" onClick={onClose} className="text-2xl">
          Accueil
        </NavLink>

        <div className="flex flex-col items-center gap-4">
          <span className="text-gold font-serif text-2xl">Formations</span>
          {formations.map((f) => (
            <NavLink key={f.href} href={f.href} onClick={onClose} className="text-lg">
              {f.label}
            </NavLink>
          ))}
        </div>

        <NavLink href="/contact" onClick={onClose} className="text-2xl">
          Contact
        </NavLink>

        <Link
          href="/contact"
          onClick={onClose}
          className="mt-4 inline-flex items-center px-8 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-lg hover:bg-gold-light transition-colors"
        >
          Je candidate
        </Link>
      </div>
    </div>
  );
}
