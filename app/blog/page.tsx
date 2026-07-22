import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: `Technical essays from ${site.name} on deterministic systems, agent infrastructure, and developer tooling.`,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Section id="blog-index" className="pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Writing"
        title={<>Notes from the <em className="text-gradient-copper not-italic">build log</em>.</>}
        lead="Technical essays on the systems above — determinism, replay, capability security, and the engineering behind shipping infrastructure solo."
      />
      <BlogIndex posts={posts} tags={tags} />
    </Section>
  );
}
