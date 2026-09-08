import type { SkillGroup, Recognition } from "@/lib/types";

/**
 * Proficiency is self-assessed relative to the evidence in the public repos.
 * Levels are 0–100 and drive the visualization only.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: "Systems & Backend",
    blurb: "Services, runtimes, and the data tiers under them.",
    skills: [
      { name: "Go", level: 90 },
      { name: "Rust", level: 84 },
      { name: "Python", level: 88 },
      { name: "gRPC / Protobuf", level: 82 },
      { name: "ClickHouse", level: 78 },
      { name: "Postgres", level: 84 },
    ],
  },
  {
    name: "Frontend & Product",
    blurb: "Interfaces that feel like products, not dashboards.",
    skills: [
      { name: "TypeScript", level: 94 },
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
      { name: "Tauri", level: 80 },
    ],
  },
  {
    name: "AI & Intelligence",
    blurb: "Agents, retrieval, and models — with determinism where it counts.",
    skills: [
      { name: "Agent Orchestration", level: 88 },
      { name: "OpenTelemetry", level: 82 },
      { name: "Model Context Protocol", level: 84 },
      { name: "RAG / Hybrid Search", level: 83 },
      { name: "Embedding Pipelines", level: 81 },
      { name: "Graph Analysis", level: 86 },
    ],
  },
  {
    name: "Platform & Craft",
    blurb: "Shipping: security, CI, containers, and honest docs.",
    skills: [
      { name: "Security Hardening", level: 85 },
      { name: "Docker", level: 86 },
      { name: "CI/CD", level: 84 },
      { name: "WASM", level: 76 },
      { name: "Testing & Coverage", level: 83 },
      { name: "Technical Writing", level: 88 },
    ],
  },
];

/** Built from real, verifiable signals in the repositories — no invented quotes. */
export const recognition: Recognition[] = [
  {
    kind: "Live product",
    title: "CodeGraph running in production",
    detail: "A hosted instance on Render indexes any public GitHub repo in under a minute — a real, running product, not a design doc.",
    href: "https://codegraph-8qqc.onrender.com",
  },
  {
    kind: "Zero false accusations",
    title: "land: 84 verified, 1 contradicted, 0 wrong",
    detail: "Reconciled against land's own 18-session development corpus — the two false positives found during development are documented as regression tests, not silently fixed.",
    href: "https://github.com/archdex-art/land",
  },
  {
    kind: "Byte-identical, 100% coverage",
    title: "PRAMAAN: 100% branch coverage, reproducible verdicts",
    detail: "488 offline tests plus 620 against a live PostGIS instance; every verdict re-derives identically from its own lineage on demand — built for Smart India Hackathon 2026, PS 26015.",
    href: "https://github.com/archdex-art/pramaan-sih26015",
  },
  {
    kind: "Reliability",
    title: "96/96 tests passing on CodeGraph",
    detail: "Security, indexer, code-intelligence, executor, layout, and tenant-isolation suites, with an adversarial Docker smoke test on every push.",
    href: "https://github.com/archdex-art/CodeGraph",
  },
  {
    kind: "Security in the open",
    title: "Self-audited 3/10 → 8/10, then published a 99-issue review",
    detail: "CodeGraph audits itself and publishes the results rather than hiding them — hardening tracked openly with postmortems.",
    href: "https://github.com/archdex-art/CodeGraph/blob/main/ARCHITECTURE.md",
  },
  {
    kind: "Milestones",
    title: "AgentMesh: 8 of 8 milestones complete",
    detail: "Foundation, OTLP collection, query API, framework adapters, console, auth, MCP governance, replay, anomaly detection, and Helm charts.",
    href: "https://github.com/archdex-art/AgentMesh",
  },
  {
    kind: "Verified benchmark",
    title: "31 verified fixes across 27 files on expressjs/express",
    detail: "CodeGraph's sandboxed fixer produced a real, applyable unified diff with a re-indexed (not projected) health-score gain.",
    href: "https://github.com/archdex-art/CodeGraph/blob/main/app/AGENTS.md",
  },
  {
    kind: "GitHub",
    title: "Pull Shark · Pair Extraordinaire",
    detail: "GitHub achievements earned across an active, multi-language open-source portfolio spanning Go, Rust, TypeScript, and Python.",
    href: "https://github.com/archdex-art",
  },
];

/** Marquee of core technologies for the hero/ticker. */
export const techMarquee = [
  "Go", "Rust", "TypeScript", "Python", "Next.js", "React", "Tauri",
  "OpenTelemetry", "ClickHouse", "Postgres", "WASM", "Vector Search",
  "Model Context Protocol", "Docker", "Tailwind", "Framer Motion",
];
