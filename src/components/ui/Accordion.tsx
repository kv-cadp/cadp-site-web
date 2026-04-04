"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-gray-200", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex w-full items-center justify-between py-5 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-navy-deep pr-4">
              {item.question}
            </h3>
            <svg
              className={cn(
                "size-5 shrink-0 text-gold transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === index ? "max-h-96 pb-5" : "max-h-0"
            )}
          >
            <p className="text-gray-mid leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
