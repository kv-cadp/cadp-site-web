"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import CadpWordmark from "@/components/brand/CadpWordmark";

const formations = [
  { href: "/formations/bts-mco", label: "BTS MCO", full: "Management Commercial Opérationnel" },
  { href: "/formations/bts-ndrc", label: "BTS NDRC", full: "Négociation et Digitalisation de la Relation Client" },
  { href: "/formations/bts-gpme", label: "BTS GPME", full: "Gestion de la PME" },
  { href: "/formations/bts-cg", label: "BTS CG", full: "Comptabilité et Gestion" },
  { href: "/formations/bts-mos", label: "BTS MOS", full: "Management Opérationnel de la Sécurité" },
  { href: "/formations/tp-advf", label: "TP ADVF", full: "Assistant De Vie aux Familles" },
  { href: "/formations/bts-gtla", label: "BTS GTLA", full: "Transports et Logistique — Rentrée 2027" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 border-b-2 border-gold ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 md:h-24"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <CadpWordmark className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" tone="dark">Accueil</NavLink>
            <NavLink href="/rentree-2026" tone="dark">Rentrée 2026</NavLink>

            {/* Dropdown formations */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/formations"
                className="flex items-center gap-1 text-sm font-semibold text-navy-deep/80 hover:text-navy-deep transition-colors"
                aria-expanded={dropdownOpen}
              >
                Formations
                <svg
                  className={`size-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white rounded-xl shadow-xl py-2 min-w-[280px]">
                    {formations.map((f) => (
                      <Link
                        key={f.href}
                        href={f.href}
                        className="block px-4 py-3 hover:bg-cream transition-colors"
                      >
                        <span className="font-semibold text-navy-deep">{f.label}</span>
                        <span className="block text-xs text-gray-mid mt-0.5">{f.full}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink href="/entreprises" tone="dark">Entreprises</NavLink>
            <NavLink href="/equipe" tone="dark">L&apos;équipe</NavLink>
            <NavLink href="/blog" tone="dark">Blog</NavLink>
            <NavLink href="/contact" tone="dark">Contact</NavLink>
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://app.cadp.pro/connexion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-navy-deep/80 hover:text-navy-deep transition-colors"
            >
              Mon espace
            </a>
            <Link
              href="/candidater"
              className="inline-flex items-center px-5 py-2.5 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors"
            >
              Je candidate
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center bg-navy-deep text-white rounded-md p-2.5"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
