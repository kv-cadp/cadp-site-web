"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 6, prefix: "", suffix: "", label: "formations", animate: true },
  { value: 50, prefix: "", suffix: "+", label: "entreprises partenaires", animate: true },
  { value: 0, prefix: "", suffix: "", label: "étudiants max par promo", animate: false, display: "10-12" },
  { value: 4, prefix: "", suffix: "", label: "départements couverts", animate: true },
];

export default function KeyFigures() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) =>
            stat.animate ? (
              <AnimatedCounter
                key={i}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
              />
            ) : (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl md:text-5xl text-gold mb-2">
                  {stat.display}
                </div>
                <div className="text-gray-mid text-sm uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
