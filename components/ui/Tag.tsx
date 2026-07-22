import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline bg-surface/60 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-ink-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  Live: "text-sage border-sage/30 bg-sage/10",
  Active: "text-copper-bright border-copper/30 bg-copper/10",
  Shipped: "text-ink border-hairline-strong bg-surface-2",
  Research: "text-ink-dim border-hairline bg-surface/60",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-widest",
        statusStyles[status] ?? statusStyles.Shipped,
        className,
      )}
    >
      {status === "Live" && (
        <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
      )}
      {status}
    </span>
  );
}
