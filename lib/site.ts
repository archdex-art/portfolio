/**
 * Central site configuration.
 * `siteUrl` is the live GitHub Pages deployment; `email` is real. Update
 * `siteUrl` if a custom domain is added later.
 */
export const site = {
  name: "Archdex",
  realName: "Koushik Gaddam",
  handle: "archdex-art",
  title: "Independent Software Engineer — AI Systems & Developer Tooling",
  shortTitle: "AI Systems & Developer Tooling Engineer",
  description:
    "Archdex builds AI-systems infrastructure and developer tooling — agent observability, deterministic code-intelligence swarms, and intent-driven runtimes. Go · Rust · TypeScript · Python.",
  siteUrl: "https://archdex-art.github.io/portfolio",
  email: "koushik.archy@gmail.com",
  location: "Hyderabad, India · Remote",
  availability: "Available for select work",
  avatar: "https://avatars.githubusercontent.com/u/237775595?v=4",
  socials: {
    github: "https://github.com/archdex-art",
    githubUser: "archdex-art",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Stack", href: "/#stack" },
    { label: "Journey", href: "/#journey" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type Site = typeof site;
