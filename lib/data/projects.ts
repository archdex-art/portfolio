import type { Project, Category } from "@/lib/types";

/**
 * Every project below is a real, public repository under github.com/archdex-art.
 * Facts (stacks, metrics, architecture) are drawn directly from each repo's README.
 */
export const projects: Project[] = [
  {
    slug: "agentmesh",
    name: "AgentMesh",
    tagline: "A control plane for AI agents",
    summary:
      "Framework-agnostic observability, deterministic replay, and MCP governance for AI agents — see every decision, replay any failure exactly, and govern every tool call without rewriting your stack.",
    category: "AI Infrastructure",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Shipped",
    featured: true,
    primaryLanguage: "Go",
    stack: ["Go", "OpenTelemetry", "ClickHouse", "Postgres", "Redis", "MinIO", "gRPC", "React", "Python SDK", "TypeScript SDK"],
    repo: "https://github.com/archdex-art/Agent-Mesh",
    links: [{ label: "Runbook", href: "https://github.com/archdex-art/Agent-Mesh/blob/main/docs/RUNBOOK.md" }],
    metrics: [
      { value: "8/8", label: "milestones complete" },
      { value: "5", label: "stateless Go services" },
      { value: "4", label: "framework adapters" },
    ],
    accent: "copper",
    problem:
      "Teams building on LangGraph, CrewAI, AutoGen, or the OpenAI Agents SDK have no unified way to see what their agents actually did, reproduce a failure, or enforce policy on the tools those agents call. Observability is bolted on per-framework, replay is impossible, and MCP servers are ungoverned.",
    approach:
      "AgentMesh is infrastructure, not another agent framework. It sits alongside agent workloads as a sidecar/control-plane: SDKs emit OTLP spans capturing the full DAG of a run; a Go collector authenticates and writes them to ClickHouse; a query API serves traces, cost, and anomalies; an MCP gateway proxies tool calls with auth, audit, and guardrail policy; and a replay engine re-runs any historical trace by injecting recorded tool outputs.",
    challenges: [
      {
        heading: "Framework-agnostic tracing",
        body: "Rather than instrument each framework, the SDKs speak OpenTelemetry with a documented wire contract (otlp-mapping.md). One collector ingests spans regardless of what produced them — capturing token usage, latency, and agent-to-tool handoffs across LangGraph, CrewAI, AutoGen, and OpenAI runs.",
      },
      {
        heading: "Deterministic replay",
        body: "Re-running an agent against live tools is non-deterministic and expensive. The replay engine records tool responses at trace time and injects them on replay, so a historical failure reproduces exactly — a massive time-saver for debugging edge cases and iterating on prompts.",
      },
      {
        heading: "Governance without rewrites",
        body: "The MCP gateway proxies any Model Context Protocol server, issuing OAuth 2.1-style tokens and applying guardrail policies globally. Teams govern tool access without touching agent code.",
      },
    ],
    results: [
      "Milestones 1–8 complete: foundation, OTLP collection, query API, framework adapters, web console, auth, MCP governance, replay, anomaly detection, alerting, and Helm charts.",
      "Monorepo with clear boundaries: independently deployable Go services, Python + TypeScript SDKs, a Go CLI, and a React/TypeScript console.",
      "Schema-as-source-of-truth data model across ClickHouse (telemetry) and Postgres (control plane), with migrations applied automatically on first container start.",
      "Per-agent, per-tool, per-user cost tracking with automatic loop/spike detection and threshold alerting.",
    ],
    architecture:
      "Stateless Go services (collector, query-api, mcp-gateway, anomaly-detector, alerting-service, replay-engine) over a data tier of Postgres (control-plane state), ClickHouse (high-volume spans + rollups), Redis (live span pub/sub), and MinIO (large I/O payload blobs). SDKs emit OTLP; the collector authenticates and persists; the console reads through the query API.",
  },
  {
    slug: "codegraph",
    name: "CodeGraph",
    tagline: "A knowledge graph that fixes its own repo",
    summary:
      "Turns a git repo into a symbol-level knowledge graph, then runs a deterministic swarm of specialist agents to find and verifiably fix real issues — no LLM API key required.",
    category: "Developer Tools",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Live",
    featured: true,
    primaryLanguage: "TypeScript",
    stack: ["TypeScript", "Next.js", "node:sqlite", "Tree-sitter", "Monaco", "Docker", "Render"],
    repo: "https://github.com/archdex-art/CodeGraph",
    demo: "https://codegraph-8qqc.onrender.com",
    links: [
      { label: "Architecture", href: "https://github.com/archdex-art/CodeGraph/blob/main/ARCHITECTURE.md" },
      { label: "Code Intelligence", href: "https://github.com/archdex-art/CodeGraph/blob/main/app/CODE_INTELLIGENCE.md" },
    ],
    metrics: [
      { value: "96/96", label: "tests passing" },
      { value: "7", label: "specialist agents" },
      { value: "0", label: "LLM keys needed" },
    ],
    accent: "sage",
    problem:
      "Code-health tools either search at scale (Sourcegraph) or answer questions over embeddings (vector-RAG chat), but none build a persistent, typed, queryable structure that a deterministic pipeline can reason over — and verify fixes against — without paying for or depending on an LLM.",
    approach:
      "One Next.js app backed by a single SQLite file. Point it at any public repo (or sign in with GitHub for private ones); it clones, builds a symbol-level knowledge graph, scores health (blast-radius-weighted, explainable), and offers three visualizations, a queryable code-intelligence layer, a 7-agent remediation swarm with a sandboxed fixer, and a built-in Git-integrated Monaco editor.",
    challenges: [
      {
        heading: "Determinism over LLMs",
        body: "Every specialist agent (Security, Performance, Refactor, Dead-code, Dependency, Architecture, Test) is deterministic — no LLM call, no non-determinism between runs on the same repo. A Critic dedupes findings by locus and cross-corroborates; a Judge scores severity × log(blastRadius) × confidence × effortBonus into P0–P3.",
      },
      {
        heading: "Verified fixes, not suggestions",
        body: "The Fixer clones to a disposable sandbox, applies a safe codemod, RE-INDEXES, and requires the health score not to regress before emitting a real, applyable unified git diff. On expressjs/express this produced 31 real fixes across 27 files with an actual re-indexed score gain.",
      },
      {
        heading: "Surviving 512MB",
        body: "Tree-sitter parsing OOM-killed the server on Render's Starter tier. After a documented postmortem and fix, the full pipeline now indexes octocat/Hello-World and expressjs/express end-to-end inside a container capped at --memory=512m --cpus=0.5, verified by an adversarial Docker smoke test on every push.",
      },
    ],
    results: [
      "Live instance running on Render; paste any public GitHub URL and watch it index in under a minute.",
      "Symbol graph on expressjs/express: 123 symbols, 94 edges, 14 real call cycles, 49 unreferenced functions flagged.",
      "Self-audited security posture tracked openly: baseline 3/10 → 8/10 after hardening, with a follow-up 99-issue audit published rather than hidden.",
      "96/96 tests across security, indexer, codeintel, executor, layout, and tenant-isolation suites.",
    ],
    architecture:
      "Browser (Next.js client) → thin API routes → backend libs → SQLite, with jobs run fire-and-forget in the same Node process (no external queue, vector DB, or Postgres). indexer.ts clones/scans/scores; codeintel/* builds the symbol graph, QueryEngine, and Graph-RAG; agents/* runs 7 specialists → critic → judge → fixer; workspace.ts + gitops.ts give path-safe fs ops and argv-only git.",
  },
  {
    slug: "supersearch",
    name: "SuperSearch",
    tagline: "An intent-driven runtime for macOS",
    summary:
      "Not a launcher — an intent-driven runtime kernel that parses natural language into replayable execution graphs and drives macOS autonomously, behind a capability-gated security model.",
    category: "Runtime & Systems",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Active",
    featured: true,
    primaryLanguage: "Rust",
    stack: ["Rust", "Tauri", "React", "TypeScript", "Framer Motion", "wasmtime", "AppleScript"],
    repo: "https://github.com/archdex-art/SuperSearch",
    demo: "https://archdex-art.github.io/supersearch-site/",
    links: [
      { label: "Landing site", href: "https://archdex-art.github.io/supersearch-site/" },
      { label: "Security model", href: "https://github.com/archdex-art/SuperSearch/blob/main/docs/security.md" },
    ],
    metrics: [
      { value: "⌥Space", label: "global summon" },
      { value: "15s", label: "hard action timeout" },
      { value: "WASM", label: "sandboxed plugins" },
    ],
    accent: "amber",
    problem:
      "Traditional launchers (Raycast, Alfred) are search bars with extensions. They can't take a natural-language intent like 'open brave in incognito and search what is regression' and autonomously synthesize and execute the multi-step sequence across the OS — safely.",
    approach:
      "A three-layer native macOS app: a React + Tailwind + Framer Motion command palette (Spotlight-grade motion) over a Tauri host that owns hotkeys and window management, over a Rust runtime kernel that classifies intents, compiles them into DAG-based task graphs, and executes them by spawning OS binaries directly with argument vectors.",
    challenges: [
      {
        heading: "Deterministic, replayable intents",
        body: "A rule-based classifier (patterns.rs) maps natural language to a closed set of intents; a planner compiles them into inspectable TaskGraph DAGs; an executor drives macOS via argv-only process spawns (open, mdfind, osascript) with a hard per-action timeout. Every query becomes a replayable, inspectable graph.",
      },
      {
        heading: "Capability-mediated execution",
        body: "Before any OS action runs, the executor maps it to a required (Namespace, Permission) and asks the CapabilityGate whether the agent's revocable token authorizes it. A denied action never spawns a process. Enforced on the live path and covered by the test action_without_capability_is_blocked_before_touching_the_os.",
      },
      {
        heading: "No shell interpolation of user input",
        body: "Every action carrying user-derived data is executed by spawning the target binary with an argument vector — never by building a string for sh -c. Shell metacharacters are inert; AppleScript values bind as `on run argv` items, not interpolated into source.",
      },
    ],
    results: [
      "Object-capability security model on the live execution path, with an append-only journal giving a replayable audit trail of every gate decision and OS result.",
      "Extensible via capability-gated, consent-based plugins — script extensions (argv, 10s timeout) and sandboxed WASM modules via wasmtime with fuel + memory limits.",
      "Fully local intent classification — app launches and file lookups never leave the machine.",
      "Ships as a native menu-bar app with a companion marketing site built in Vite + React 19 + Framer Motion.",
    ],
    architecture:
      "react-command-palette (Vite bundle loaded by Tauri as frontendDist) ⇄ Tauri IPC ⇄ src-tauri host (global hotkeys, fuzzy search, AppleScript dispatch) ⇄ crates/supersearch-runtime (patterns.rs classifier → planner.rs TaskGraph → executor.rs argv spawns, with capability/, journal/, scheduler/, reactive/, and plugin/ WASM host).",
  },
  {
    slug: "live-api-inspector",
    name: "Live API Inspector",
    tagline: "A diagnostic HUD for network traffic",
    summary:
      "An AI-powered, local-first Chrome DevTools extension that captures network traffic, clusters endpoints by business domain, detects performance waste, and replays or exports requests instantly.",
    category: "Browser Extensions",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Active",
    featured: true,
    primaryLanguage: "TypeScript",
    stack: ["TypeScript", "React 19", "Vite", "Tailwind CSS v4", "Manifest V3", "IndexedDB", "Dexie"],
    repo: "https://github.com/archdex-art/live-api-inspector",
    links: [],
    metrics: [
      { value: "0-config", label: "DevTools install" },
      { value: "Local", label: "first / redacted" },
      { value: "3", label: "export targets" },
    ],
    accent: "rust",
    problem:
      "Generic 'SaaS dashboard' network tools drop chronological request soup on you with no semantics, leak secrets into any AI analysis, and make replay/export a chore.",
    approach:
      "A native DevTools extension built on the Chrome Debugger API that captures fetch/XHR/WebSocket traffic into IndexedDB, then applies semantic clustering, performance intelligence, and an AI root-cause analyzer — all behind a strict local-first privacy model, wrapped in a deliberate 'Technical Noir' diagnostic-HUD aesthetic.",
    challenges: [
      {
        heading: "Privacy-first AI",
        body: "API secrets — bearer tokens, passwords, AWS keys — are locally redacted by a regex engine before anything touches an AI prompt. Storage is IndexedDB under a strict CSP; nothing leaves the machine unredacted.",
      },
      {
        heading: "Semantics over chronology",
        body: "Endpoints like /users/1 and /cart/add are intelligently grouped into readable business workflows (User Management, Shopping Cart) instead of a flat chronological list.",
      },
      {
        heading: "Actionable diagnostics",
        body: "It detects duplicate request waterfalls, computes wasted bandwidth and estimated wasted execution time, and for HTTP 400+ cross-references request payloads against response bodies to diagnose schema mismatches and missing auth.",
      },
    ],
    results: [
      "Replay requests with environment-variable substitution ({{token}}); export live traffic to cURL, JavaScript fetch, or Postman collections.",
      "Decoupled EventBus + PluginManager architecture for extensibility.",
      "Distinctive 'Technical Noir' UI: Instrument Serif + IBM Plex Mono, deep-void background with amber/phosphor glow, scanlines, and a Cmd+K command palette.",
    ],
    architecture:
      "Manifest V3 extension: a background service worker drives the Chrome Debugger API, a decoupled EventBus/PluginManager mediates capture, an AI gateway with a redaction layer performs clustering/performance/root-cause analysis, and a React 19 DevTools panel renders the HUD over Dexie-backed IndexedDB storage.",
  },
  {
    slug: "browser-memory-ai",
    name: "Browser Memory AI",
    tagline: "A knowledge graph for everything you browse",
    summary:
      "A local-first browser extension that turns your browsing into a searchable knowledge graph — entity extraction, an embedding pipeline, and hybrid full-text + vector search behind a plugin SDK.",
    category: "Browser Extensions",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Active",
    featured: false,
    primaryLanguage: "TypeScript",
    stack: ["TypeScript", "Manifest V3", "IndexedDB", "Vector search", "compromise NLP", "Vite"],
    repo: "https://github.com/archdex-art/browser-memory-ai",
    links: [
      { label: "System architecture", href: "https://github.com/archdex-art/browser-memory-ai/blob/main/docs/architecture/SYSTEM_ARCHITECTURE.md" },
    ],
    metrics: [
      { value: "Hybrid", label: "FTS + vector" },
      { value: "Local", label: "first storage" },
      { value: "SDK", label: "pluggable sources" },
    ],
    accent: "ink",
    problem:
      "Everything you learn while browsing evaporates. Bookmarks are flat, history is unsearchable by meaning, and no tool builds durable, queryable memory across the pages you actually read.",
    approach:
      "A Manifest V3 extension that captures page content, chunks it, extracts entities, embeds it through a pipeline, and stores it in IndexedDB — then serves recall through hybrid search that fuses full-text and vector similarity, with a plugin SDK for site-specific extractors (GitHub, generic web).",
    challenges: [
      {
        heading: "Hybrid retrieval",
        body: "A search layer (search/fts.ts, search/vector.ts, search/hybrid.ts) fuses lexical full-text and semantic vector results so recall works whether you remember the exact words or only the gist.",
      },
      {
        heading: "Structured extraction",
        body: "An AI layer handles chunking, entity extraction, session grouping, and RAG assembly (ai/chunking.ts, ai/entities.ts, ai/sessions.ts, ai/rag.ts) to build a domain model rather than a text dump.",
      },
      {
        heading: "Extensible by design",
        body: "A plugin SDK (plugins/sdk.ts) lets site-specific extractors (github.ts, generic-web.ts) contribute structured signals, backed by a documented architecture corpus spanning storage strategy, embedding pipeline, and the knowledge graph.",
      },
    ],
    results: [
      "Local-first privacy model with a security/privacy layer and an offscreen document for background work.",
      "Deep architecture, engineering, and product documentation (PRD, hardening report, performance, testing strategy).",
      "Pluggable capture across generic web pages and GitHub with a shared SDK contract.",
    ],
    architecture:
      "Content scripts + offscreen document capture page data → AI layer (chunking, entities, sessions, RAG) → dual storage (IndexedDB + vector index) → hybrid search (FTS + vector fusion) → React UI, with a plugin SDK boundary for source-specific extractors and a privacy/security layer gating what's retained.",
  },
  {
    slug: "codegraph-local",
    name: "CodeGraph Local",
    tagline: "Code intelligence, in your editor, offline",
    summary:
      "A fully standalone VS Code extension: symbol-level intelligence, a blast-radius-weighted health score, and the deterministic 7-agent remediation swarm — no server, no network, no API keys.",
    category: "Developer Tools",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Shipped",
    featured: false,
    primaryLanguage: "TypeScript",
    stack: ["TypeScript", "VS Code API", "TS Compiler API", "esbuild", "Vitest", "React webview"],
    repo: "https://github.com/archdex-art/CodeGraph-Extension",
    links: [{ label: "Marketplace listing", href: "https://github.com/archdex-art/CodeGraph-Extension#install" }],
    metrics: [
      { value: "In-process", label: "zero network" },
      { value: "Tarjan", label: "SCC cycle finder" },
      { value: "P0–P3", label: "ranked findings" },
    ],
    accent: "sage",
    problem:
      "The CodeGraph web app is powerful but requires cloning a repo into a hosted service. Developers wanted the same symbol graph, health score, and remediation swarm on whatever workspace they already have open — with nothing leaving their machine.",
    approach:
      "A self-contained analysis engine that ships entirely inside a VS Code extension. It walks the open workspace with the TypeScript Compiler API, builds a resolved symbol graph, scores health, runs the 7 specialists, and docks results in a sidebar dashboard — with no external server, database, or LLM key.",
    challenges: [
      {
        heading: "A speed/precision tradeoff",
        body: "Running a full TypeScript typechecker program would be too slow for large workspaces, so call resolution uses name-based matching through import bindings via a NodeNext-compatible module resolver — a deliberate, documented tradeoff that keeps scans interactive.",
      },
      {
        heading: "Deterministic graph algorithms",
        body: "The query engine runs Tarjan SCC to find circular dependencies and BFS for impact analysis, feeding fan-in/fan-out metrics into the same blast-radius-weighted health score and P0–P3 judging used by the web app.",
      },
      {
        heading: "Sandboxed fixes in-editor",
        body: "The Fix Executor clones the workspace to an OS temp sandbox, applies regex-safe line deletions, re-scans to verify the health score didn't regress, and generates a unified diff — the verify-before-apply loop, brought into the editor.",
      },
    ],
    results: [
      "Auto-scans on open, surfacing a 0–100 health score in the status bar and a dashboard with Overview, Network graph, and Agent Swarm tabs.",
      "Full command surface: symbol search ranked by connectivity, callers/callees/impact at cursor, circular-dependency and dead-code detection, Graph-RAG context generation, and verified fixes.",
      "Engine covered by Vitest unit tests (symbol extraction, graph building, health score, finding severity, gitignore handling).",
    ],
    architecture:
      "src/engine/*: a gitignore-honoring file scanner → TS Compiler API symbol extractor → cross-file graph builder (NodeNext resolver, fanIn/fanOut) → blast-radius health score → deterministic query engine (Tarjan/BFS) → 7-specialist orchestrator (critic + judge) → sandboxed fix executor, rendered by a React webview docked in the Activity Bar.",
  },
];

export const categories: Category[] = [
  "AI Infrastructure",
  "Developer Tools",
  "Runtime & Systems",
  "Browser Extensions",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
