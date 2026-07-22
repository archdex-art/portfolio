import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { StatusPill } from "@/components/ui/Tag";

/**
 * Compact project card used to surface related work at the foot of a case
 * study and within the all-work index. Owns its own markup — deliberately
 * distinct from the featured ProjectCard.
 */
export function RelatedCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface/40 transition-colors duration-300 hover:border-copper/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-bright"
    >
      <ProjectVisual
        slug={project.slug}
        accent={project.accent}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
            {project.category}
          </span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-copper-bright">
          {project.name}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-ink-dim">{project.tagline}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-xs text-copper">
          Read case study
          <svg
            width="14"
            height="14"
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
        </span>
      </div>
    </Link>
  );
}
