import type { JourneyEntry } from "@/lib/types";

/**
 * Timeline reconstructed from the public commit/build history of
 * github.com/archdex-art — an intense, self-directed build arc across
 * AI infrastructure, developer tooling, and systems programming.
 */
export const journey: JourneyEntry[] = [
  {
    period: "2026 — Present",
    title: "Independent Engineer",
    org: "AI Systems & Developer Tooling",
    summary:
      "Designing and shipping infrastructure-grade tools end to end — architecture, implementation, security hardening, CI, docs, and deployment — across four languages and three runtimes.",
    highlights: [
      "Shipped AgentMesh: a framework-agnostic control plane for AI agents (Go, OTel, ClickHouse) through 8 complete milestones.",
      "Launched CodeGraph live on Render — a deterministic 7-agent code-remediation swarm with 96/96 tests and zero LLM dependency.",
      "Built SuperSearch, a Rust/Tauri intent-driven runtime for macOS with an object-capability security model.",
    ],
    tags: ["Go", "Rust", "TypeScript", "Python", "Systems Design"],
  },
  {
    period: "2026 · Q2–Q3",
    title: "Runtime & Systems Programming",
    org: "SuperSearch",
    summary:
      "Went deep on native systems: a Rust runtime kernel that compiles natural-language intents into replayable task graphs and drives macOS through a capability-mediated, argv-only execution path.",
    highlights: [
      "Designed a capability gate + append-only journal enforced on the live execution path.",
      "Built a WASM plugin host (wasmtime) with fuel and memory limits for sandboxed third-party extensions.",
      "Crafted a Spotlight-grade command palette in React + Framer Motion over Tauri IPC.",
    ],
    tags: ["Rust", "Tauri", "WASM", "Security", "Motion"],
  },
  {
    period: "2026 · Q2",
    title: "Developer Intelligence",
    org: "CodeGraph & CodeGraph Local",
    summary:
      "Built a symbol-level code knowledge graph and a deterministic remediation swarm — first as a hosted Next.js app, then as a fully standalone, offline VS Code extension.",
    highlights: [
      "Implemented Tarjan SCC + BFS graph analysis and a blast-radius-weighted, explainable health score.",
      "Engineered a verify-before-apply fixer: sandbox → codemod → re-index → unified diff.",
      "Published a self-audit (3/10 → 8/10) and a follow-up 99-issue security review in the open.",
    ],
    tags: ["TypeScript", "Next.js", "Static Analysis", "Agents"],
  },
  {
    period: "2026 · Q1–Q2",
    title: "AI Infrastructure",
    org: "AgentMesh",
    summary:
      "Architected observability, deterministic replay, and MCP governance for AI agents — infrastructure any agent framework plugs into via OpenTelemetry.",
    highlights: [
      "Designed a schema-as-source-of-truth data model over ClickHouse + Postgres + Redis + MinIO.",
      "Built framework adapters for LangGraph, CrewAI, AutoGen, and the OpenAI Agents SDK.",
      "Implemented a replay engine that reproduces historical agent failures exactly.",
    ],
    tags: ["Go", "OpenTelemetry", "Distributed Systems", "MCP"],
  },
  {
    period: "2025 — 2026",
    title: "Browser Platforms & Diagnostics",
    org: "Research & Extensions",
    summary:
      "Explored the browser as a platform for intelligence and diagnostics — local-first knowledge graphs, network forensics, and privacy-preserving AI.",
    highlights: [
      "Built Live API Inspector, a privacy-first DevTools network intelligence HUD.",
      "Built Browser Memory AI: hybrid FTS + vector recall over everything you read.",
      "Designed local secret redaction so AI analysis never sees raw credentials.",
    ],
    tags: ["TypeScript", "React", "IndexedDB", "Manifest V3"],
  },
];
