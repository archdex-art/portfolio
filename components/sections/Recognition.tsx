"use client";

import { recognition } from "@/lib/data/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Asymmetric bento spans + accent per signal, keyed by index in `recognition`.
 * Class strings are kept literal so Tailwind's scanner emits them.
 */
const layout = [
  {
    span: "lg:col-span-4",
    live: true,
    eyebrow: "text-sage",
    border: "hover:border-sage/50 hover:shadow-[0_0_0_1px_rgba(122,148,110,0.18),0_28px_60px_-40px_rgba(122,148,110,0.5)]",
    rule: "via-sage/60",
    link: "group-hover:text-sage",
  },
  {
    span: "lg:col-span-2",
    live: false,
    eyebrow: "text-copper",
    border: "hover:border-copper/50 hover:shadow-[0_0_0_1px_rgba(199,123,74,0.18),0_28px_60px_-40px_rgba(199,123,74,0.5)]",
    rule: "via-copper/60",
    link: "group-hover:text-copper",
  },
  {
    span: "lg:col-span-2",
    live: false,
    eyebrow: "text-copper",
    border: "hover:border-copper/50 hover:shadow-[0_0_0_1px_rgba(199,123,74,0.18),0_28px_60px_-40px_rgba(199,123,74,0.5)]",
    rule: "via-copper/60",
    link: "group-hover:text-copper",
  },
  {
    span: "lg:col-span-2",
    live: false,
    eyebrow: "text-copper",
    border: "hover:border-copper/50 hover:shadow-[0_0_0_1px_rgba(199,123,74,0.18),0_28px_60px_-40px_rgba(199,123,74,0.5)]",
    rule: "via-copper/60",
    link: "group-hover:text-copper",
  },
  {
    span: "lg:col-span-2",
    live: false,
    eyebrow: "text-copper",
    border: "hover:border-copper/50 hover:shadow-[0_0_0_1px_rgba(199,123,74,0.18),0_28px_60px_-40px_rgba(199,123,74,0.5)]",
    rule: "via-copper/60",
    link: "group-hover:text-copper",
  },
  {
    span: "lg:col-span-6",
    live: false,
    eyebrow: "text-copper",
    border: "hover:border-copper/50 hover:shadow-[0_0_0_1px_rgba(199,123,74,0.18),0_28px_60px_-40px_rgba(199,123,74,0.5)]",
    rule: "via-copper/60",
    link: "group-hover:text-copper",
  },
];

export function Recognition() {
  return (
    <Section id="recognition">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="glow-copper absolute -right-40 top-24 h-[30rem] w-[30rem] rounded-full opacity-60" />
      </div>

      <SectionHeading
        index="05"
        eyebrow="Signals"
        title={
          <>
            Proof over <span className="text-gradient-copper">promises</span>
          </>
        }
        lead="No testimonials, no manufactured praise — every line below is a verifiable fact you can open in the repos and check for yourself."
      />

      <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {recognition.map((signal, i) => {
          const style = layout[i] ?? layout[1];
          const featured = style.span.includes("col-span-4") || style.span.includes("col-span-6");

          return (
            <Reveal
              as="li"
              key={signal.title}
              delay={i * 0.07}
              className={`group relative flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 md:p-8 ${style.border} ${style.span}`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${style.rule}`}
              />

              <div className="flex items-center gap-2.5">
                {style.live && (
                  <span className="live-dot" aria-hidden>
                    <span className="bg-sage" />
                  </span>
                )}
                <span className={`font-mono text-[0.7rem] uppercase tracking-[0.22em] ${style.eyebrow}`}>
                  {signal.kind}
                </span>
              </div>

              <h3
                className={`mt-4 font-display leading-[1.08] tracking-[-0.01em] text-ink text-balance ${
                  featured ? "text-2xl md:text-[2rem]" : "text-xl md:text-2xl"
                }`}
              >
                {signal.title}
              </h3>

              <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-ink-dim">
                {signal.detail}
              </p>

              {signal.href && (
                <a
                  href={signal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex w-fit items-center gap-1.5 pt-6 font-mono text-xs text-ink-muted transition-colors duration-300 ${style.link}`}
                >
                  View source
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
