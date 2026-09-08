"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { projects, categories } from "@/lib/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

const filters = ["All", ...categories] as const;

function initialQuery(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("work_q") ?? "";
}

function initialCategory(): (typeof filters)[number] {
  if (typeof window === "undefined") return "All";
  const cat = new URLSearchParams(window.location.search).get("work_cat");
  return cat && (filters as readonly string[]).includes(cat) ? (cat as (typeof filters)[number]) : "All";
}

export function Work() {
  const reduce = useReducedMotion();
  const searchId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState<(typeof filters)[number]>(initialCategory);

  // Deep-link filter state into the URL (?work_q=…&work_cat=…) without
  // triggering navigation or a Next.js Suspense requirement — this section
  // lives on the static homepage, so plain history.replaceState keeps state
  // shareable/bookmarkable while staying off the static-render critical path.
  // (Initial read happens in the lazy useState initializers above, not here,
  // so this effect only ever writes — it never calls setState.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("work_q", query.trim());
    else params.delete("work_q");
    if (active !== "All") params.set("work_cat", active);
    else params.delete("work_cat");
    const search = params.toString();
    const url = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, [query, active]);

  const ordered = useMemo(
    () => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ordered.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (!q) return true;
      return [p.name, p.tagline, p.summary, ...p.stack].join(" ").toLowerCase().includes(q);
    });
  }, [ordered, query, active]);

  const filtering = active !== "All" || query.trim() !== "";

  return (
    <Section id="work">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Systems built to be <span className="text-gradient-copper">understood</span>.
          </>
        }
        lead="Infrastructure, tooling, and runtimes — each shipped as real, public software. Search by name or stack, or filter by discipline."
      />

      {/* Controls */}
      <div className="mt-12 flex flex-col gap-6 md:mt-16">
        <div className="relative max-w-md">
          <label htmlFor={searchId} className="sr-only">
            Search projects by name, description, or stack
          </label>
          <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
          </span>
          <input
            id={searchId}
            type="search"
            name="work_q"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, e.g. “Go” or “observability”…"
            className="w-full rounded-full border border-hairline bg-surface/50 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint transition-colors duration-300 focus-visible:border-copper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-copper/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={isActive}
                className={[
                  "inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 font-mono text-xs tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright",
                  isActive
                    ? "border-copper bg-copper/15 text-copper-bright"
                    : "border-hairline bg-surface/40 text-ink-dim hover:border-hairline-strong hover:text-ink",
                ].join(" ")}
              >
                {f}
              </button>
            );
          })}
        </div>

        <p className="font-mono text-xs text-ink-faint" aria-live="polite">
          {results.length} / {projects.length} {results.length === 1 ? "project" : "projects"}
          {filtering && " matching"}
        </p>
      </div>

      {/* Grid */}
      <motion.div
        layout={!reduce}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {results.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 && !filtering ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {results.length === 0 && (
        <div className="mt-4 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-hairline bg-surface/30 p-10 text-left">
          <p className="font-display text-2xl text-ink">No projects match that.</p>
          <p className="max-w-md text-pretty text-ink-dim">
            Try a broader term or a different discipline — every project is public and searchable by name, summary, or stack.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("");
              setActive("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Footer link */}
      <div className="mt-16 flex justify-center">
        <Button href="/work" variant="outline">
          View all work
        </Button>
      </div>
    </Section>
  );
}
