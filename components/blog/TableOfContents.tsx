"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  depth: number;
}

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="eyebrow mb-4">On this page</p>
      <ul className="space-y-2.5 border-l border-hairline">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "1.75rem" : "1rem" }}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 border-transparent pl-3 leading-snug transition-colors",
                active === h.id
                  ? "border-copper text-copper"
                  : "text-ink-faint hover:text-ink-dim",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
