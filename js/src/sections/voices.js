import { gsap, navZone, reportSection, runtime, ScrollTrigger } from "../runtime.js";

export function initVoices() {
  const el = document.getElementById("stimmen");
  const quotes = [...el.querySelectorAll("[data-quote]")];
  const dots = [...el.querySelectorAll("[data-qdot]")];
  const n = quotes.length;

  // wrap each word for the line-by-line reveal
  quotes.forEach((q) => {
    const bq = q.querySelector("blockquote");
    const mark = bq.querySelector(".quote__mark");
    const words = bq.textContent.replace(mark.textContent, "").trim().split(/\s+/);
    bq.innerHTML = "";
    bq.append(mark);
    words.forEach((w) => {
      const outer = document.createElement("span");
      outer.className = "w";
      outer.innerHTML = `<span data-w>${w}&nbsp;</span>`;
      bq.append(outer);
    });
  });

  // marquee: duplicate tracks, drift + scroll velocity
  const rows = [...el.querySelectorAll("[data-marquee]")].map((row) => {
    const track = row.querySelector(".marquee__track");
    const inner = document.createElement("div");
    inner.className = "marquee__inner";
    row.append(inner);
    inner.append(track, track.cloneNode(true), track.cloneNode(true));
    return { inner, dir: +row.dataset.marquee, x: 0, w: 1 };
  });
  // measure once (and on resize) – never read layout inside the frame loop
  const measure = () => rows.forEach((row) => (row.w = row.inner.scrollWidth / 3 || 1));
  measure();
  window.addEventListener("resize", measure);
  document.fonts?.ready.then(measure);

  if (runtime.static) {
    ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(4, s.progress) });
    navZone(el, "light");
    return;
  }

  let sign = 1;
  let onScreen = false;
  new IntersectionObserver(([e]) => (onScreen = e.isIntersecting)).observe(el);
  gsap.ticker.add((_t, dtMs) => {
    if (!onScreen) return;
    const v = runtime.velocity;
    if (Math.abs(v) > 0.5) sign = Math.sign(v);
    const speed = (0.6 + Math.min(Math.abs(v) * 0.45, 22)) * sign * (dtMs / 16.67);
    const skew = Math.max(-8, Math.min(8, v * 0.25));
    rows.forEach((row) => {
      const w = row.w;
      row.x = (((row.x + speed * row.dir * (row.dir < 0 ? 0.85 : 1)) % w) + w) % w;
      row.inner.style.transform = `translate3d(${-row.x}px,0,0) skewX(${-skew}deg)`;
    });
  });

  let current = 0;
  quotes.forEach((q, i) => i && gsap.set(q, { autoAlpha: 0 }));
  const setActive = (i) => {
    if (i === current) return;
    const prev = current;
    current = i;
    const dir = i > prev ? 1 : -1;
    gsap.to(quotes[prev], { autoAlpha: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(quotes[prev].querySelectorAll("[data-w]"), { yPercent: -100 * dir, duration: 0.35, stagger: 0.008, ease: "power2.in" });
    gsap.set(quotes[i], { autoAlpha: 1 });
    gsap.fromTo(quotes[i].querySelectorAll("[data-w]"), { yPercent: 110 * dir }, { yPercent: 0, duration: 0.8, stagger: 0.016, ease: "expo.out", delay: 0.15 });
    dots.forEach((d, di) => d.setAttribute("aria-current", String(di === i)));
  };

  ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: () => `+=${window.innerHeight * 0.6 * n}`,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (s) => {
      setActive(Math.min(n - 1, Math.round(s.progress * (n - 1))));
      reportSection(4, s.progress);
    },
  });
  navZone(el, "light");
}
