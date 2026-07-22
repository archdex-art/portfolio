"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";
import type { PostMeta } from "@/lib/blog";

interface BlogIndexProps {
  posts: PostMeta[];
  tags: string[];
}

export function BlogIndex({ posts, tags }: BlogIndexProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = activeTag === null || post.tags.includes(activeTag);
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6">
        <label className="relative block max-w-md">
          <span className="sr-only">Search writing</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-full border border-hairline bg-surface/60 px-5 py-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-copper focus-visible:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide transition-colors",
              activeTag === null
                ? "border-copper bg-copper/10 text-copper-bright"
                : "border-hairline bg-surface/60 text-ink-dim hover:border-hairline-strong hover:text-ink",
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((cur) => (cur === tag ? null : tag))}
              aria-pressed={activeTag === tag}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide transition-colors",
                activeTag === tag
                  ? "border-copper bg-copper/10 text-copper-bright"
                  : "border-hairline bg-surface/60 text-ink-dim hover:border-hairline-strong hover:text-ink",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-4 py-8 transition-colors md:grid-cols-[1fr_auto] md:items-baseline"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
                  <span className="text-copper">{post.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-copper md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-dim">{post.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <span
                aria-hidden
                className="hidden font-mono text-sm text-ink-faint transition-colors group-hover:text-copper md:inline"
              >
                Read →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-12 text-ink-dim">No posts match your search.</p>
      )}
    </div>
  );
}
