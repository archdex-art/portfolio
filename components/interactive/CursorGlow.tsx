"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle copper glow that trails the cursor. Pointer-fine devices only;
 * disabled under prefers-reduced-motion. Purely imperative — the element
 * always mounts (avoids SSR/CSR state mismatch) but stays invisible until
 * the effect confirms it should animate, so nothing ever calls setState
 * from inside the effect.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    el.style.opacity = "0.6";

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    function onMove(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }
    function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el!.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="glow-copper pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{ willChange: "transform" }}
    />
  );
}
