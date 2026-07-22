"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { journey } from "@/lib/data/journey";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

const nodeGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Journey() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 32%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="journey">
      <SectionHeading
        index="04"
        eyebrow="Trajectory"
        title={
          <>
            An intense, self-directed <span className="font-display italic text-copper-bright">build arc</span>.
          </>
        }
        lead="Reconstructed from the public commit history — a compressed run through AI infrastructure, developer tooling, and native systems programming."
      />

      <div ref={railRef} className="relative mt-16 md:mt-24">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute bottom-0 left-2 top-0 w-px -translate-x-1/2 bg-hairline md:left-1/2"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-copper via-copper-bright to-copper"
            style={{ scaleY: reduce ? 1 : fill }}
          />
        </div>
        {/* Rail end-cap fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-obsidian to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian to-transparent"
        />

        <ol className="relative space-y-14 md:space-y-24">
          {journey.map((entry, i) => {
            const alt = i % 2 === 1;
            const containerProps = reduce
              ? ({ initial: "show", animate: "show" } as const)
              : ({
                  initial: "hidden",
                  whileInView: "show",
                  viewport: { once: true, margin: "-12% 0px -12% 0px" },
                } as const);

            return (
              <motion.li
                key={entry.period}
                variants={nodeGroup}
                {...containerProps}
                className="relative pl-12 md:pl-0"
              >
                {/* Node marker on the rail */}
                <motion.span
                  aria-hidden
                  variants={pop}
                  className="absolute left-2 top-7 z-10 -translate-x-1/2 md:left-1/2"
                >
                  <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-copper bg-obsidian">
                    <span className="absolute inset-1 rounded-full bg-copper-bright" />
                    <span className="glow-copper absolute -inset-2 rounded-full" />
                  </span>
                </motion.span>

                {/* Content card */}
                <motion.div
                  variants={rise}
                  className={cn(
                    "group rounded-lg border border-hairline bg-surface/40 p-6 transition-colors duration-500 hover:border-copper/40 md:p-7",
                    alt ? "md:ml-[calc(50%+2.5rem)]" : "md:mr-[calc(50%+2.5rem)]",
                  )}
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper">
                    {entry.period}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-ink-muted">{entry.org}</p>

                  <p className="mt-4 text-pretty leading-relaxed text-ink-dim">{entry.summary}</p>

                  <ul className="mt-5 space-y-2.5">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 flex-none rounded-full bg-copper"
                        />
                        <span className="text-pretty">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {entry.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
