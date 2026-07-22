"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/lib/data/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const roadmap = [
  {
    label: "Runtime",
    title: "Deeper Rust runtime work",
    detail: "Async scheduler internals and zero-copy IO paths for the systems tier.",
  },
  {
    label: "Protocol",
    title: "MCP governance",
    detail: "Policy, capability scoping, and audit trails for Model Context Protocol servers.",
  },
  {
    label: "Extensibility",
    title: "WASM plugin sandboxes",
    detail: "Capability-secured WebAssembly plugins with deterministic resource limits.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function SkillMeter({
  name,
  level,
  index,
  reduce,
}: {
  name: string;
  level: number;
  index: number;
  reduce: boolean;
}) {
  return (
    <li className="group/skill">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-ink md:text-base">{name}</span>
        <span className="font-mono text-xs tabular-nums text-ink-faint" aria-hidden>
          {level}
        </span>
      </div>
      <div
        className="relative mt-2.5 h-px w-full bg-hairline"
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        {/* Track ticks */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-between">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} className="h-1.5 w-px -translate-y-1/2 bg-hairline" />
          ))}
        </div>
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 block h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-copper to-copper-bright shadow-[0_0_12px_var(--color-copper-glow)] group-hover/skill:shadow-[0_0_18px_var(--color-copper-glow)]"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.06 * index, ease: EASE }}
        />
        <motion.span
          aria-hidden
          className="absolute top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-bright shadow-[0_0_10px_var(--color-copper-glow)]"
          initial={reduce ? false : { left: "0%", opacity: 0 }}
          animate={{ left: `${level}%`, opacity: 1 }}
          transition={{ duration: 1, delay: 0.06 * index, ease: EASE }}
        />
      </div>
    </li>
  );
}

export function Stack() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const group = skillGroups[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = skillGroups.length;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="stack">
      <SectionHeading
        index="02"
        eyebrow="Capabilities"
        title={
          <>
            The stack behind
            <br />
            <span className="text-gradient-copper font-display italic">the systems.</span>
          </>
        }
        lead="Depth clusters where the work does. Proficiency is self-assessed against the evidence sitting in the public repos — not a wishlist."
      />

      <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,20rem)_1fr]">
        {/* Category selector */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-col divide-y divide-hairline border-y border-hairline"
          >
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`stack-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="stack-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex items-center gap-4 py-4 text-left transition-colors"
                >
                  <span
                    aria-hidden
                    className={`font-mono text-[0.7rem] tabular-nums transition-colors ${
                      selected ? "text-copper" : "text-ink-faint group-hover:text-ink-dim"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-base transition-colors md:text-lg ${
                      selected ? "text-ink" : "text-ink-dim group-hover:text-ink"
                    }`}
                  >
                    {g.name}
                  </span>
                  {selected && (
                    <motion.span
                      layoutId={reduce ? undefined : "stack-active-marker"}
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_10px_var(--color-copper-glow)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Roadmap micro-block */}
          <div className="mt-10 rounded-lg border border-hairline bg-surface/40 p-6">
            <div className="flex items-center gap-2">
              <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
              <span className="eyebrow text-sage-dim">Currently learning</span>
            </div>
            <ul className="mt-5 space-y-5">
              {roadmap.map((r) => (
                <li key={r.title} className="grid grid-cols-[auto_1fr] gap-x-3">
                  <span className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-widest text-sage-dim">
                    {r.label}
                  </span>
                  <div>
                    <p className="text-sm text-ink">{r.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-dim">{r.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Active panel */}
        <div
          id="stack-panel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${active}`}
          tabIndex={0}
          className="relative"
        >
          <div aria-hidden className="grid-lines pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 opacity-30" />
          <motion.div
            key={reduce ? undefined : active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-dim md:text-xl">
              {group.blurb}
            </p>
            <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {group.skills.map((s, i) => (
                <SkillMeter
                  key={`${active}-${s.name}`}
                  name={s.name}
                  level={s.level}
                  index={i}
                  reduce={reduce}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
