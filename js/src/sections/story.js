import { gsap, navZone, reportSection, runtime, ScrollTrigger } from "../runtime.js";

export function initStory() {
  const el = document.getElementById("geschichte");
  const years = [...el.querySelectorAll("[data-year]")];
  const photos = [...el.querySelectorAll("[data-photo]")];
  const texts = [...el.querySelectorAll("[data-text]")];
  const rail = [...el.querySelectorAll("[data-rail]")];
  const fill = document.getElementById("story-fill");
  const n = years.length;

  // "Heute" always shows the current year
  el.querySelectorAll("[data-current-year]").forEach((y) => (y.textContent = String(new Date().getFullYear())));
  // split numerals into digits for the roll
  years.forEach((y) => (y.innerHTML = [...y.textContent.trim()].map((d) => `<span>${d}</span>`).join("")));

  if (runtime.static) {
    ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(3, s.progress) });
    navZone(el, "dark");
    return;
  }

  years.forEach((y, i) => i && gsap.set(y.children, { yPercent: 110 }));
  let current = 0;
  const setActive = (i) => {
    if (i === current) return;
    const prev = current;
    current = i;
    const dir = i > prev ? 1 : -1;
    gsap.to(years[prev].children, { yPercent: -110 * dir, duration: 0.5, stagger: 0.04, ease: "power3.in" });
    gsap.fromTo(years[i].children, { yPercent: 110 * dir }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.2 });
    photos.forEach((p, pi) => (p.style.zIndex = pi === i ? 2 : pi === prev ? 1 : 0));
    gsap.fromTo(
      photos[i],
      { clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
    );
    gsap.fromTo(photos[i].querySelector("img"), { scale: 1.25 }, { scale: 1.06, duration: 1.4, ease: "expo.out" });
    gsap.to(texts[prev], { autoAlpha: 0, y: -20 * dir, duration: 0.3, ease: "power2.in" });
    gsap.fromTo(texts[i], { autoAlpha: 0, y: 30 * dir }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.3, ease: "expo.out" });
    rail.forEach((r, ri) => r.setAttribute("aria-current", String(ri === i)));
  };

  ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: () => `+=${window.innerHeight * 0.65 * n}`,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (s) => {
      setActive(Math.round(s.progress * (n - 1)));
      if (fill) fill.style.transform = `scaleY(${s.progress})`;
      reportSection(3, s.progress);
    },
  });
  navZone(el, "dark");
}
