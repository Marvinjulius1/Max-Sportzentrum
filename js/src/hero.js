import { config, gsap, isTouch, onReady, reportSection, runtime, ScrollTrigger, setNavTheme, trackLoad } from "./runtime.js";
import { HeroEngine } from "./hero/engine.js";

export function initHero() {
  const el = document.getElementById("start");
  const canvas = document.getElementById("hero-canvas");
  const corners = document.getElementById("hero-corners");
  const introEls = el.querySelectorAll("[data-intro]");

  let engine = null;
  if (runtime.webgl) {
    try {
      engine = new HeroEngine(canvas, {
        heroSrc: config.hero,
        fontSans: '"Archivo"',
        fontSerif: '"Newsreader"',
        text: { ma: canvas.dataset.wordMa || "ma", x: canvas.dataset.wordX || "x" },
        reduced: runtime.reduced,
        mobile: window.innerWidth < 768 || isTouch(),
      });
      trackLoad(engine.load());
    } catch {
      engine = null;
      document.documentElement.classList.add("no-webgl");
    }
  }

  // render only while the hero is on screen
  let last = performance.now();
  gsap.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    if (!engine) return;
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) engine.render(dt);
  });
  window.addEventListener("pointermove", (e) => engine?.setPointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener("resize", () => engine?.resize());

  if (runtime.static) {
    ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(0, s.progress) });
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.2}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (s) => {
        engine?.setProgress(s.progress);
        reportSection(0, s.progress);
        setNavTheme(s.progress > 0.32 ? "dark" : "light");
      },
    },
  });
  tl.to(corners, { opacity: 0, duration: 0.25 }, 0.05)
    .fromTo(introEls, { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" }, 0.55)
    .to({}, { duration: 0.1 });

  onReady(() =>
    gsap.from(corners.children, { opacity: 0, y: 14, stagger: 0.07, duration: 1, ease: "expo.out", delay: 0.2 }),
  );
}
