import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function parseFile(slug: string): Post {
  const raw = readFileSync(join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
    category: fm.category,
    readingTime: readingTime(content).text,
    content,
  };
}

/** All posts, newest first (frontmatter + reading time, no body). */
export function getAllPosts(): PostMeta[] {
  const slugs = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  return slugs
    .map((slug) => {
      const { content, ...meta } = parseFile(slug);
      void content;
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** A single post including its raw MDX body, or null if absent. */
export function getPost(slug: string): Post | null {
  try {
    return parseFile(slug);
  } catch {
    return null;
  }
}

/** Distinct tags across all posts, sorted alphabetically. */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
