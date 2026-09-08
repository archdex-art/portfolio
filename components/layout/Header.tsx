"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-[80rem] items-center justify-between px-5 transition-[margin,padding,background-color,border-color,border-radius,backdrop-filter] duration-500 md:px-8",
          scrolled
            ? "my-2.5 rounded-full border border-hairline bg-obsidian/70 py-2.5 backdrop-blur-xl md:my-3"
            : "my-0 border border-transparent py-5",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="font-display text-lg tracking-tight text-ink">{site.name}</span>
          <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-faint sm:inline">
            /engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            className="hidden rounded-full border border-hairline-strong px-4 py-2 text-sm text-ink transition-colors hover:border-copper hover:text-copper md:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn("h-px w-5 bg-ink transition-transform duration-300", open && "translate-y-[3px] rotate-45")} />
              <span className={cn("h-px w-5 bg-ink transition-transform duration-300", open && "-translate-y-[3px] -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-obsidian/95 px-6 pt-24 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-hairline py-5 font-display text-3xl text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a
              href="/resume.pdf"
              className="mt-8 inline-flex w-fit rounded-full bg-copper px-6 py-3 text-sm font-medium text-obsidian"
            >
              Download résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
