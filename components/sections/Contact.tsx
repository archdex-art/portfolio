"use client";

import { useState, type FormEvent } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const calUrl = process.env.NEXT_PUBLIC_CAL_URL;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");

    const nextErrors: FieldErrors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    else if (name.length > 80) nextErrors.name = "That name is too long.";
    if (!EMAIL_RE.test(email)) nextErrors.email = "Please enter a valid email.";
    if (message.length < 10) nextErrors.message = "Tell me a little more (10+ characters).";
    else if (message.length > 4000) nextErrors.message = "That message is too long.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFormError(null);
      return;
    }

    setStatus("submitting");
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && body?.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setFormError(body?.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setFormError("Network error. You can email me directly instead.");
    }
  }

  const fieldBase =
    "w-full rounded-md border border-hairline bg-surface/50 px-4 py-3 text-ink placeholder:text-ink-faint transition-colors duration-200 focus-visible:border-copper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-copper/40";

  return (
    <Section id="contact">
      <SectionHeading
        index="06"
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s build <span className="text-gradient-copper">something</span>
          </>
        }
        lead="Have a hard problem in AI systems or developer tooling? Send a note — I read every message and reply to the ones that fit."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* Left — form */}
        <Reveal>
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="glass flex h-full flex-col justify-center rounded-xl border border-sage/30 bg-sage/5 p-10"
            >
              <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-sage" aria-hidden />
              <h3 className="mt-6 font-display text-3xl text-ink">Message sent</h3>
              <p className="mt-3 max-w-md text-pretty text-ink-dim">
                Thanks for reaching out — I&rsquo;ll get back to you soon. In the meantime, feel free
                to email me directly at{" "}
                <a href={`mailto:${site.email}`} className="link-underline text-copper">
                  {site.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-ink-dim">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldBase}
                  placeholder="Your name…"
                />
                <p id="name-error" aria-live="polite" className="min-h-[1rem] text-sm text-copper-bright">
                  {errors.name}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-ink-dim">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldBase}
                  placeholder="you@company.com"
                />
                <p id="email-error" aria-live="polite" className="min-h-[1rem] text-sm text-copper-bright">
                  {errors.email}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-ink-dim">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldBase} resize-y`}
                  placeholder="What are you building, and how can I help?"
                />
                <p id="message-error" aria-live="polite" className="min-h-[1rem] text-sm text-copper-bright">
                  {errors.message}
                </p>
              </div>

              {/* Honeypot — hidden from humans and assistive tech. */}
              <div className="sr-only" aria-hidden>
                <label htmlFor="company">Company (leave this empty)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" variant="primary" disabled={status === "submitting"}>
                  {status === "submitting" && (
                    <svg
                      className="h-4 w-4 animate-spin motion-reduce:animate-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  {status === "submitting" ? "Sending…" : "Send message"}
                </Button>
                {status === "error" && formError && (
                  <a href={`mailto:${site.email}`} className="link-underline text-sm text-ink-dim">
                    Or email me directly
                  </a>
                )}
              </div>

              {status === "error" && formError && (
                <p role="alert" aria-live="assertive" className="text-sm text-copper-bright">
                  {formError}
                </p>
              )}
            </form>
          )}
        </Reveal>

        {/* Right — contact rails */}
        <Reveal delay={0.08} className="flex flex-col gap-8">
          <a
            href={`mailto:${site.email}`}
            className="group rounded-xl border border-hairline bg-surface/40 p-6 transition-colors duration-300 hover:border-copper/40"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Email</span>
            <span className="mt-2 block text-lg text-ink transition-colors group-hover:text-copper">
              {site.email}
            </span>
          </a>

          <div className="grid grid-cols-2 gap-4">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-hairline bg-surface/40 p-5 transition-colors duration-300 hover:border-copper/40"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">GitHub</span>
              <span className="mt-2 block text-ink transition-colors group-hover:text-copper">
                @{site.socials.githubUser}
              </span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="group rounded-xl border border-hairline bg-surface/40 p-5 transition-colors duration-300 hover:border-copper/40"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Résumé</span>
              <span className="mt-2 block text-ink transition-colors group-hover:text-copper">
                Download PDF
              </span>
            </a>
          </div>

          <div className="rounded-xl border border-hairline bg-surface/40 p-6">
            <div className="flex items-center gap-2.5">
              <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-sage" aria-hidden />
              <span className="text-sm text-sage">{site.availability}</span>
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-faint">Location</p>
            <p className="mt-1 text-ink-dim">{site.location}</p>
          </div>

          <div className="rounded-xl border border-hairline bg-surface/40 p-6">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Book a call</span>
            {calUrl ? (
              <>
                <p className="mt-2 text-pretty text-ink-dim">
                  Prefer to talk it through? Grab a slot that works for you.
                </p>
                <div className="mt-4">
                  <Button href={calUrl} external variant="outline">
                    Schedule a call
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-pretty text-ink-dim">
                Prefer to talk it through?{" "}
                <a href={`mailto:${site.email}?subject=Scheduling a call`} className="link-underline text-copper">
                  Email me
                </a>{" "}
                and we&rsquo;ll find a time that works across time zones.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
