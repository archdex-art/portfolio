import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(4000, "Message is too long"),
  // Honeypot — real users leave this empty. Bots tend to fill every field.
  company: z.string().optional(),
});

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? "Invalid submission";
    return Response.json({ ok: false, error }, { status: 422 });
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — pretend success, send nothing.
  if (company && company.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const limit = rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many requests — please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: `${site.name} Portfolio <onboarding@resend.dev>`,
        to: site.email,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      if (error) {
        return Response.json(
          { ok: false, error: "Could not send message. Please email directly." },
          { status: 502 },
        );
      }
    } else {
      // Dev fallback — no email provider configured.
      console.info(
        `[contact] message received (no RESEND_API_KEY, not sent):\n` +
          `  name: ${name}\n  email: ${email}\n  message: ${message}`,
      );
    }
  } catch {
    return Response.json(
      { ok: false, error: "Could not send message. Please email directly." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
