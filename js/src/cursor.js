import { gsap } from "./runtime.js";

/** Dot + lagging ring, grows over links; labels from data-cursor. */
export function initCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const html = document.documentElement;
  html.classList.add("has-cursor");
  const ring = document.querySelector(".cursor__ring");
  const dot = document.querySelector(".cursor__dot");
  const label = ring.querySelector(".label");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const rp = { ...pos };
  let visible = false;
  let scale = 1;
  let target = 1;

  window.addEventListener(
    "pointermove",
    (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        rp.x = pos.x;
        rp.y = pos.y;
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
      }
      const hit = e.target.closest?.("a, button, input, textarea, [data-cursor]");
      const text = hit?.dataset.cursor ?? "";
      target = hit ? (text ? 3.2 : 1.9) : 1;
      if (label.textContent !== text) label.textContent = text;
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => {
    visible = false;
    gsap.to([ring, dot], { opacity: 0, duration: 0.3 });
  });

  gsap.ticker.add(() => {
    rp.x += (pos.x - rp.x) * 0.18;
    rp.y += (pos.y - rp.y) * 0.18;
    scale += (target - scale) * 0.16;
    ring.style.transform = `translate3d(${rp.x - 18}px, ${rp.y - 18}px, 0) scale(${scale})`;
    dot.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
    label.style.opacity = scale > 2.5 ? "1" : "0";
  });
}
