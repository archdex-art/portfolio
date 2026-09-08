/**
 * GitHub Pages serves this project from a subpath (archdex-art.github.io/portfolio),
 * not the domain root. `next.config.ts`'s `basePath` handles this automatically for
 * `next/link`, `next/font`, and framework-generated asset URLs, but plain `<a href>`
 * tags pointing at files in `public/` (résumé download, etc.) need the prefix by hand.
 * Only applied in production so local dev still serves from `/`.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";
