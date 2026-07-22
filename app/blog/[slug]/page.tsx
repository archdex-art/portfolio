import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostMeta } from "@/components/blog/PostMeta";
import { TableOfContents, type TocHeading } from "@/components/blog/TableOfContents";
import { mdxComponents, slugify } from "@/components/blog/mdx-components";
import { getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `${site.siteUrl}/blog/${slug}`,
    },
  };
}

/** Extract ##/### headings from raw markdown for the table of contents. */
function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = content.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      headings.push({ id: slugify(text), text, depth });
    }
  }
  return headings;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <Section id="post" className="pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/blog" className="eyebrow link-underline">
            ← All writing
          </Link>
          <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-ink md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-dim">{post.description}</p>
          <PostMeta date={post.date} readingTime={post.readingTime} tags={post.tags} />
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-16 lg:grid-cols-[1fr_240px]">
        <Reveal as="div" className="min-w-0 max-w-3xl">
          <article>
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark-dimmed",
                        keepBackground: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </article>

          <div className="mt-16 border-t border-hairline pt-10">
            <Link href="/blog" className="eyebrow link-underline">
              ← Back to all writing
            </Link>
          </div>
        </Reveal>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </Section>
  );
}
