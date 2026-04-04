"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl text-gold mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-gray-mid text-sm uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  );
}
