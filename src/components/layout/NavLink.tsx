"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tone?: "light" | "dark";
}

export default function NavLink({ href, children, className, onClick, tone = "light" }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  const toneClasses =
    tone === "dark"
      ? isActive
        ? "text-navy-deep underline decoration-2 decoration-gold underline-offset-8"
        : "text-navy-deep/80 hover:text-navy-deep"
      : isActive
        ? "text-gold"
        : "text-white hover:text-gold-light";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("text-sm font-semibold transition-colors duration-200", toneClasses, className)}
    >
      {children}
    </Link>
  );
}
