"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import type { ProgramYear } from "@/types/formation";
import { cn } from "@/lib/utils";

interface ProgramSectionProps {
  program: ProgramYear[];
}

export default function ProgramSection({ program }: ProgramSectionProps) {
  const [activeYear, setActiveYear] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Ce que tu vas apprendre, année par année.">
          Programme de la formation
        </SectionTitle>

        {/* Year tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {program.map((year, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveYear(i)}
              className={cn(
                "px-6 py-3 rounded-lg font-semibold text-sm transition-all",
                activeYear === i
                  ? "bg-gold text-navy-deep"
                  : "bg-cream text-gray-mid hover:bg-gold-pale"
              )}
            >
              {year.title.split("—")[0].trim()}
            </button>
          ))}
        </div>

        {/* Active year content */}
        <div>
          <h3 className="font-serif text-xl text-navy-deep mb-6 text-center">
            {program[activeYear].title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program[activeYear].modules.map((module, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-cream rounded-lg"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="size-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-dark font-medium text-sm">{module.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
