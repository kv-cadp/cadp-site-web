"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CadpWordmark from "@/components/brand/CadpWordmark";
import { RENTREE } from "@/data/rentree";
import { SITE } from "@/data/site";
import type { MenuFormation } from "@/lib/menu-formations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  formations: MenuFormation[];
}

const liens = [
  { href: "/entreprises", label: "Entreprises" },
  { href: "/equipe", label: "L'équipe" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const ligne =
  "flex items-center justify-between w-full min-h-13 px-4 border-b border-cream/10 text-lg font-medium text-left transition-colors";

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={cn("size-5 shrink-0", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Menu plein écran sur mobile (B2, aperçu validé le 25/10/2026) : actions en
 * tête, lignes de 52 px, formations dépliables avec leur domaine en clair.
 * Dialogue modal : le focus y entre à l'ouverture et y reste, Échap ferme,
 * le focus revient ensuite au bouton qui l'a ouvert.
 */
export default function MobileMenu({ isOpen, onClose, formations }: MobileMenuProps) {
  const pathname = usePathname();
  const [formationsOpen, setFormationsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Le parent passe une nouvelle fonction à chaque rendu : l'effet ne doit
  // dépendre que de l'ouverture, sinon le focus de retour serait perdu.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const close = () => {
    setFormationsOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFormationsOpen(false);
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const actif = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 bg-navy-deep text-white overflow-y-auto overscroll-contain"
    >
      <div className="flex items-center justify-between h-20 px-4">
        <Link href="/" onClick={close} aria-label="CADP - Accueil">
          <CadpWordmark className="text-white h-10 w-auto" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="inline-flex items-center justify-center size-11 rounded-md text-white"
          aria-label="Fermer le menu"
        >
          <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-5">
        <Link
          href="/candidater"
          onClick={close}
          className="inline-flex items-center justify-center min-h-12 px-3 bg-gold text-navy-deep rounded-lg font-semibold"
        >
          Je candidate
        </Link>
        <Link
          href="/entreprises"
          onClick={close}
          className="inline-flex items-center justify-center min-h-12 px-3 border-2 border-white text-white rounded-lg font-semibold"
        >
          Je recrute
        </Link>
      </div>

      <nav aria-label="Menu principal">
        <ul className="border-t border-cream/10">
          <li>
            <Link
              href={RENTREE.href}
              onClick={close}
              aria-current={actif(RENTREE.href) ? "page" : undefined}
              className={cn(ligne, actif(RENTREE.href) && "text-gold")}
            >
              Rentrée {RENTREE.annee}
              <span className="text-xs font-semibold text-navy-deep bg-gold px-2 py-0.5 rounded-full">
                Candidatures ouvertes
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setFormationsOpen((o) => !o)}
              aria-expanded={formationsOpen}
              aria-controls="menu-formations"
              className={cn(ligne, actif("/formations") && "text-gold")}
            >
              Formations
              <Chevron className={cn("transition-transform", formationsOpen ? "-rotate-90" : "rotate-90")} />
            </button>
            {formationsOpen && (
              <ul id="menu-formations" className="border-b border-cream/10">
                {formations.map((f) => (
                  <li key={f.href}>
                    <Link
                      href={f.href}
                      onClick={close}
                      aria-current={actif(f.href) ? "page" : undefined}
                      className="block min-h-12 pl-8 pr-4 py-2 border-b border-cream/5"
                    >
                      <span className={cn("block font-semibold", actif(f.href) ? "text-gold" : "text-white")}>{f.label}</span>
                      <span className="block text-sm text-cream/70">{f.domaine}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/formations" onClick={close} className="flex items-center gap-1 min-h-12 pl-8 pr-4 font-semibold text-gold">
                    Toutes les formations
                    <Chevron className="size-4" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                aria-current={actif(l.href) ? "page" : undefined}
                className={cn(ligne, actif(l.href) && "text-gold")}
              >
                {l.label}
                <Chevron className="text-cream/60" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-4 px-4 py-6">
        <a
          href="https://app.cadp.pro/connexion"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-12 px-4 border-2 border-gold text-gold rounded-lg font-semibold"
        >
          Mon espace (candidat ou entreprise)
        </a>
        <p className="text-center text-cream/85">
          Une question ?{" "}
          <a
            href={SITE.phoneHref}
            className="inline-block py-3 font-semibold text-white underline decoration-gold decoration-2 underline-offset-4 whitespace-nowrap"
          >
            {SITE.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
