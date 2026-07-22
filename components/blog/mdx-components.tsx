import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/** Stable slug shared by rendered headings and the table of contents. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props;
    if (props && typeof props === "object" && "children" in props) {
      return textOf(props.children);
    }
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 id={slugify(textOf(children))} className="mt-14 scroll-mt-28 font-display text-3xl leading-tight text-ink md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 id={slugify(textOf(children))} className="mt-14 scroll-mt-28 font-display text-2xl leading-tight text-ink md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(textOf(children))} className="mt-10 scroll-mt-28 font-display text-xl leading-snug text-ink md:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-dim">{children}</p>,
  a: ({ href, children }) => {
    const target = href ?? "#";
    const external = /^https?:\/\//.test(target);
    const className = "link-underline text-copper hover:text-copper-bright";
    if (external) {
      return (
        <a href={target} target="_blank" rel="noreferrer noopener" className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={target} className={className}>
        {children}
      </Link>
    );
  },
  ul: ({ children }) => <ul className="mt-6 space-y-2 pl-5 text-ink-dim marker:text-copper [list-style-type:disc]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-6 space-y-2 pl-5 text-ink-dim marker:text-ink-faint [list-style-type:decimal]">{children}</ol>,
  li: ({ children }) => <li className="pl-1.5 leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-2 border-copper/60 bg-surface/40 py-1 pl-5 text-ink-dim italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-12 border-hairline" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic text-ink">{children}</em>,
  code: ({ children, ...props }) => {
    // Inline code has no data attribute; block code (from rehype-pretty-code) does.
    const isBlock = "data-language" in props || "data-theme" in props;
    if (isBlock) return <code {...props}>{children}</code>;
    return (
      <code className="rounded-sm border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-copper-bright">
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="mt-8 overflow-x-auto rounded-lg border border-hairline bg-surface p-5 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0"
    >
      {children}
    </pre>
  ),
};
