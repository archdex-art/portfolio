import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { StatusPill, Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  const metric = project.metrics[0];
  const stack = project.stack.slice(0, 3);

  return (
    <article className="group relative h-full">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.name} — ${project.tagline}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-copper/50 hover:bg-surface/70 hover:shadow-[0_28px_80px_-32px_rgba(224,101,58,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-bright motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {/* Cover */}
        <div className="relative overflow-hidden">
          <ProjectVisual
            slug={project.slug}
            accent={project.accent}
            className="aspect-[16/10] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <StatusPill status={project.status} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
          <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <div>
            <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-copper-bright md:text-[1.7rem]">
              {project.name}
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-dim md:text-[0.95rem]">
              {project.tagline}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {metric && (
            <div className="flex items-end justify-between border-t border-hairline pt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl leading-none text-ink">{metric.value}</span>
                <span className="text-xs leading-tight text-ink-faint">{metric.label}</span>
              </div>
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-copper group-hover:text-copper motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
