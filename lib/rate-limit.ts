/**
 * In-memory sliding-window rate limiter.
 *
 * Tracks per-key request timestamps in a module-level Map and drops any that
 * fall outside the current window before deciding. Intended for a single
 * server instance (dev / small deployments) — it is process-local and resets
 * on restart. Not a distributed limiter.
 */

interface Bucket {
  /** Request timestamps (ms) within the active window, oldest first. */
  hits: number[];
}

const store = new Map<string, Bucket>();

/** Drop keys whose most recent hit is older than `windowMs`. */
function prune(now: number, windowMs: number): void {
  for (const [key, bucket] of store) {
    const last = bucket.hits[bucket.hits.length - 1];
    if (last === undefined || now - last > windowMs) store.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Requests still allowed in the current window (>= 0). */
  remaining: number;
  /** Seconds until the caller may retry (0 when not limited). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  opts?: { limit?: number; windowMs?: number },
): RateLimitResult {
  const limit = opts?.limit ?? 5;
  const windowMs = opts?.windowMs ?? 60_000;
  const now = Date.now();

  prune(now, windowMs);

  const bucket = store.get(key) ?? { hits: [] };
  // Keep only timestamps inside the sliding window.
  const cutoff = now - windowMs;
  const recent = bucket.hits.filter((t) => t > cutoff);

  if (recent.length >= limit) {
    const oldest = recent[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    bucket.hits = recent;
    store.set(key, bucket);
    return { ok: false, remaining: 0, retryAfter };
  }

  recent.push(now);
  bucket.hits = recent;
  store.set(key, bucket);

  return { ok: true, remaining: Math.max(0, limit - recent.length), retryAfter: 0 };
}
