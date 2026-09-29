import { gsap, onReady, pad, runtime, subscribeSection } from "./runtime.js";

export function initNav() {
  const nav = document.getElementById("nav");
  const num = document.getElementById("nav-num");
  const name = document.getElementById("nav-name");
  const line = document.getElementById("nav-line");
  const sections = [...document.querySelectorAll("[data-section]")].map((s) => s.dataset.section);
  document.getElementById("nav-total").textContent = pad(sections.length);

  let current = 0;
  subscribeSection((index, p) => {
    line.style.transform = `scaleX(${Math.min(1, (index + p) / sections.length)})`;
    if (index === current) return;
    current = index;
    const apply = () => {
      num.textContent = pad(index + 1);
      name.textContent = sections[index];
    };
    if (runtime.reduced) return apply();
    gsap
      .timeline()
      .to([num, name], { yPercent: -100, duration: 0.22, ease: "power2.in" })
      .add(apply)
      .fromTo([num, name], { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "expo.out" });
  });
  onReady(() => {
    if (!runtime.reduced) gsap.fromTo(nav, { yPercent: -100 }, { yPercent: 0, duration: 1.1, ease: "expo.out", delay: 0.4 });
  });
}
