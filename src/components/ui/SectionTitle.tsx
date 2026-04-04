import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  light?: boolean;
  className?: string;
  as?: "h2" | "h3";
}

export default function SectionTitle({
  children,
  subtitle,
  light = false,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <Tag
        className={cn(
          "font-serif text-3xl md:text-4xl mb-4",
          light ? "text-white" : "text-navy-deep"
        )}
      >
        {children}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl mx-auto",
            light ? "text-gray-300" : "text-gray-mid"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "w-16 h-1 mx-auto mt-6 rounded-full",
          light ? "bg-gold" : "bg-gold"
        )}
      />
    </div>
  );
}
