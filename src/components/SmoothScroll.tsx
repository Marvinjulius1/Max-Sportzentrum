"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, runtime, ScrollTrigger } from "@/lib/runtime";

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = runtime.reduced;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let lenis: Lenis | null = null;
    let last = window.scrollY;
    const tick = (time: number) => {
      lenis?.raf(time * 1000);
      const y = window.scrollY;
      runtime.velocity += (y - last - runtime.velocity) * 0.2;
      last = y;
    };

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 0.9, touchMultiplier: 1.4, autoRaf: false });
      runtime.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
    }
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // fonts change line heights -> recompute pins once they are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      runtime.lenis = null;
    };
  }, []);

  return null;
}
