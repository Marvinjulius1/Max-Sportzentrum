import { gsap, runtime, scrollToTarget, ScrollTrigger } from "./runtime.js";

/** Lenis smooth scroll on desktop wheel, native scroll on touch. */
export function initScroll() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  let last = window.scrollY;

  if (!runtime.reduced && window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true, autoRaf: false });
    runtime.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
  }
  gsap.ticker.add((time) => {
    runtime.lenis?.raf(time * 1000);
    const y = window.scrollY;
    runtime.velocity += (y - last - runtime.velocity) * 0.2;
    last = y;
  });
  gsap.ticker.lagSmoothing(0);

  // in-page links
  document.querySelectorAll("[data-scroll-to]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const t = a.dataset.scrollTo;
      scrollToTarget(t === "0" ? 0 : t);
    }),
  );
}
