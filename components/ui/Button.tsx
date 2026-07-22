"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-bright disabled:opacity-50 disabled:pointer-events-none";

const sizes = "px-6 py-3 text-sm md:text-[0.95rem]";

const variants: Record<Variant, string> = {
  primary: "bg-copper text-obsidian hover:bg-copper-bright shadow-[0_10px_40px_-14px_rgba(224,101,58,0.55)]",
  outline: "border border-hairline-strong text-ink hover:border-copper hover:text-copper bg-transparent",
  ghost: "text-ink-dim hover:text-ink",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
}

interface LinkProps extends CommonProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

interface ButtonElProps extends CommonProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

type Props = LinkProps | ButtonElProps;

export function Button(props: Props) {
  const { children, variant = "primary", className, magnetic = true } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  function handleMove(e: MouseEvent) {
    if (reduce || !magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function handleLeave() {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }

  const inner = (
    <motion.span
      ref={ref}
      className="inline-flex items-center gap-2"
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </motion.span>
  );

  const classes = cn(base, sizes, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external || href.startsWith("http") || href.startsWith("mailto")) {
      return (
        <a
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={classes}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        {inner}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonElProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {inner}
    </button>
  );
}
