"use client";

import { useEffect, useRef } from "react";
import { assets, nav, sections, studio } from "@/lib/content";
import { gsap, onReady, runtime, scrollToTarget, subscribeNavTheme, subscribeSection } from "@/lib/runtime";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const total = sections.length;
    let current = -1;
    const unsub = subscribeSection(({ index, progress }) => {
      const overall = Math.min(1, (index + progress) / total);
      if (line.current) line.current.style.transform = `scaleX(${overall})`;
      if (index !== current) {
        const first = current === -1;
        current = index;
        const apply = () => {
          if (num.current) num.current.textContent = pad(index + 1);
          if (name.current) name.current.textContent = sections[index].label;
        };
        if (first || runtime.reduced) apply();
        else
          gsap
            .timeline()
            .to([num.current, name.current], { yPercent: -100, duration: 0.25, ease: "power2.in" })
            .add(apply)
            .fromTo([num.current, name.current], { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "expo.out" });
      }
    });
    const off = onReady(() => {
      gsap.fromTo(root.current, { yPercent: -100 }, { yPercent: 0, duration: 1.1, ease: "expo.out", delay: 0.4 });
    });
    const unTheme = subscribeNavTheme((t) => {
      if (root.current) root.current.dataset.theme = t;
    });
    return () => {
      unTheme();
      unsub();
      off();
    };
  }, []);

  return (
    <header
      ref={root}
      data-theme="light"
      className="group/nav fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/55 text-ink backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color] duration-500 data-[theme=dark]:border-white/10 data-[theme=dark]:bg-ink/35 data-[theme=dark]:text-white"
    >
      <div className="flex h-[var(--nav-h)] items-center justify-between gap-6 px-[var(--gutter)]">
        <a
          href="#start"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          className="flex items-center gap-3"
          aria-label={`${studio.fullName} – nach oben`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assets.logoMark} alt="" className="h-7 w-auto" width={60} height={28} />
        </a>

        <div className="label flex items-center gap-4" aria-hidden="true">
          <span className="flex overflow-hidden tnum">
            <span ref={num} className="inline-block">
              01
            </span>
            <span className="px-1.5 opacity-50">/</span>
            <span className="opacity-50">{pad(sections.length)}</span>
          </span>
          <span className="hidden w-28 overflow-hidden sm:block">
            <span ref={name} className="inline-block">
              {sections[0].label}
            </span>
          </span>
        </div>

        <a
          href={nav.cta.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#kontakt");
          }}
          className="label group relative flex items-center gap-2 overflow-hidden rounded-full border border-current px-4 py-2.5 transition-colors duration-500 hover:text-white group-data-[theme=dark]/nav:hover:text-ink"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-data-[theme=dark]/nav:bg-white" />
          <span className="relative size-1.5 rounded-full bg-teal" />
          <span className="relative">{nav.cta.label}</span>
        </a>
      </div>
      <span className="absolute inset-x-0 bottom-[-1px] block h-px bg-transparent">
        <span ref={line} className="block h-px origin-left scale-x-0 bg-blue" />
      </span>
    </header>
  );
}
