"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { BASE_PATH } from "@/lib/base-path";

const calUrl = process.env.NEXT_PUBLIC_CAL_URL;
const FORMSPREE_ID = "xbgjznlb";

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

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
          {state.succeeded ? (
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  minLength={2}
                  maxLength={80}
                  className={fieldBase}
                  placeholder="Your name…"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="min-h-[1rem] text-sm text-copper-bright"
                />
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
                  className={fieldBase}
                  placeholder="you@company.com"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="min-h-[1rem] text-sm text-copper-bright"
                />
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
                  minLength={10}
                  maxLength={4000}
                  className={`${fieldBase} resize-y`}
                  placeholder="What are you building, and how can I help?"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="min-h-[1rem] text-sm text-copper-bright"
                />
              </div>

              {/* Honeypot — Formspree's own convention field, spam is silently discarded server-side. */}
              <div className="sr-only" aria-hidden>
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" variant="primary" disabled={state.submitting}>
                  {state.submitting && (
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
                  {state.submitting ? "Sending…" : "Send message"}
                </Button>
                <a href={`mailto:${site.email}`} className="link-underline text-sm text-ink-dim">
                  Or email me directly
                </a>
              </div>

              <ValidationError errors={state.errors} className="text-sm text-copper-bright" role="alert" aria-live="assertive" />
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
              href={`${BASE_PATH}/resume.pdf`}
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
