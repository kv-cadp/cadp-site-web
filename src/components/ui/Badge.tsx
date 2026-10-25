import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  /** "gold" sur fond clair, "gold-dark" sur fond navy (heros des fiches). */
  variant?: "gold" | "gold-dark" | "navy" | "cream";
  className?: string;
}

const variants = {
  gold: "bg-gold-pale text-navy-deep border-gold-pale",
  "gold-dark": "bg-gold/10 text-gold border-gold/20",
  navy: "bg-navy-deep/10 text-navy-deep border-navy-deep/20",
  cream: "bg-cream text-navy-deep border-gold-pale",
};

export default function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
