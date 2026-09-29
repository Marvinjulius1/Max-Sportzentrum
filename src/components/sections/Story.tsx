"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { story, studio, ui } from "@/lib/content";
import { gsap, navZone, reportSection, runtime, ScrollTrigger } from "@/lib/runtime";

const pad = (n: number) => String(n).padStart(2, "0");
const THIS_YEAR = new Date().getFullYear();

const chapters = story.chapters.map((c) => ({
  ...c,
  year: c.offset === "heute" ? THIS_YEAR : studio.foundingYear + c.offset,
  isToday: c.offset === "heute",
}));

export default function Story() {
  const section = useRef<HTMLElement>(null);
  const n = chapters.length;

  useEffect(() => {
    const el = section.current!;
    const ctx = gsap.context(() => {
      const years = gsap.utils.toArray<HTMLElement>("[data-year]");
      const photos = gsap.utils.toArray<HTMLElement>("[data-photo]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-text]");
      const rail = gsap.utils.toArray<HTMLElement>("[data-rail]");
      const fill = el.querySelector<HTMLElement>("[data-fill]");

      if (runtime.reduced) {
        ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(3, s.progress) });
        navZone(el, "dark");
        return;
      }

      gsap.set(years.slice(1).flatMap((y) => Array.from(y.children)), { yPercent: 110 });
      gsap.set(photos.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(texts.slice(1), { autoAlpha: 0 });

      let current = 0;
      const setActive = (i: number) => {
        if (i === current) return;
        const prev = current;
        current = i;
        const dir = i > prev ? 1 : -1;
        gsap.to(years[prev].children, { yPercent: -110 * dir, duration: 0.6, stagger: 0.05, ease: "power3.in" });
        gsap.fromTo(
          years[i].children,
          { yPercent: 110 * dir },
          { yPercent: 0, duration: 1, stagger: 0.07, ease: "expo.out", delay: 0.25 },
        );
        photos.forEach((p, pi) => gsap.set(p, { zIndex: pi === i ? 2 : pi === prev ? 1 : 0 }));
        gsap.fromTo(
          photos[i],
          { clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" },
        );
        gsap.fromTo(photos[i].querySelector("img"), { scale: 1.25 }, { scale: 1.06, duration: 1.6, ease: "expo.out" });
        gsap.to(texts[prev], { autoAlpha: 0, y: -20 * dir, duration: 0.35, ease: "power2.in" });
        gsap.fromTo(texts[i], { autoAlpha: 0, y: 30 * dir }, { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.35, ease: "expo.out" });
        rail.forEach((r, ri) => r.setAttribute("aria-current", String(ri === i)));
      };

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (n - 0.5)}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          const raw = s.progress * (n - 1);
          setActive(Math.round(raw));
          if (fill) fill.style.transform = `scaleY(${s.progress})`;
          reportSection(3, s.progress);
        },
      });
      navZone(el, "dark");
    }, el);
    return () => ctx.revert();
  }, [n]);

  return (
    <section ref={section} id="geschichte" className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-white">
      <div className="relative z-10 flex items-start justify-between px-[var(--gutter)] pt-[calc(var(--nav-h)+1.75rem)]">
        <p className="label">
          <span className="tnum">04</span> — {story.kicker}
        </p>
        <h2 className="display hidden max-w-[18ch] text-right text-[clamp(1.4rem,2vw,2rem)] text-white/80 md:block">
          {story.title}
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-x-4 px-[var(--gutter)] pb-[var(--gutter)] pt-8 md:h-[calc(100svh-var(--nav-h)-5rem)] motion-reduce:h-auto">
        {/* year rail */}
        <ol className="col-span-12 flex gap-5 md:col-span-1 md:flex-col md:justify-center md:gap-7 motion-reduce:hidden" aria-hidden="true">
          {chapters.map((c, i) => (
            <li
              key={c.year}
              data-rail
              aria-current={i === 0}
              className="label tnum flex items-center gap-2 text-white/35 transition-colors duration-500 aria-[current=true]:text-white"
            >
              <span className="block h-px w-3 bg-current transition-all duration-500" />
              {c.isToday ? ui.today : c.year}
            </li>
          ))}
          <li className="relative ml-1 hidden h-24 w-px bg-white/15 md:block">
            <span data-fill className="absolute inset-0 block origin-top scale-y-0 bg-teal" />
          </li>
        </ol>

        {/* outlined numerals + chapter text */}
        <div className="relative col-span-12 min-h-[46svh] md:col-span-6 md:col-start-2 md:min-h-0 motion-reduce:min-h-0 motion-reduce:space-y-20">
          {chapters.map((c, i) => (
            <div key={c.year} className="absolute inset-x-0 bottom-0 motion-reduce:static">
              <div
                data-year
                aria-hidden="true"
                className="wide outline-num flex overflow-hidden text-[clamp(4.2rem,12.6vw,15rem)] font-extrabold leading-[0.86] tracking-[-0.02em] text-teal [-webkit-text-stroke-width:1.5px]"
              >
                {String(c.year)
                  .split("")
                  .map((d, di) => (
                    <span key={di} className="inline-block">
                      {d}
                    </span>
                  ))}
              </div>
              <div data-text className="mt-8 max-w-[34rem] md:mt-10">
                <p className="label text-white/60">
                  <span className="tnum">{pad(i + 1)}</span> / <span className="tnum">{pad(n)}</span> ·{" "}
                  <span className="tnum">{c.isToday ? ui.today : c.year}</span>
                </p>
                <h3 className="display mt-3 text-[clamp(1.9rem,3vw,3.2rem)] [font-variation-settings:'opsz'_60]">{c.title}</h3>
                <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-[1.5] text-white/75">{c.text}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.alt} className="mt-6 hidden w-full max-w-md grayscale motion-reduce:block" loading="lazy" />
              </div>
            </div>
          ))}
        </div>

        {/* photography */}
        <div className="relative col-span-12 mb-6 aspect-[16/10] overflow-hidden max-md:order-first md:col-span-4 md:col-start-9 md:mb-0 md:aspect-auto md:h-full motion-reduce:hidden">
          {chapters.map((c, i) => (
            <figure key={c.image} data-photo className="absolute inset-0 overflow-hidden bg-teal-950" style={{ zIndex: i === 0 ? 2 : 0 }}>
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 768px) 100vw, 34vw"
                className="scale-[1.06] object-cover grayscale contrast-[1.08]"
                priority={i === 0}
              />
              <figcaption className="label absolute bottom-3 left-3 text-white/70 mix-blend-difference">
                <span className="tnum">{ui.figure} {pad(i + 1)}</span>
              </figcaption>
            </figure>
          ))}
          <div className="pointer-events-none absolute inset-0 z-10 bg-blue mix-blend-soft-light opacity-40" />
        </div>
      </div>
    </section>
  );
}
