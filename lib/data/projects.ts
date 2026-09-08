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
    repo: "https://github.com/archdex-art/AgentMesh",
    links: [{ label: "Runbook", href: "https://github.com/archdex-art/AgentMesh/blob/main/docs/RUNBOOK.md" }],
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
    slug: "browsemesh",
    name: "BrowseMesh",
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
    repo: "https://github.com/archdex-art/BrowseMesh",
    links: [
      { label: "System architecture", href: "https://github.com/archdex-art/BrowseMesh/blob/main/docs/architecture/SYSTEM_ARCHITECTURE.md" },
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
  {
    slug: "land",
    name: "land",
    tagline: "Prove what your coding agents actually ran",
    summary:
      "Reconciles what an AI coding agent claimed against what it observably executed — reading the session transcripts agents already write to disk, with zero servers and zero runtime dependencies.",
    category: "Developer Tools",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Active",
    featured: true,
    primaryLanguage: "TypeScript",
    stack: ["TypeScript", "Node.js", "SQLite", "GitHub Actions"],
    repo: "https://github.com/archdex-art/land",
    links: [{ label: "Example CI gate", href: "https://github.com/archdex-art/land/blob/main/.github/workflows/example-land-gate.yml" }],
    metrics: [
      { value: "52", label: "tests" },
      { value: "0", label: "false accusations" },
      { value: "84/7/1", label: "verified / unknown / contradicted" },
    ],
    accent: "amber",
    problem:
      "Agent output roughly doubled while review capacity didn't — PR review time is up 91% and agentic PRs sit 5.3× longer before pickup. Every tool on the market optimizes for launching agents; nothing tells a reviewer whether last night's branch can be trusted before they read it.",
    approach:
      "land reads the session transcripts AI coding agents already write to disk and reconciles what an agent said it did against what it observably did — one verdict per claim: VERIFIED, CONTRADICTED, UNSUPPORTED, or UNKNOWN. UNKNOWN is a first-class, deliberate outcome: a trust tool that cries wolf once is muted forever, so land abstains whenever a transcript can't settle the question rather than guessing.",
    challenges: [
      {
        heading: "Reverse-engineering an undocumented format",
        body: "Three findings drive most of the code, none documented upstream: there is no exit code (a failing Bash result carries is_error: true, inferred never read), there is no test tool (so `cargo test | tail -20` masks the real exit status — land detects the masking and falls back to the runner's own summary), and a declined tool call is a non-execution, excluded from evidence entirely.",
      },
      {
        heading: "Tamper-evident by construction",
        body: "Observations are appended to a SQLite database as a SHA-256 hash chain, with UPDATE and DELETE blocked by database triggers. Verdicts are never stored — they're derived on read, so an opinion can never drift from the evidence describing it. A broken chain exits 2 and outranks every CI policy, including 'never'.",
      },
      {
        heading: "Redact before write, not on read",
        body: "Command output is redacted before it ever touches disk — prefixed credential families (AWS, GitHub, Anthropic, OpenAI, Slack, Stripe, npm, JWTs, database URLs), sensitive key/value pairs, and an entropy sweep. On the development corpus it caught a live Upstash Redis token in a shell command before it could persist.",
      },
    ],
    results: [
      "Measured on 18 real sessions in the project's own development corpus: 84 VERIFIED, 7 UNKNOWN, 1 CONTRADICTED (a true positive), 0 false accusations.",
      "A single self-contained HTML report (land ui) with CSP default-src 'none' — no server, no network calls, keyboard-navigable, works in light and dark mode.",
      "A CI gate with policy-based failure (contradicted / unsupported / unknown / never) and a soft-fail mode for adopting on an existing repository.",
      "52 tests — the reconciliation suite is the specification; the HTML-escaping suite encodes the XSS defense contract.",
    ],
    architecture:
      "transcript.ts normalizes Claude Code JSONL into sessions; commands.ts classifies shell commands and runner output; claims.ts extracts execution claims from assistant prose; reconcile.ts derives a verdict with abstention; redact.ts strips secrets at write time; store.ts is the hash-chained SQLite evidence store; ci.ts renders the CI gate (annotations, job summary, exit code).",
  },
  {
    slug: "archboard",
    name: "Archboard",
    tagline: "A desktop dashboard for every project on your Mac",
    summary:
      "Find a project, see its live Git state, and open it in a terminal, editor, or browser in one click — a native macOS app built on Tauri, Rust, and React, reachable from a global shortcut in one keystroke.",
    category: "Developer Tools",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Shipped",
    featured: false,
    primaryLanguage: "TypeScript",
    stack: ["Tauri", "Rust", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    repo: "https://github.com/archdex-art/archboard",
    demo: "https://archdex-art.github.io/archboard/",
    links: [{ label: "Download for macOS", href: "https://archdex-art.github.io/archboard/" }],
    metrics: [
      { value: "⌥K", label: "global summon" },
      { value: "23", label: "framework markers" },
      { value: "0", label: "macOS permissions needed" },
    ],
    accent: "sage",
    problem:
      "Developers with dozens of local repositories lose time to a mundane loop: find the right folder, check whether it's clean, then manually open a terminal or editor pointed at it. Existing launchers don't know what Git actually says about a project.",
    approach:
      "A native menu-bar app that reads live Git state directly from each repository — never a cached guess — and turns one click into 'open in editor,' 'open in terminal, already cd'd,' or 'open on GitHub.' Colour marks state, never decoration: a clean board renders entirely in graphite, and unfinished work is the only colour on screen.",
    challenges: [
      {
        heading: "A global shortcut that asks for nothing",
        body: "⌥K is registered through Carbon's RegisterEventHotKey, which needs neither Accessibility nor Input Monitoring — deliberately avoiding ⌘Space, ⌥Space, and a global ⌘K that would steal the key from every editor and chat app. Media keys are refused outright because binding them would require the permission-prompting event-tap path.",
      },
      {
        heading: "No shell, ever",
        body: "The frontend never sees a path it can turn into a command — it passes a project id over typed IPC and Rust resolves the real path from SQLite. Every launch is std::process::Command with an argument array; every Git invocation is scoped with -C <path>. Manifests are read as text for substring matching, never parsed as code or executed.",
      },
      {
        heading: "Detection without execution",
        body: "Language, framework, and package manager are inferred from 23 top-level manifest markers with no recursion and nothing executed — discovery asks before adding any repository it finds under a scanned root.",
      },
    ],
    results: [
      "Keyboard-first throughout: ⌘K palette, ⌘N add, ⌘T terminal, ⌘I editor, ⌘R refresh — every binding re-recordable in Settings except core navigation.",
      "36 frontend tests plus 11 Rust backend tests covering the Git porcelain parser, remote-URL handling, stack detection, and the bounded discovery walk.",
      "Ships as an ad-hoc signed, notarization-free universal binary with a styled .dmg, built via a GitHub Actions release workflow.",
    ],
    architecture:
      "React/TypeScript frontend (components, pages, features, stores) talks over typed Tauri IPC to a Rust backend: commands.ts-equivalent typed command surface, db/ (rusqlite + migrations), git/ (porcelain v2 parsing with a TTL cache), detect/ (marker → stack matrix), launcher/ (app detection and launching), and scan/ (the bounded discovery walk).",
  },
  {
    slug: "pramaan",
    name: "PRAMAAN",
    tagline: "Evidence reconciliation for watershed monitoring",
    summary:
      "Turns geo-tagged field photographs into machine-testable claims, reconciled against independent satellite, terrain, and matched-control evidence, on an append-only hash-chained adjudication ledger — a Smart India Hackathon 2026 entry for the Ministry of Rural Development.",
    category: "Civic & Applied Systems",
    year: "2026",
    role: "Sole architect & engineer",
    status: "Research",
    featured: true,
    primaryLanguage: "Python",
    stack: ["Python", "FastAPI", "React", "PostGIS", "Postgres", "NASA HLS imagery"],
    repo: "https://github.com/archdex-art/pramaan-sih26015",
    links: [{ label: "Runbook", href: "https://github.com/archdex-art/pramaan-sih26015/blob/main/pramaan/RUNNING.md" }],
    metrics: [
      { value: "488+620", label: "tests, two suites" },
      { value: "100%", label: "branch coverage" },
      { value: "8", label: "epistemic levels" },
    ],
    accent: "sage",
    problem:
      "Watershed development claims — a check dam built, vegetation recovering — are verified today mostly by trusting a submitted photograph. No labelled ground-truth corpus of Indian watershed photographs exists, and dashboards report false confidence by conflating correlation with proof.",
    approach:
      "Every claim runs through six evidence families — terrain, satellite, temporal, matched controls, rainfall context, and the photo itself, deliberately weighted lowest since it's the claim's own source — into an eight-level epistemic ladder (L0–L4, N1–N3) with a hard ceiling below causation. A pure reconciliation function (no IO, no clock, no randomness) turns an evidence bundle into a verdict, pinned by golden cases across all eight levels.",
    challenges: [
      {
        heading: "Refusing to fabricate confidence",
        body: "No accuracy figure is published — ten candidate ground-truth sources were checked and rejected, documented in the repo rather than papered over. The one claim in the public demo running on real NASA HLS imagery comes back 'N1 inconclusive' at 0.0615 confidence: the site's vegetation rose, but twelve terrain-matched controls rose just as much, and the difference is inside the noise. A dashboard would have called it success.",
      },
      {
        heading: "An adjudication ledger that can't be edited",
        body: "The database revokes UPDATE and DELETE from the application role at the schema level, not just the API. The hash chain is verifiable directly from psql without the application running, and every unadjudicated verdict is labelled PROVISIONAL everywhere, including exported reports, until a named officer signs it.",
      },
      {
        heading: "Byte-identical reproducibility",
        body: "POST /api/v1/verdicts/{id}/recompute re-derives a stored verdict from its own lineage and must return identical: true — the reconciliation engine is a pure function, so a verdict either reproduces exactly or the bug is real, never ambiguous.",
      },
    ],
    results: [
      "Three role-scoped workspaces (Field, Monitoring, Administration) with server-side role → capability mapping rather than hardcoded UI checks.",
      "Real evidence capture: EXIF/GPS extraction, a classical-CV quality gate (blur and exposure, no ML), perceptual-hash deduplication, and full re-encode before storage.",
      "488 tests plus mypy --strict at 100% branch coverage offline, plus 620 further tests against a throwaway PostGIS instance.",
      "Explicit about its own limits: photo-model inference and the bulk district imagery pipeline are documented as not built, not stubbed.",
    ],
    architecture:
      "FastAPI backend (api/v1 routes for ingest, claims, adjudication, analytics, audit) over a PostGIS schema, with services split into ingestion (EXIF, quality, dedupe), indicators, context (rainfall), and an audit/ledger module implementing the hash-chained, trigger-protected adjudication trail — fronted by a role-scoped React console.",
  },
];

export const categories: Category[] = [
  "AI Infrastructure",
  "Developer Tools",
  "Runtime & Systems",
  "Browser Extensions",
  "Civic & Applied Systems",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
