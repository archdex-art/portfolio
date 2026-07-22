import { Tag } from "@/components/ui/Tag";

interface PostMetaProps {
  date: string;
  readingTime: string;
  tags: string[];
}

export function PostMeta({ date, readingTime, tags }: PostMetaProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
        <time dateTime={date}>{formatted}</time>
        <span aria-hidden>·</span>
        <span>{readingTime}</span>
      </div>
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
