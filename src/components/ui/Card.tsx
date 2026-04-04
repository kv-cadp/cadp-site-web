import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm",
        hover && "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
