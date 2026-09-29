/* Shared runtime: GSAP/Lenis handles, reduced-motion flag, ready signal,
   load tracking (preloader), section progress (nav) and nav theme. */

export const gsap = window.gsap;
export const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export const runtime = {
  lenis: null,
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  webgl: true,
  ready: false,
  /** smoothed scroll velocity in px per frame */
  velocity: 0,
};

export const isTouch = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;
export const isMobile = () => window.innerWidth < 768;
export const pad = (n) => String(n).padStart(2, "0");
export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/* ---------- ready ---------- */
const readyFns = new Set();
export function onReady(fn) {
  if (runtime.ready) fn();
  else readyFns.add(fn);
}
export function setReady() {
  if (runtime.ready) return;
  runtime.ready = true;
  readyFns.forEach((fn) => fn());
  readyFns.clear();
}

/* ---------- load tracking ---------- */
const loads = { total: 0, done: 0 };
const loadFns = new Set();
const emitLoad = () => loadFns.forEach((fn) => fn(loads.total ? loads.done / loads.total : 1));
export function trackLoad(p) {
  loads.total++;
  emitLoad();
  const done = () => {
    loads.done++;
    emitLoad();
  };
  p.then(done, done);
  return p;
}
export function subscribeLoad(fn) {
  loadFns.add(fn);
  fn(loads.total ? loads.done / loads.total : 0);
}
export const loadCount = () => loads.total;

/* ---------- section progress → nav ---------- */
const progress = [];
const sectionFns = new Set();
export function reportSection(index, p) {
  progress[index] = p;
  let active = 0;
  for (let i = 0; i < progress.length; i++) if ((progress[i] ?? 0) > 0) active = i;
  sectionFns.forEach((fn) => fn(active, progress[active] ?? 0));
}
export function subscribeSection(fn) {
  sectionFns.add(fn);
}

/* ---------- nav theme ---------- */
let navTheme = "light";
export function setNavTheme(t) {
  if (t === navTheme) return;
  navTheme = t;
  const nav = document.getElementById("nav");
  if (nav) nav.dataset.theme = t;
}
/** switch the nav theme while `el` is under it (uses the pin-spacer if pinned) */
export function navZone(el, theme, start = "top top+=32") {
  const parent = el.parentElement;
  const trigger = parent && parent.classList.contains("pin-spacer") ? parent : el;
  return ScrollTrigger.create({
    trigger,
    start,
    end: "bottom top+=32",
    onToggle: (s) => s.isActive && setNavTheme(theme),
  });
}

/* ---------- scrolling ---------- */
export function scrollToTarget(target) {
  if (runtime.lenis) {
    runtime.lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}

/* ---------- config from index.html ---------- */
export const config = JSON.parse(document.getElementById("site-config").textContent);
