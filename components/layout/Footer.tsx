import Link from "next/link";
import { site } from "@/lib/site";
import { BASE_PATH } from "@/lib/base-path";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-hairline bg-surface/40">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-lg text-ink">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-ink-dim">
              {site.title}. Building infrastructure-grade tools end to end.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
              <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
              {site.availability}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-faint">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-dim transition-colors hover:text-copper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-faint">Elsewhere</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-dim transition-colors hover:text-copper">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-ink-dim transition-colors hover:text-copper">
                  Email
                </a>
              </li>
              <li>
                <a href={`${BASE_PATH}/resume.pdf`} className="text-sm text-ink-dim transition-colors hover:text-copper">
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-ink-faint md:flex-row md:items-center">
          <p>© {year} {site.realName} ({site.name}). Designed &amp; built from scratch.</p>
          <p className="font-mono">Fraunces · Manrope · JetBrains Mono</p>
        </div>
      </div>
    </footer>
  );
}
