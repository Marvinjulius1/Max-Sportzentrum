"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

/**
 * Tiny shared runtime: the Lenis instance, reduced-motion flag, a "ready"
 * signal from the preloader, and the section progress store that drives the
 * nav counter + progress line from the same ScrollTriggers as the sections.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const runtime = {
  lenis: null as Lenis | null,
  get reduced() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
  ready: false,
  /** Smoothed scroll velocity (px / frame) for marquees etc. */
  velocity: 0,
};

type Listener = () => void;
const readyListeners = new Set<Listener>();

export function onReady(fn: Listener) {
  if (runtime.ready) {
    fn();
    return () => {};
  }
  readyListeners.add(fn);
  return () => readyListeners.delete(fn);
}

export function setReady() {
  if (runtime.ready) return;
  runtime.ready = true;
  readyListeners.forEach((fn) => fn());
  readyListeners.clear();
}

/* ---------------- section progress store ---------------- */

type SectionState = { index: number; progress: number };
const sectionState: SectionState = { index: 0, progress: 0 };
const sectionListeners = new Set<(s: SectionState) => void>();
const sectionProgress: number[] = [];

/** Called from each section's ScrollTrigger `onUpdate`. */
export function reportSection(index: number, progress: number) {
  sectionProgress[index] = progress;
  // active = last section that has started
  let active = 0;
  for (let i = 0; i < sectionProgress.length; i++) {
    if ((sectionProgress[i] ?? 0) > 0) active = i;
  }
  sectionState.index = active;
  sectionState.progress = sectionProgress[active] ?? 0;
  sectionListeners.forEach((fn) => fn(sectionState));
}

export function subscribeSection(fn: (s: SectionState) => void) {
  sectionListeners.add(fn);
  fn(sectionState);
  return () => {
    sectionListeners.delete(fn);
  };
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (runtime.lenis) {
    runtime.lenis.scrollTo(target, { offset, duration: 1.6 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target + offset });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) window.scrollTo({ top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset });
  }
}

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

export const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

/* ---------------- load tracking (preloader) ---------------- */

const loads = { total: 0, done: 0 };
const loadListeners = new Set<(p: number) => void>();
const emitLoad = () => {
  const p = loads.total === 0 ? 1 : loads.done / loads.total;
  loadListeners.forEach((fn) => fn(p));
};

/** Register an asset promise so the preloader counter reflects real progress. */
export function trackLoad<T>(p: Promise<T>): Promise<T> {
  loads.total++;
  emitLoad();
  const done = () => {
    loads.done++;
    emitLoad();
  };
  p.then(done, done);
  return p;
}

export function subscribeLoad(fn: (p: number) => void) {
  loadListeners.add(fn);
  fn(loads.total === 0 ? 0 : loads.done / loads.total);
  return () => {
    loadListeners.delete(fn);
  };
}

export const loadCount = () => loads.total;

/* ---------------- nav theme ---------------- */

type NavTheme = "light" | "dark";
let navTheme: NavTheme = "light";
const navListeners = new Set<(t: NavTheme) => void>();
export function setNavTheme(t: NavTheme) {
  if (t === navTheme) return;
  navTheme = t;
  navListeners.forEach((fn) => fn(t));
}
export function subscribeNavTheme(fn: (t: NavTheme) => void) {
  navListeners.add(fn);
  fn(navTheme);
  return () => {
    navListeners.delete(fn);
  };
}

/**
 * Switch the nav between light / dark while `el` sits under it.
 * Call after the section's own pin is created (uses the pin-spacer if any).
 */
export function navZone(el: HTMLElement, theme: NavTheme, start = "top top+=32") {
  const parent = el.parentElement;
  const trigger = parent?.classList.contains("pin-spacer") ? parent : el;
  return ScrollTrigger.create({
    trigger,
    start,
    end: "bottom top+=32",
    onToggle: (s) => {
      if (s.isActive) setNavTheme(theme);
    },
  });
}
