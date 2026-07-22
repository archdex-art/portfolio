"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { techMarquee } from "@/lib/data/skills";
import { Button } from "@/components/ui/Button";

const line = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      {/* Ambient field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="glow-copper anim-drift absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full" />
        <div className="glow-sage absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div className="shell">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/50 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="live-dot relative inline-block h-2 w-2 rounded-full bg-sage" aria-hidden />
          <span className="font-mono text-xs tracking-wide text-ink-dim">{site.availability}</span>
          <span className="text-ink-faint">·</span>
          <span className="font-mono text-xs tracking-wide text-ink-faint">{site.location}</span>
        </motion.div>

        <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.94] tracking-[-0.03em] text-ink">
          {["I build the", "infrastructure", "behind intelligent"].map((l, i) => (
            <motion.span
              key={l}
              custom={i}
              variants={reduce ? undefined : line}
              initial={reduce ? undefined : "hidden"}
              animate={reduce ? undefined : "show"}
              className="block"
            >
              {l === "infrastructure" ? <em className="text-gradient-copper not-italic">{l}</em> : l}
            </motion.span>
          ))}
          <motion.span
            custom={3}
            variants={reduce ? undefined : line}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            className="block"
          >
            software.
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-dim md:text-xl"
        >
          {site.name} is an independent engineer working across{" "}
          <span className="text-ink">AI systems and developer tooling</span> — agent
          observability, deterministic code-intelligence swarms, and intent-driven runtimes.
          Shipped in Go, Rust, TypeScript &amp; Python.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-11 flex flex-wrap items-center gap-3"
        >
          <Button href="/#work" variant="primary">
            View selected work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button href="/#contact" variant="outline">
            Start a conversation
          </Button>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink-dim transition-colors hover:border-copper hover:text-copper"
            aria-label="GitHub profile"
          >
            <svg width="19" height="19" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-20 border-y border-hairline py-4 md:mt-28" aria-hidden>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
        <div className="marquee-track gap-10">
          {[...techMarquee, ...techMarquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-ink-faint">
              {t}
              <span className="text-copper/40">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
