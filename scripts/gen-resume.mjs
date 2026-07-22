// Generates public/resume.pdf — a clean one-page résumé, no dependencies.
// Base-14 fonts (Helvetica family), Letter size (612x792).
import { writeFileSync, mkdirSync } from "node:fs";

const W = 612, H = 792, M = 54;
const COPPER = "0.878 0.396 0.227"; // #e0653a
const INK = "0.12 0.11 0.10";
const DIM = "0.42 0.40 0.37";
const RULE = "0.80 0.78 0.75";

const ops = [];
let y = H - M;

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
function text(str, { size = 10, font = "F1", color = INK, x = M } = {}) {
  ops.push(`BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${esc(str)}) Tj ET`);
}
function rule(color = RULE, w = 0.7) {
  ops.push(`${color} RG ${w} w ${M} ${y} m ${W - M} ${y} l S`);
}
const gap = (n) => { y -= n; };

// Wrap helper (~ char-width heuristic for Helvetica).
function wrap(str, size, maxWidth) {
  const cw = size * 0.52;
  const max = Math.floor(maxWidth / cw);
  const words = str.split(" ");
  const lines = [];
  let cur = "";
  for (const word of words) {
    if ((cur + " " + word).trim().length > max) { lines.push(cur.trim()); cur = word; }
    else cur += " " + word;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
function para(str, { size = 9.5, color = DIM, x = M, lead = 12, width = W - 2 * M } = {}) {
  for (const ln of wrap(str, size, width)) { text(ln, { size, color, x }); gap(lead); }
}

// ---- Header ----
text("Archdex", { size: 30, font: "F2", color: INK });
gap(20);
text("Independent Software Engineer — AI Systems & Developer Tooling", { size: 11.5, font: "F1", color: COPPER });
gap(15);
text("github.com/archdex-art   ·   halfwitpirate@gmail.com   ·   Remote · Worldwide", { size: 9, color: DIM });
gap(16); rule(); gap(20);

// ---- Summary ----
text("SUMMARY", { size: 9, font: "F2", color: COPPER });
gap(15);
para(
  "Independent engineer building infrastructure-grade AI systems and developer tooling end to end — architecture, implementation, security hardening, CI, documentation, and deployment. Ships across Go, Rust, TypeScript, and Python, with a bias for determinism, verifiable results, and security in the open.",
);
gap(10); rule(); gap(18);

// ---- Selected Work ----
text("SELECTED WORK", { size: 9, font: "F2", color: COPPER });
gap(16);
const work = [
  ["AgentMesh — Go", "Framework-agnostic control plane for AI agents: OpenTelemetry tracing, deterministic replay, and MCP governance over ClickHouse/Postgres/Redis/MinIO. 8/8 milestones complete."],
  ["CodeGraph — TypeScript / Next.js", "Turns a repo into a symbol-level knowledge graph and runs a deterministic 7-agent remediation swarm with verified fixes — no LLM keys. Live on Render; 96/96 tests."],
  ["SuperSearch — Rust / Tauri", "Intent-driven runtime for macOS: natural language → replayable task graphs, driven through an object-capability security model with an append-only journal and WASM plugin sandbox."],
  ["Live API Inspector — TypeScript", "Privacy-first Chrome DevTools extension: semantic endpoint clustering, performance intelligence, and AI root-cause analysis with local secret redaction."],
  ["Browser Memory AI — TypeScript", "Local-first browser knowledge graph: entity extraction, an embedding pipeline, and hybrid full-text + vector recall behind a plugin SDK."],
  ["CodeGraph Local — TypeScript", "Standalone, offline VS Code extension bringing the symbol graph, health score, and 7-agent swarm in-process via the TypeScript compiler API."],
];
for (const [title, desc] of work) {
  text(title, { size: 10, font: "F2", color: INK });
  gap(13);
  para(desc, { size: 9, color: DIM, lead: 11.5 });
  gap(7);
}
gap(4); rule(); gap(18);

// ---- Core Stack ----
text("CORE STACK", { size: 9, font: "F2", color: COPPER });
gap(15);
para(
  "Go · Rust · TypeScript · Python · Next.js · React · Tauri · OpenTelemetry · Model Context Protocol · ClickHouse · Postgres · Redis · Vector Search · WASM · Docker · CI/CD · Security hardening",
  { size: 9.5, color: INK },
);

// ---- Build PDF ----
const stream = ops.join("\n");
const objs = [];
objs.push("<< /Type /Catalog /Pages 2 0 R >>");
objs.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`);
objs.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
objs.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
objs.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

let pdf = "%PDF-1.4\n";
const offsets = [];
objs.forEach((o, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
});
const xref = pdf.length;
pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((off) => { pdf += `${String(off).padStart(10, "0")} 00000 n \n`; });
pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

mkdirSync("public", { recursive: true });
writeFileSync("public/resume.pdf", pdf, "latin1");
console.log(`resume.pdf written (${pdf.length} bytes, y-end ${Math.round(y)})`);
