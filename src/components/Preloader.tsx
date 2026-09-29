"use client";

import { useEffect, useRef, useState } from "react";
import { assets, preloader, studio } from "@/lib/content";
import { gsap, loadCount, runtime, setReady, subscribeLoad } from "@/lib/runtime";

const MIN_MS = 1500;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (runtime.reduced) {
      // hidden via motion-reduce:hidden – no preloader under reduced motion
      setReady();
      return;
    }
    const html = document.documentElement;
    html.classList.add("is-loading");
    runtime.lenis?.stop();

    const start = performance.now();
    let target = 0;
    const shown = { v: 0 };
    let exiting = false;
    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));
    // if nothing registered within a moment, treat as loaded
    const unsub = subscribeLoad((p) => (target = p));
    const fallback = window.setTimeout(() => {
      if (loadCount() === 0) target = 1;
    }, 500);

    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(shown.v * 100)).padStart(3, "0");
    };

    let prev = performance.now();
    const tick = () => {
      const now = performance.now();
      const k = 1 - Math.pow(0.92, Math.min(10, ((now - prev) / 1000) * 60));
      prev = now;
      const elapsed = now - start;
      const timeCap = Math.min(1, elapsed / MIN_MS);
      const goal = Math.min(target * 0.97 + (fontsReady ? 0.03 : 0), timeCap);
      shown.v += (goal - shown.v) * k;
      render();
      if (!exiting && goal >= 0.999 && shown.v > 0.985) exit();
    };
    gsap.ticker.add(tick);

    const exit = () => {
      exiting = true;
      gsap.ticker.remove(tick);
      shown.v = 1;
      render();
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          html.classList.remove("is-loading");
          setGone(true);
        },
      });
      tl.to(dot.current, { scale: 1.6, duration: 0.35, ease: "power2.out" })
        .to(logo.current, { yPercent: -18, opacity: 0, duration: 0.9 }, "<0.1")
        .to(count.current, { yPercent: 100, duration: 0.6 }, "<")
        .to(dot.current, { scale: 90, duration: 1.1, ease: "expo.in" }, "<0.1")
        .add(() => {
          setReady();
          runtime.lenis?.start();
        }, "-=0.15")
        .to(root.current, { opacity: 0, duration: 0.5, ease: "power1.out" });
    };

    return () => {
      gsap.ticker.remove(tick);
      window.clearTimeout(fallback);
      unsub();
      html.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper motion-reduce:hidden"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={logo} src={assets.logo} alt="" className="w-[min(58vw,340px)] select-none" draggable={false} />
      <div className="absolute bottom-[var(--gutter)] left-[var(--gutter)] flex items-end gap-4 overflow-hidden">
        <span ref={count} className="wide tnum text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.8]">
          000
        </span>
      </div>
      <div className="label absolute bottom-[var(--gutter)] right-[var(--gutter)] text-ink-60">
        {preloader.caption}
      </div>
      <div className="label absolute left-[var(--gutter)] top-[var(--gutter)] text-ink-60">
        {studio.subtitle}
      </div>
      <span
        ref={dot}
        className="absolute bottom-[calc(var(--gutter)+0.35rem)] left-1/2 block size-3 -translate-x-1/2 rounded-full bg-teal"
      />
    </div>
  );
}
