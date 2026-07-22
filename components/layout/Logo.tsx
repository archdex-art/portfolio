import { cn } from "@/lib/utils";

/** Angular "A" monogram — echoes the sharp, blocky brand mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden fill="none">
      <rect x="1" y="1" width="30" height="30" rx="7" className="fill-surface-2 stroke-hairline-strong" strokeWidth="1" />
      <path
        d="M16 7 L23 24 H19.4 L18.1 20.6 H13.9 L12.6 24 H9 L16 7 Z M16 12.6 L14.7 17.4 H17.3 L16 12.6 Z"
        className="fill-copper"
      />
    </svg>
  );
}
