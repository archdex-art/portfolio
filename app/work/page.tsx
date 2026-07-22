import type { Metadata } from "next";
import Link from "next/link";
import { projects, categories } from "@/lib/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RelatedCard } from "@/components/work/RelatedCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering — AI-systems infrastructure, developer tooling, runtimes, and browser extensions. Every project is a real, public repository.",
};

export default function WorkPage() {
  const grouped = categories
    .map((category) => ({
      category,
      items: projects.filter((p) => p.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="pt-28">
      <Section>
        <Reveal>
          <Link
            href="/"
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
            Home
          </Link>
        </Reveal>

        <SectionHeading
          as="h1"
          className="mt-8"
          eyebrow="The full archive"
          title={<>Selected work</>}
          lead="Every project below is a real, public repository — AI-systems infrastructure, developer tooling, runtimes, and the occasional browser extension. Grouped by discipline."
        />

        <div className="mt-20 flex flex-col gap-24">
          {grouped.map((group) => (
            <div key={group.category}>
              <Reveal className="flex items-baseline justify-between gap-4 border-b border-hairline pb-5">
                <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">{group.category}</h2>
                <span className="font-mono text-xs text-ink-faint">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((project, i) => (
                  <Reveal as="div" key={project.slug} delay={i * 0.06}>
                    <RelatedCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
