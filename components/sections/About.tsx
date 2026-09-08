import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { projects, getProject } from "@/lib/data/projects";

const agentmesh = getProject("agentmesh");
const codegraph = getProject("codegraph");

const languages = ["Go", "Rust", "TypeScript", "Python"] as const;

const stats = [
  { value: `${projects.length}`, label: "projects shipped, end to end" },
  { value: `${languages.length}`, label: "languages — Go · Rust · TS · Python" },
  { value: agentmesh?.metrics[0]?.value ?? "8/8", label: "AgentMesh milestones complete" },
  { value: codegraph?.metrics[0]?.value ?? "96/96", label: "CodeGraph tests passing" },
];

const principles = [
  {
    kicker: "P01",
    title: "Determinism over magic",
    body: "CodeGraph's seven-agent remediation swarm runs with zero LLM keys, and SuperSearch compiles natural language into replayable execution graphs. Same input, same result — every run.",
  },
  {
    kicker: "P02",
    title: "Security in the open",
    body: "Self-audits get published, not buried. CodeGraph's posture is tracked openly from a 3/10 baseline to 8/10, with a follow-up 99-issue audit shipped in the clear rather than hidden.",
  },
  {
    kicker: "P03",
    title: "Verify before apply",
    body: "The fixer clones to a disposable sandbox, applies a codemod, re-indexes, and only emits an applyable git diff if the health score doesn't regress. Sandbox → codemod → re-index → diff.",
  },
  {
    kicker: "P04",
    title: "Ship the whole thing",
    body: "Research isn't done until it deploys. From AgentMesh's Helm charts to CodeGraph running live on Render, the work carries its own CI, docs, containers, and deploy path.",
  },
];

const strengths = [
  { name: "Systems architecture", note: "Stateless services, typed data tiers, clear module boundaries.", proof: "AgentMesh" },
  { name: "AI infrastructure", note: "Observability, deterministic replay, and MCP governance for agents.", proof: "AgentMesh" },
  { name: "Developer experience", note: "Tools that read like products — Monaco editors, HUDs, command palettes.", proof: "CodeGraph" },
  { name: "Security engineering", note: "Capability gates, redaction layers, argv-only execution, open audits.", proof: "SuperSearch" },
  { name: "Shipping solo", note: "Sole architect across backend, frontend, ML, and deploy.", proof: "8/8 done" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <span className="font-display italic tracking-[-0.02em]">
            Infrastructure-grade tools, built end to end.
          </span>
        }
        lead="An independent engineer who owns every layer — from the runtime kernel to the deploy pipeline — and refuses to hand off the hard parts."
      />

      {/* Story + pull-quote: asymmetric grid */}
      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-ink-dim">
            <p>
              I&rsquo;m Koushik Gaddam — I build under the name Archdex. I design and ship <span className="text-ink">infrastructure-grade tools end to end</span> —
              no team to hand the difficult parts to, no layer I don&rsquo;t own. From a Go control plane for AI agents to a
              Rust runtime kernel that drives macOS, I work across the whole stack in{" "}
              <span className="text-ink">Go, Rust, TypeScript, and Python</span>.
            </p>
            <p>
              The through-line is systems that stay honest about what they do. AgentMesh gives every agent run a deterministic
              replay. CodeGraph turns a repository into a symbol-level knowledge graph and verifiably fixes real issues without an
              LLM key. SuperSearch compiles intent into inspectable execution graphs behind a capability gate. Different domains —
              the same discipline.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <figure className="relative h-full rounded-xl border border-hairline bg-surface/50 p-8">
            <span
              aria-hidden
              className="absolute left-6 top-3 font-display text-6xl leading-none text-copper/25"
            >
              &ldquo;
            </span>
            <blockquote className="relative mt-6 font-display text-2xl leading-snug text-ink md:text-3xl">
              Infrastructure, not another framework.
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5 font-mono text-xs uppercase tracking-widest text-ink-faint">
              <span className="h-px w-8 bg-copper" aria-hidden />
              The AgentMesh thesis
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Philosophy */}
      <div className="mt-24 border-t border-hairline pt-16">
        <Reveal className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-ink-faint">02</span>
          <span className="eyebrow">Engineering philosophy</span>
        </Reveal>

        <Reveal
          as="div"
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2"
        >
          {principles.map((p) => (
            <article key={p.kicker} className="bg-surface/60 p-8 transition-colors duration-500 hover:bg-surface-2">
              <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-copper">
                {p.kicker}
                <span className="h-px flex-1 bg-hairline" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink md:text-2xl">{p.title}</h3>
              <p className="mt-4 text-pretty leading-relaxed text-ink-dim">{p.body}</p>
            </article>
          ))}
        </Reveal>
      </div>

      {/* Strengths */}
      <div className="mt-24 border-t border-hairline pt-16">
        <Reveal className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-ink-faint">03</span>
          <span className="eyebrow">What I bring</span>
        </Reveal>

        <ol className="mt-10 divide-y divide-hairline border-y border-hairline">
          {strengths.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.05}>
              <div className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-12">
                <span className="font-mono text-xs text-ink-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-copper-bright md:col-span-4 md:text-3xl">
                  {s.name}
                </h3>
                <p className="text-pretty leading-relaxed text-ink-dim md:col-span-5">{s.note}</p>
                <span className="justify-self-start font-mono text-[0.7rem] uppercase tracking-widest text-copper md:col-span-2 md:justify-self-end">
                  {s.proof}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Stat strip */}
      <Reveal
        as="div"
        delay={0.05}
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-surface/60 px-6 py-8">
            <div className="font-display text-4xl text-ink md:text-5xl">
              <span className="text-gradient-copper">{s.value}</span>
            </div>
            <div className="mt-3 font-mono text-[0.7rem] uppercase leading-relaxed tracking-widest text-ink-faint">
              {s.label}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
