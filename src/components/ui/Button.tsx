import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "gold" | "outline" | "navy" | "white-outline";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-light",
  outline: "border-2 border-gold text-gold hover:bg-gold hover:text-navy-deep",
  navy: "bg-navy-deep text-white hover:bg-navy-medium",
  "white-outline": "border-2 border-white text-white hover:bg-white hover:text-navy-deep",
};

export default function Button({
  children,
  href,
  variant = "gold",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
