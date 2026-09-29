"use client";

import { useEffect, useRef } from "react";
import { assets, hero, studio } from "@/lib/content";
import { gsap, isTouch, onReady, reportSection, runtime, ScrollTrigger, setNavTheme, trackLoad } from "@/lib/runtime";
import { HeroEngine } from "./HeroEngine";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const corners = useRef<HTMLDivElement>(null);
  const fallback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current!;
    const cv = canvas.current!;
    const reduced = runtime.reduced;
    const css = getComputedStyle(document.documentElement);
    const fontSans = css.getPropertyValue("--font-archivo").trim() || "sans-serif";
    const fontSerif = css.getPropertyValue("--font-newsreader").trim() || "serif";

    let engine: HeroEngine | null = null;
    try {
      engine = new HeroEngine(cv, {
        heroSrc: assets.hero,
        fontSans,
        fontSerif,
        text: hero.wordmark,
        reduced,
        mobile: window.innerWidth < 768 || isTouch(),
      });
    } catch {
      // no WebGL: the static fallback below stays visible
      engine = null;
    }
    if (engine) {
      trackLoad(engine.load()).then(() => {
        if (fallback.current) fallback.current.style.display = "none";
      });
    } else if (fallback.current) {
      fallback.current.style.opacity = "1";
    }

    // ---- render loop (only while visible)
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      const r = el.getBoundingClientRect();
      if (engine && r.bottom > 0 && r.top < window.innerHeight) engine.render(dt);
    };
    gsap.ticker.add(tick);

    const onMove = (e: PointerEvent) => engine?.setPointer(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });
    const onResize = () => engine?.resize();
    window.addEventListener("resize", onResize);

    // ---- scroll choreography
    const ctx = gsap.context(() => {
      const introEls = intro.current!.querySelectorAll("[data-intro]");
      if (reduced) {
        gsap.set(introEls, { opacity: 1, y: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          onUpdate: (s) => reportSection(0, s.progress),
        });
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            engine?.setProgress(s.progress);
            reportSection(0, s.progress);
            setNavTheme(s.progress > 0.32 ? "dark" : "light");
          },
        },
      });
      tl.to(corners.current, { opacity: 0, duration: 0.25 }, 0.05)
        .fromTo(
          introEls,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" },
          0.55,
        )
        .to({}, { duration: 0.1 });
    }, el);

    // entrance after preloader
    const off = onReady(() => {
      if (reduced) return;
      gsap.from(corners.current!.children, { opacity: 0, y: 14, stagger: 0.07, duration: 1, ease: "expo.out", delay: 0.2 });
    });

    return () => {
      off();
      ctx.revert();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      engine?.dispose();
    };
  }, []);

  const since = studio.foundingYear;

  return (
    <section ref={section} id="start" data-nav="auto" className="relative h-[100svh] w-full overflow-hidden bg-paper motion-reduce:h-auto motion-reduce:pt-[100svh]">
      <h1 className="sr-only">{hero.srTitle}</h1>
      <canvas ref={canvas} className="absolute inset-x-0 top-0 block h-[100svh] w-full" aria-hidden="true" />

      {/* static fallback (no WebGL) */}
      <div
        ref={fallback}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex h-[100svh] items-center justify-center bg-paper opacity-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.hero} alt="" className="h-[56vh] w-auto" />
      </div>

      {/* small copy, difference-blended so it reads on paper and on night */}
      <div
        ref={corners}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[100svh] text-white mix-blend-difference"
        aria-hidden="true"
      >
        <div className="label absolute left-[var(--gutter)] top-[calc(var(--nav-h)+1.5rem)] leading-[1.5]">
          {hero.cornerTopLeft.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
        <div className="label absolute right-[var(--gutter)] top-[calc(var(--nav-h)+1.5rem)] text-right leading-[1.5]">
          {hero.cornerTopRight.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
        <div className="label absolute bottom-[var(--gutter)] left-[var(--gutter)] flex items-center gap-3">
          <span className="relative block h-8 w-px overflow-hidden bg-white/30">
            <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollhint_1.8s_var(--ease-in-out-quart)_infinite] bg-white" />
          </span>
          {hero.cornerBottomLeft}
        </div>
        <div className="label absolute bottom-[var(--gutter)] right-[var(--gutter)] flex items-center gap-2 tnum">
          <span className="hidden md:inline">{hero.hint} ·</span> {hero.cornerBottomRight} {since}
        </div>
      </div>

      {/* intro copy – arrives with the flood */}
      <div
        ref={intro}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 grid gap-6 px-[var(--gutter)] pb-[calc(var(--gutter)+0.5rem)] text-white md:grid-cols-12 motion-reduce:relative motion-reduce:bg-ink motion-reduce:py-24"
      >
        <p data-intro className="label text-teal opacity-0 md:col-span-12">
          {hero.intro.kicker}
        </p>
        <h2
          data-intro
          className="display text-[clamp(2.6rem,7.4vw,8.5rem)] opacity-0 md:col-span-8 [font-variation-settings:'opsz'_72]"
        >
          {hero.intro.lead}
        </h2>
        <p
          data-intro
          className="max-w-[34ch] self-end text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.45] text-white/85 opacity-0 md:col-span-4 md:justify-self-end"
        >
          {hero.intro.body}
        </p>
      </div>
    </section>
  );
}
