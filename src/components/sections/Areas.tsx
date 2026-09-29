"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStageView } from "@/components/gl/useStageView";
import { areas, assets, type Tint } from "@/lib/content";
import { gsap, navZone, reportSection, runtime, ScrollTrigger, setNavTheme } from "@/lib/runtime";

const TINTS: Record<Tint, { bg: string; glow: string; dark: boolean; ring: string }> = {
  teal: { bg: "#f0f9fa", glow: "#b4e2e9", dark: false, ring: "#44b6c7" },
  blue: { bg: "#ebf5fa", glow: "#9bcde9", dark: false, ring: "#0582c8" },
  ink: { bg: "#000000", glow: "#1b4950", dark: true, ring: "#44b6c7" },
  white: { bg: "#ffffff", glow: "#e6e6e6", dark: false, ring: "#000000" },
};

const pad = (n: number) => String(n).padStart(2, "0");
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export default function Areas() {
  const section = useRef<HTMLElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const state = useRef({ a: 0, spin: 0 });
  const n = areas.items.length;

  useStageView(
    view,
    areas.items.map((i) => i.equipment),
    {
      fov: 26,
      distance: 3.1,
      setup: ({ scene }) => {
        const rim = new THREE.DirectionalLight("#44b6c7", 2.2);
        rim.position.set(-2, 1.5, -2);
        scene.add(rim);
        const key = new THREE.DirectionalLight("#ffffff", 0.6);
        key.position.set(2, 2, 3);
        scene.add(key);
      },
      frame: (t, dt, meshes) => {
        const s = state.current;
        s.spin += dt * 0.35;
        meshes.forEach((m, i) => {
          const d = s.a - i;
          const vis = 1 - clamp01(Math.abs(d) * 1.9);
          const e = ease(vis);
          m.visible = vis > 0.001;
          const base = m.userData.key === "dumbbell" ? 0.95 : m.userData.key === "plate" ? 0.78 : 0.82;
          m.scale.setScalar(base * (0.55 + 0.45 * e));
          m.position.set(0, -d * 0.9, 0);
          m.rotation.set(
            (m.userData.key === "plate" ? -0.25 : 0.12) + Math.sin(t * 0.6) * 0.04,
            s.spin + i * 1.3 + d * 2.4,
            m.userData.key === "dumbbell" ? 0.18 : 0,
          );
        });
      },
    },
  );

  useEffect(() => {
    const el = section.current!;
    const reduced = runtime.reduced;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-area]");
      const glows = gsap.utils.toArray<HTMLElement>("[data-glow]");
      const count = el.querySelector<HTMLElement>("[data-count]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-seg]");

      if (reduced) {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          onUpdate: (s) => reportSection(1, s.progress),
        });
        navZone(el, "light");
        return;
      }

      gsap.set(panels.slice(1), { autoAlpha: 0 });
      gsap.set(glows.slice(1), { opacity: 0 });

      let current = 0;
      const setActive = (i: number) => {
        if (i === current) return;
        const prev = current;
        current = i;
        const dir = i > prev ? 1 : -1;
        const pOut = panels[prev];
        const pIn = panels[i];
        gsap.to(pOut, { autoAlpha: 0, duration: 0.45, ease: "power2.in" });
        gsap.to(pOut.querySelectorAll("[data-rise]"), { yPercent: -40 * dir, duration: 0.45, ease: "power2.in" });
        gsap.fromTo(pIn, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.2 });
        gsap.fromTo(
          pIn.querySelectorAll("[data-rise]"),
          { yPercent: 60 * dir },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.04, delay: 0.2 },
        );
        glows.forEach((g, gi) => gsap.to(g, { opacity: gi === i ? 1 : 0, duration: 0.9, ease: "power2.inOut" }));
        if (count) count.textContent = pad(i + 1);
        const tint = TINTS[areas.items[i].tint];
        el.dataset.dark = tint.dark ? "1" : "0";
        setNavTheme(tint.dark ? "dark" : "light");
      };

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (n - 0.25)}`,
        pin: true,
        scrub: false,
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          const raw = s.progress * (n - 1);
          const i0 = Math.floor(raw);
          const f = raw - i0;
          state.current.a = Math.min(n - 1, i0 + ease(clamp01((f - 0.3) / 0.4)));
          setActive(Math.min(n - 1, Math.round(raw)));
          bars.forEach((b, bi) => {
            b.style.transform = `scaleX(${clamp01(raw - bi + 1)})`;
          });
          reportSection(1, s.progress);
        },
        onToggle: (s) => {
          if (s.isActive) setNavTheme(TINTS[areas.items[current].tint].dark ? "dark" : "light");
        },
      });
    }, el);
    return () => ctx.revert();
  }, [n]);

  return (
    <section
      ref={section}
      id="bereiche"
      data-dark="0"
      className="group/areas relative min-h-[100svh] w-full overflow-hidden text-ink data-[dark=1]:text-white motion-reduce:overflow-visible"
    >
      {/* background glows */}
      <div className="absolute inset-0 motion-reduce:hidden" aria-hidden="true">
        {areas.items.map((a) => {
          const t = TINTS[a.tint];
          return (
            <div
              key={a.id}
              data-glow
              className="absolute inset-0"
              style={{
                background: `radial-gradient(60% 70% at 68% 52%, ${t.glow} 0%, ${t.bg} 62%), ${t.bg}`,
              }}
            />
          );
        })}
        <svg className="absolute left-[68%] top-1/2 hidden h-[78vh] w-[78vh] -translate-x-1/2 -translate-y-1/2 opacity-30 md:block" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 2" />
        </svg>
      </div>

      {/* header row */}
      <div className="relative z-10 flex items-start justify-between px-[var(--gutter)] pt-[calc(var(--nav-h)+1.75rem)] motion-reduce:pb-10">
        <p className="label">
          <span className="tnum">02</span> — {areas.kicker}
        </p>
        <div className="label hidden items-center gap-3 md:flex motion-reduce:hidden" aria-hidden="true">
          <span className="tnum">
            <span data-count>01</span> / {pad(n)}
          </span>
          <span className="flex gap-1">
            {areas.items.map((a) => (
              <span key={a.id} className="block h-px w-8 bg-current/25">
                <span data-seg className="block h-px origin-left scale-x-0 bg-current" />
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* 3D view (desktop: right, mobile: centre) */}
      <div
        ref={view}
        className="pointer-events-none absolute left-[8%] right-[8%] top-[11%] h-[30%] md:left-[40%] md:right-[2%] md:top-[12%] md:h-[80%] motion-reduce:hidden"
        aria-hidden="true"
      />

      {/* panels */}
      <div className="relative z-10 motion-reduce:space-y-24 motion-reduce:pb-24">
        {areas.items.map((a, i) => (
          <article
            key={a.id}
            data-area
            className="absolute inset-x-0 top-0 grid h-[calc(100svh-var(--nav-h)-4rem)] grid-cols-12 gap-x-4 px-[var(--gutter)] motion-reduce:relative motion-reduce:h-auto"
            aria-label={a.title}
          >
            <div className="col-span-12 flex flex-col justify-end pb-[30vh] md:col-span-5 md:justify-center md:pb-0">
              <div className="overflow-hidden">
                <p data-rise className="label mb-5 opacity-70">
                  <span className="tnum">{pad(i + 1)}</span> · {a.line}
                </p>
              </div>
              <div className="overflow-hidden pb-[0.12em]">
                <h3 data-rise className="display text-[clamp(2.8rem,6.6vw,7.2rem)] [font-variation-settings:'opsz'_72]">
                  {a.title}
                </h3>
              </div>
              <div className="overflow-hidden">
                <p data-rise className="mt-6 max-w-[40ch] text-[clamp(0.98rem,1.1vw,1.1rem)] leading-[1.5] opacity-85">
                  {a.text}
                </p>
              </div>
            </div>

            {/* reduced-motion / no-GL still */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.equipment[a.equipment].src}
              alt=""
              className="hidden max-h-[40vh] w-auto justify-self-center grayscale motion-reduce:col-span-12 motion-reduce:block md:motion-reduce:col-span-7"
            />

            <div className="absolute inset-x-[var(--gutter)] bottom-0 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-current/20 pt-5 md:left-auto md:w-[min(46vw,620px)] md:grid-cols-5 motion-reduce:relative motion-reduce:inset-x-0 motion-reduce:col-span-12 motion-reduce:mt-10">
              {a.specs.map((s) => (
                <div key={s.label} className="overflow-hidden">
                  <div data-rise>
                    <p className="label opacity-60">{s.label}</p>
                    <p className="wide tnum mt-2 text-[0.95rem] font-medium">{s.value}</p>
                  </div>
                </div>
              ))}
              <div className="col-span-2 overflow-hidden md:col-span-1 md:text-right">
                <div data-rise>
                  <p className="label opacity-60">{areas.priceLabel}</p>
                  <p className="mt-1 whitespace-nowrap">
                    <span className="display tnum text-[1.9rem] leading-none">{a.price.from}</span>
                  </p>
                  <p className="label mt-1 normal-case tracking-normal opacity-60">{a.price.unit}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
