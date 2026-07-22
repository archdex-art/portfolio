import Link from "next/link";
import type { Project } from "@/lib/types";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Tag, StatusPill } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { RelatedCard } from "@/components/work/RelatedCard";

function relatedProjects(project: Project): Project[] {
  const others = projects.filter((p) => p.slug !== project.slug);
  const sameCategory = others.filter((p) => p.category === project.category);
  const rest = others.filter((p) => p.category !== project.category);
  return [...sameCategory, ...rest].slice(0, 2);
}

export function CaseStudy({ project }: { project: Project }) {
  const related = relatedProjects(project);

  return (
    <article className="pt-28">
      {/* Hero header */}
      <header className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="glow-copper anim-drift absolute -right-32 -top-20 h-[30rem] w-[30rem] rounded-full" />
        </div>
        <div className="shell py-16 md:py-24">
          <Reveal>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-xs text-ink-dim transition-colors hover:text-copper"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              >
                <path
                  d="M13 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-8 flex flex-wrap items-center gap-3">
            <StatusPill status={project.status} />
            <span className="eyebrow">{project.category}</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-ink-dim md:text-2xl">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-ink-faint">
            <span>
              <span className="text-ink-dim">Year</span> · {project.year}
            </span>
            <span>
              <span className="text-ink-dim">Role</span> · {project.role}
            </span>
            <span>
              <span className="text-ink-dim">Language</span> · {project.primaryLanguage}
            </span>
          </Reveal>

          <Reveal delay={0.25} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={project.repo} variant="primary" external>
              View repository
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            {project.demo && (
              <Button href={project.demo} variant="outline" external>
                Live demo
              </Button>
            )}
            {project.links.map((link) => (
              <Button key={link.href} href={link.href} variant="ghost" external>
                {link.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </header>

      {/* Banner visual */}
      <div className="shell">
        <Reveal>
          <ProjectVisual
            slug={project.slug}
            accent={project.accent}
            label={project.name}
            className="aspect-[16/8] w-full rounded-2xl border border-hairline"
          />
        </Reveal>
      </div>

      {/* Metrics strip */}
      {project.metrics.length > 0 && (
        <div className="shell mt-16 md:mt-24">
          <Reveal>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-2 bg-surface/60 p-8">
                  <dt className="order-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                    {metric.label}
                  </dt>
                  <dd className="order-1 font-display text-4xl leading-none text-copper-bright md:text-5xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      )}

      {/* Problem + Approach */}
      <section className="shell mt-20 grid gap-12 md:mt-32 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <span className="eyebrow">The problem</span>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-dim">{project.problem}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <span className="eyebrow">The approach</span>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-dim">{project.approach}</p>
          </div>
        </Reveal>
      </section>

      <div className="shell mt-20 md:mt-32">
        <div className="hairline-x" />
      </div>

      {/* Challenges */}
      {project.challenges.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ink-faint">01</span>
              <span className="eyebrow">Engineering challenges</span>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {project.challenges.map((challenge, i) => (
              <Reveal as="div" key={challenge.heading} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-hairline bg-surface/40 p-7">
                  <h3 className="font-display text-2xl leading-tight text-ink">{challenge.heading}</h3>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-dim">{challenge.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {project.results.length > 0 && (
        <section className="shell mt-20 md:mt-32">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ink-faint">02</span>
              <span className="eyebrow">Results</span>
            </div>
          </Reveal>
          <ul className="mt-10 flex flex-col">
            {project.results.map((result, i) => (
              <Reveal as="li" key={result} delay={i * 0.05}>
                <div className="flex gap-5 border-t border-hairline py-6">
                  <span className="mt-1 font-mono text-xs text-copper" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty text-lg leading-relaxed text-ink-dim">{result}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Architecture */}
      <section className="shell mt-20 md:mt-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink-faint">03</span>
            <span className="eyebrow">Architecture</span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8 rounded-xl border border-hairline bg-surface-2/50 p-8 md:p-10">
            <p className="text-pretty font-mono text-sm leading-relaxed text-ink-dim md:text-[0.95rem]">
              {project.architecture}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Stack */}
      <section className="shell mt-20 md:mt-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink-faint">04</span>
            <span className="eyebrow">Built with</span>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="mt-8 flex flex-wrap gap-2.5">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </Reveal>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="shell mt-24 md:mt-36">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="eyebrow">Related work</span>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <Reveal as="div" key={p.slug} delay={i * 0.08}>
                <RelatedCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="shell mt-24 md:mt-36 mb-32">
        <div className="hairline-x" />
        <Reveal className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-xl text-balance font-display text-3xl leading-tight text-ink md:text-4xl">
              Have a system that needs building right?
            </h2>
            <p className="mt-3 text-ink-dim">{site.availability}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/work" variant="outline">
              Back to all work
            </Button>
            <Button href={`mailto:${site.email}`} variant="primary" external>
              Start a conversation
            </Button>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
