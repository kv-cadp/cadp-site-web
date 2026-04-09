"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 6, prefix: "", suffix: "", label: "formations" },
  { value: 50, prefix: "", suffix: "+", label: "entreprises partenaires" },
  { value: 12, prefix: "", suffix: "", label: "étudiants max par promo" },
  { value: 4, prefix: "", suffix: "", label: "départements couverts" },
];

export default function KeyFigures() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={i}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
