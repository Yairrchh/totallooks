"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const VARIANT_CLASS = {
  "fade-up": "opacity-0 translate-y-6",
  "fade-in": "opacity-0",
  "scale-in": "opacity-0 scale-90",
  "slide-in-right": "opacity-0 translate-x-10",
  "slide-in-left": "opacity-0 -translate-x-10",
} as const;

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: keyof typeof VARIANT_CLASS;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        // Once visible, apply no transform utility at all rather than a
        // zero-value one (translate-x-0, scale-100, ...): Tailwind v4 sets
        // translate/scale as their own CSS properties, and any explicit
        // value other than the `none` keyword permanently creates a new
        // stacking context, which traps z-indexed children (dropdowns,
        // badges) behind later siblings elsewhere on the page.
        visible ? "opacity-100" : VARIANT_CLASS[variant]
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
