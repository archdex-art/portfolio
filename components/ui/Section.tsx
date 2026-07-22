import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function Section({ id, children, className, as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("relative scroll-mt-24 py-24 md:py-36", className)}>
      <div className="shell">{children}</div>
    </Tag>
  );
}

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Standalone pages (e.g. /work, /blog) need this to be the page's sole h1. */
  as?: "h1" | "h2";
}

export function SectionHeading({ index, eyebrow, title, lead, align = "left", className, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {index && <span className="font-mono text-xs text-ink-faint">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <Heading className="mt-5 text-balance text-4xl leading-[1.03] text-ink md:text-6xl">{title}</Heading>
      {lead && <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-dim md:text-xl">{lead}</p>}
    </Reveal>
  );
}
