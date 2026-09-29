"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/runtime";

/**
 * Custom cursor: a precise dot plus a lagging ring. Grows over interactive
 * elements, shows a short label for elements with `data-cursor="…"`.
 * Uses mix-blend-mode: difference so it reads on paper and on night.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let visible = false;
    let scale = 1;
    let targetScale = 1;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3 });
      }
      const t = e.target as HTMLElement | null;
      const hit = t?.closest<HTMLElement>("a, button, input, textarea, [data-cursor]");
      const text = hit?.dataset.cursor ?? "";
      targetScale = hit ? (text ? 3.2 : 1.9) : 1;
      if (label.current && label.current.textContent !== text) label.current.textContent = text;
    };
    const leave = () => {
      visible = false;
      gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.3 });
    };
    const down = () => (targetScale *= 0.8);
    const up = () => (targetScale /= 0.8);

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      scale += (targetScale - scale) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (label.current) label.current.style.opacity = scale > 2.5 ? "1" : "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    gsap.ticker.add(tick);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110] mix-blend-difference">
      <div
        ref={ring}
        className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border border-white opacity-0"
      >
        <span ref={label} className="label scale-[0.34] whitespace-nowrap text-white opacity-0 transition-opacity" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-white opacity-0" />
    </div>
  );
}
