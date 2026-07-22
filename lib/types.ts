export type Category =
  | "AI Infrastructure"
  | "Developer Tools"
  | "Runtime & Systems"
  | "Browser Extensions";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseSection {
  heading: string;
  body: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: Category;
  year: string;
  role: string;
  status: "Live" | "Active" | "Shipped" | "Research";
  featured: boolean;
  primaryLanguage: string;
  stack: string[];
  repo: string;
  demo?: string;
  links: ProjectLink[];
  metrics: Metric[];
  /** Deterministic accent seed for generated cover art. */
  accent: "copper" | "sage" | "ink" | "amber" | "rust";
  problem: string;
  approach: string;
  challenges: CaseSection[];
  results: string[];
  architecture: string;
}

export interface JourneyEntry {
  period: string;
  title: string;
  org: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface SkillGroup {
  name: string;
  blurb: string;
  skills: { name: string; level: number }[];
}

export interface Recognition {
  kind: string;
  title: string;
  detail: string;
  href?: string;
}
