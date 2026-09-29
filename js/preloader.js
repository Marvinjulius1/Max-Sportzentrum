import { gsap, loadCount, runtime, setReady, subscribeLoad } from "./runtime.js";

const MIN_MS = 1400;

export function initPreloader() {
  const root = document.getElementById("preloader");
  if (runtime.reduced) {
    root.remove();
    setReady();
    return;
  }
  const html = document.documentElement;
  const count = root.querySelector(".preloader__count");
  const dot = root.querySelector(".preloader__dot");
  const logo = root.querySelector(".preloader__logo");
  html.classList.add("is-loading");
  runtime.lenis?.stop();

  const start = performance.now();
  let prev = start;
  let target = 0;
  let shown = 0;
  let fontsReady = false;
  let exiting = false;
  document.fonts?.ready.then(() => (fontsReady = true));
  subscribeLoad((p) => (target = p));
  setTimeout(() => loadCount() === 0 && (target = 1), 500);
  // safety net: never trap the visitor behind the loader
  setTimeout(() => (target = 1), 9000);

  const tick = () => {
    const now = performance.now();
    const k = 1 - Math.pow(0.92, Math.min(10, ((now - prev) / 1000) * 60));
    prev = now;
    const goal = Math.min(target * 0.97 + (fontsReady ? 0.03 : 0), (now - start) / MIN_MS, 1);
    shown += (goal - shown) * k;
    count.textContent = String(Math.round(shown * 100)).padStart(3, "0");
    if (!exiting && goal >= 0.999 && shown > 0.985) exit();
  };
  gsap.ticker.add(tick);

  function exit() {
    exiting = true;
    gsap.ticker.remove(tick);
    count.textContent = "100";
    gsap
      .timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          html.classList.remove("is-loading");
          root.remove();
        },
      })
      .to(dot, { scale: 1.6, duration: 0.35, ease: "power2.out" })
      .to(logo, { yPercent: -18, opacity: 0, duration: 0.9 }, "<0.1")
      .to(count, { yPercent: 100, opacity: 0, duration: 0.6 }, "<")
      .to(dot, { scale: 90, duration: 1.1, ease: "expo.in" }, "<0.1")
      .add(() => {
        setReady();
        runtime.lenis?.start();
      }, "-=0.15")
      .to(root, { opacity: 0, duration: 0.5, ease: "power1.out" });
  }
}
