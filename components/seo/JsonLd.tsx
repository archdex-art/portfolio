import { site } from "@/lib/site";
import { projects } from "@/lib/data/projects";

/** Person + ItemList structured data for rich results. */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    url: site.siteUrl,
    image: site.avatar,
    jobTitle: site.title,
    email: `mailto:${site.email}`,
    sameAs: [site.socials.github],
    knowsAbout: [
      "AI Infrastructure",
      "Developer Tooling",
      "Distributed Systems",
      "Rust",
      "Go",
      "TypeScript",
    ],
    worksFor: { "@type": "Organization", name: "Independent" },
  };

  const work = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.name,
        description: p.summary,
        codeRepository: p.repo,
        programmingLanguage: p.primaryLanguage,
        url: `${site.siteUrl}/work/${p.slug}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(work) }} />
    </>
  );
}
