# Archdex — Portfolio

A premium, one-page-plus-deep-content portfolio built for an independent AI-systems &
developer-tooling engineer. Every project, metric, and timeline entry is sourced from
real, public repositories under [github.com/archdex-art](https://github.com/archdex-art) —
no placeholder projects, no invented testimonials.

**Aesthetic: "Editorial Engineering"** — warm-dark luxury. Obsidian base, warm ivory
ink, burnt-copper accent, sage "live" signal. Fraunces (display serif) + Manrope
(body/UI) + JetBrains Mono (technical accents). Deliberately not another
blue/purple SaaS template.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no `tailwind.config`) |
| Motion | [`motion`](https://motion.dev) (the framer-motion successor) — `motion/react` |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` + `rehype-pretty-code`/`shiki` |
| Forms | [Formspree](https://formspree.io) (`@formspree/react`) — no backend needed |
| Deployment target | GitHub Pages (static export, no server) |

No component library (shadcn/ui, MUI, etc.) — every primitive in `components/ui/`
is hand-built for the aesthetic, kept small and dependency-free.

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export → out/
npm run preview   # serve out/ locally to sanity-check the export
npm run lint       # eslint
```

Node 20+ required (Next.js 16 / React 19).

---

## Deployed

Live at **[archdex-art.github.io/portfolio](https://archdex-art.github.io/portfolio)**
via GitHub Pages, built and deployed automatically by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`. Real facts (projects, journey, skills, recognition) are sourced from
`github.com/archdex-art`. Contact email is the real address
(`koushik.archy@gmail.com`); `siteUrl` and `basePath` (`lib/site.ts`,
`lib/base-path.ts`) match the live domain above — update both if you move to a
custom domain, and drop `basePath` entirely if you deploy to a root-level
`<user>.github.io` repo instead of a project page.

One-time setup for a fork: in the repo's **Settings → Pages**, set **Source**
to **GitHub Actions**. After that, every push to `main` deploys — no manual
step, no CLI, no account linking.

## Notes for running this yourself

- **`public/resume.pdf`** — a real one-page PDF is already generated
  (`scripts/gen-resume.mjs`) from the same project data as the site. Regenerate
  it any time with `node scripts/gen-resume.mjs` after editing the script, or
  swap in your own PDF at the same path.
- **Contact form** — wired to [Formspree](https://formspree.io) (`@formspree/react`),
  which works from a fully static site with no backend. The form ID lives in
  `components/sections/Contact.tsx` (`FORMSPREE_ID`) — sign up for your own
  free Formspree form and swap it in. Spam is filtered by Formspree's own
  honeypot convention (`_gotcha`) and its server-side heuristics.
- **Booking link (optional)** — set `NEXT_PUBLIC_CAL_URL` (e.g. a Cal.com link)
  to show a real "Book a call" button; otherwise the Contact section shows a
  graceful "email to schedule" fallback instead of a fake calendar embed.

---

## Design system

All tokens live in `app/globals.css` under `@theme` (Tailwind v4's CSS-first
config — there is no `tailwind.config.ts`). Use the generated utilities
directly (`bg-surface`, `text-copper`, `border-hairline`, `font-display`, …).

**Color** — warm neutral scale (`obsidian` → `ink`) plus two accents:
- `copper` / `copper-bright` / `copper-soft` / `copper-glow` — primary signal,
  CTAs, links, active states.
- `sage` / `sage-dim` — reserved for the "available / live" status dot only.

Text colors are contrast-checked against their real backgrounds (WCAG 2.2 AA,
≥4.5:1 for normal text): `ink` 17.6:1, `ink-muted` 9.1:1, `ink-dim` 5.1:1,
`ink-faint` 4.8:1 on `obsidian`.

**Type** — Fraunces (optical-size variable serif) for all headings/display,
Manrope for body and UI, JetBrains Mono for eyebrows/labels/code. Loaded via
`next/font/google` in `app/layout.tsx` — self-hosted at build, zero
layout-shift, no external font requests at runtime.

**Motion** — one primitive, `components/ui/Reveal.tsx`, wraps `motion/react`'s
`whileInView`. Every section entrance goes through it. `useReducedMotion()` is
checked everywhere non-trivial motion happens (cursor glow, magnetic buttons,
scroll-linked timeline rail, tab transitions) — reduced-motion users get the
final state immediately, no animation.

**Generative art, not stock photos** — `components/ui/ProjectVisual.tsx` renders
a deterministic, seeded SVG composition per project `slug`. No headshots, no
placeholder images, nothing that could look like an uncanny stock photo.

---

## Content model

| Data | File | Shape |
|---|---|---|
| Projects | `lib/data/projects.ts` | `Project[]` — case-study fields, real metrics, real architecture notes |
| Journey / timeline | `lib/data/journey.ts` | `JourneyEntry[]` |
| Skills + recognition | `lib/data/skills.ts` | `SkillGroup[]`, `Recognition[]`, `techMarquee` |
| Site config | `lib/site.ts` | name, title, email, socials, nav |
| Blog posts | `content/blog/*.mdx` | frontmatter + MDX body, loaded via `lib/blog.ts` |

To add a project: append a `Project` object to `lib/data/projects.ts` — every
page (`/`, `/work`, `/work/[slug]`, sitemap) picks it up automatically via
`generateStaticParams`. To add a post: drop a new `.mdx` file in
`content/blog/` with the same frontmatter shape as the existing three.

---

## Structure

```
app/
  layout.tsx            root layout, fonts, global metadata, JSON-LD, header/footer
  page.tsx               home — assembles every section in order
  globals.css             design tokens (Tailwind v4 @theme) + base styles
  work/                   /work index + /work/[slug] case studies
  blog/                   /blog index + /blog/[slug] MDX posts
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx    SEO routes (all force-static)
components/
  sections/               one file per homepage section (Hero, About, Work, Stack, Contact, …)
  ui/                     shared primitives (Button, Tag, Section, Reveal, ProjectVisual)
  layout/                 Header, Footer, Logo
  work/  blog/            page-specific components
  interactive/            CursorGlow
  seo/                    JsonLd
lib/
  data/                   real content (projects, journey, skills)
  site.ts  types.ts  utils.ts  blog.ts  base-path.ts
content/blog/             MDX posts
scripts/gen-resume.mjs    generates public/resume.pdf (no dependencies)
```

---

## Accessibility

- Every page has exactly one `<h1>` and one `<main>` landmark.
- Skip-to-content link, semantic sectioning, `aria-live` on dynamic regions
  (search result counts, form errors).
- Keyboard-operable throughout: tabs (Stack section) use roving `role="tab"`
  semantics, all interactive elements are real `<button>`/`<a>` with visible
  `:focus-visible` outlines.
- Icon-only controls carry `aria-label`; decorative icons are `aria-hidden`.
- Color contrast checked against WCAG 2.2 AA for every text/background pairing
  actually used (see Design system above).
- `prefers-reduced-motion` disables the cursor glow, magnetic buttons, and all
  scroll-linked/entrance animation — content renders in its final state.

## Performance

- Fully static — every route is prerendered HTML at build time, no server, no
  cold starts. `next build` output shows every page as `○`/`●`.
- `next/font` self-hosts and subsets all three typefaces at build time.
- No client JS for content that doesn't need it — sections are server
  components by default; only interactive pieces (`Work`, `Stack`,
  `BlogIndex`, `Contact`, `Header`) opt into `"use client"`.
- Generative SVG cover art instead of raster images — zero image requests for
  every project thumbnail.

## SEO

- Per-page `generateMetadata` (Open Graph, Twitter cards) on dynamic routes.
- `app/sitemap.ts` includes every static route plus every project and blog
  slug; `app/robots.ts` points at it.
- `app/opengraph-image.tsx` renders a real, on-brand 1200×630 OG card via
  `next/og`, generated once at build time (`force-static`) — no static image
  asset to keep in sync.
- `Person` + `ItemList` JSON-LD in the root layout (`components/seo/JsonLd.tsx`).

## Security

- Contact form submits directly to Formspree over HTTPS — no first-party
  backend, no server secrets to leak. Spam is filtered by Formspree's own
  honeypot field (`_gotcha`) and server-side heuristics, not custom code here.
- All external links use `rel="noopener noreferrer"`.
- Nothing in this repo runs a server, so there's no attack surface beyond the
  static files themselves and Formspree's own security model.

---

## Redeploying

Already live (see **Deployed**, above) and fully automatic. To ship further
changes:

```bash
git add -A && git commit -m "…" && git push
```

`.github/workflows/deploy.yml` builds and deploys on every push to `main` —
no CLI, no manual step, no account to keep authenticated.

Optional environment variable: `NEXT_PUBLIC_CAL_URL` enables the "Book a
call" link — set it as a repository variable/secret and reference it in the
workflow's `env:` if you want it baked into the static build.
