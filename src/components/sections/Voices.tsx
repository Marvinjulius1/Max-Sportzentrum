"use client";

import { useEffect, useRef } from "react";
import { voices } from "@/lib/content";
import { gsap, navZone, reportSection, runtime, ScrollTrigger } from "@/lib/runtime";

const pad = (n: number) => String(n).padStart(2, "0");

function MarqueeItem({ words, outline, hidden }: { words: readonly string[]; outline?: boolean; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {words.map((w) => (
        <span key={w} className="flex items-center text-[clamp(2.6rem,7vw,7rem)]">
          <span
            className={`wide whitespace-nowrap px-[0.35em] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-ink ${
              outline ? "outline-num [-webkit-text-stroke-width:1.2px]" : ""
            }`}
          >
            {w}
          </span>
          <span className={`mx-[0.2em] block size-[0.28em] shrink-0 rounded-full ${outline ? "bg-blue" : "bg-teal"}`} />
        </span>
      ))}
    </div>
  );
}

function MarqueeRow({
  words,
  outline,
  rowRef,
}: {
  words: readonly string[];
  outline?: boolean;
  rowRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex w-max will-change-transform">
        <MarqueeItem words={words} outline={outline} />
        <MarqueeItem words={words} outline={outline} hidden />
        <MarqueeItem words={words} outline={outline} hidden />
      </div>
    </div>
  );
}

export default function Voices() {
  const section = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const q = voices.quotes.length;

  // marquee: base drift + scroll velocity, direction follows scroll direction
  useEffect(() => {
    if (runtime.reduced) return;
    let x = 0;
    let dir = 1;
    const el = section.current!;
    const tick = (_t: number, dtMs: number) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const v = runtime.velocity;
      if (Math.abs(v) > 0.5) dir = Math.sign(v);
      const speed = (0.6 + Math.min(Math.abs(v) * 0.45, 22)) * dir * (dtMs / 16.67);
      x -= speed;
      const wA = (rowA.current?.scrollWidth ?? 1) / 3;
      const wB = (rowB.current?.scrollWidth ?? 1) / 3;
      const a = ((x % wA) + wA) % wA;
      const b = ((-x * 0.85) % wB + wB) % wB;
      if (rowA.current) rowA.current.style.transform = `translate3d(${-a}px,0,0)`;
      if (rowB.current) rowB.current.style.transform = `translate3d(${-wB + b}px,0,0)`;
      const skew = Math.max(-8, Math.min(8, v * 0.25));
      if (rowA.current) rowA.current.style.transform += ` skewX(${-skew}deg)`;
      if (rowB.current) rowB.current.style.transform += ` skewX(${-skew}deg)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    const el = section.current!;
    const ctx = gsap.context(() => {
      const quotes = gsap.utils.toArray<HTMLElement>("[data-quote]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-qdot]");
      if (runtime.reduced) {
        ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(4, s.progress) });
        navZone(el, "light");
        return;
      }
      gsap.set(quotes.slice(1), { autoAlpha: 0 });
      let current = 0;
      const setActive = (i: number) => {
        if (i === current) return;
        const prev = current;
        current = i;
        const dir = i > prev ? 1 : -1;
        gsap.to(quotes[prev], { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
        gsap.to(quotes[prev].querySelectorAll("[data-w]"), { yPercent: -100 * dir, duration: 0.4, stagger: 0.008, ease: "power2.in" });
        gsap.set(quotes[i], { autoAlpha: 1 });
        gsap.fromTo(
          quotes[i].querySelectorAll("[data-w]"),
          { yPercent: 110 * dir },
          { yPercent: 0, duration: 0.9, stagger: 0.018, ease: "expo.out", delay: 0.2 },
        );
        dots.forEach((d, di) => d.setAttribute("aria-current", String(di === i)));
      };
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (q - 0.4)}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          setActive(Math.min(q - 1, Math.round(s.progress * (q - 1))));
          reportSection(4, s.progress);
        },
      });
      navZone(el, "light");
    }, el);
    return () => ctx.revert();
  }, [q]);

  return (
    <section ref={section} id="stimmen" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-paper text-ink">
      <div className="flex items-start justify-between px-[var(--gutter)] pt-[calc(var(--nav-h)+1.75rem)]">
        <p className="label">
          <span className="tnum">05</span> — {voices.kicker}
        </p>
        <p className="label flex gap-2 motion-reduce:hidden" aria-hidden="true">
          {voices.quotes.map((v, i) => (
            <span
              key={v.name}
              data-qdot
              aria-current={i === 0}
              className="tnum text-ink/30 transition-colors aria-[current=true]:text-ink"
            >
              {pad(i + 1)}
            </span>
          ))}
        </p>
      </div>

      {/* quotes */}
      <div className="relative flex-1 px-[var(--gutter)] motion-reduce:space-y-20 motion-reduce:py-16">
        {voices.quotes.map((v) => (
          <figure
            key={v.name}
            data-quote
            className="absolute inset-x-[var(--gutter)] top-1/2 -translate-y-1/2 motion-reduce:static motion-reduce:translate-y-0"
          >
            <blockquote className="display max-w-[22ch] text-[clamp(2.2rem,5.4vw,6rem)] italic [font-variation-settings:'opsz'_72]">
              <span className="mr-[0.1em] inline-block text-teal not-italic">“</span>
              {v.text.split(" ").map((w, wi) => (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <span data-w className="inline-block">
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </blockquote>
            <figcaption className="label mt-8 flex items-center gap-3">
              <span className="block h-px w-10 bg-ink" />
              <span>{v.name}</span>
              <span className="text-ink/50">{v.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* double marquee */}
      <div className="border-t border-ink/10 pb-6 pt-4" aria-hidden="true">
        <MarqueeRow words={voices.marqueeA} rowRef={rowA} />
        <MarqueeRow words={voices.marqueeB} outline rowRef={rowB} />
      </div>
    </section>
  );
}
