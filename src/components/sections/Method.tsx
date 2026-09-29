"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStageView } from "@/components/gl/useStageView";
import { assets, method, ui } from "@/lib/content";
import { gsap, navZone, reportSection, runtime, scrollToTarget, ScrollTrigger } from "@/lib/runtime";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Method() {
  const section = useRef<HTMLElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGSVGElement>(null);
  const deg = useRef<HTMLSpanElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const state = useRef({ p: 0, turn: 0, px: 0, py: 0, tx: 0, ty: 0 });
  const n = method.panels.length;

  useStageView(view, [method.equipment], {
    fov: 18,
    distance: 3.7,
    setup: ({ scene }) => {
      const rim = new THREE.DirectionalLight("#44b6c7", 1.6);
      rim.position.set(-3, 2, -3);
      scene.add(rim);
    },
    frame: (_t, dt, [mesh]) => {
      const s = state.current;
      const k = 1 - Math.pow(0.0025, dt);
      s.turn += (s.p * Math.PI * 2 - s.turn) * k;
      s.px += (s.tx - s.px) * k * 0.6;
      s.py += (s.ty - s.py) * k * 0.6;
      mesh.rotation.set(0.28 + s.py * 0.22, s.turn + s.px * 0.35, 0.08 - s.px * 0.06);
      mesh.position.set(s.px * 0.05, -s.py * 0.03, 0);
      mesh.scale.setScalar(0.98);
      const d = ((((s.turn * 180) / Math.PI) % 360) + 360) % 360;
      if (deg.current) deg.current.textContent = String(Math.round(d)).padStart(3, "0");
      if (ring.current) ring.current.style.transform = `rotate(${(-s.turn * 180) / Math.PI}deg)`;
    },
  });

  useEffect(() => {
    const el = section.current!;
    const onMove = (e: PointerEvent) => {
      state.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      state.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const tabs = gsap.utils.toArray<HTMLElement>("[data-tab]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]");

      if (runtime.reduced) {
        ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(2, s.progress) });
        navZone(el, "light");
        return;
      }

      gsap.set(panels.slice(1), { autoAlpha: 0 });
      let current = -1;
      const setActive = (i: number) => {
        if (i === current) return;
        const prev = current;
        current = i;
        tabs.forEach((t, ti) => t.setAttribute("aria-selected", String(ti === i)));
        if (prev >= 0) {
          gsap.to(panels[prev], { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" });
        }
        gsap.fromTo(panels[i], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: prev >= 0 ? 0.2 : 0, ease: "expo.out" });
        gsap.fromTo(bars[i], { scaleX: 0 }, { scaleX: method.panels[i].bar, duration: 1.2, delay: 0.3, ease: "expo.out" });
      };
      setActive(0);

      st.current = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * n}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          state.current.p = s.progress;
          setActive(Math.min(n - 1, Math.floor(s.progress * n * 0.9999)));
          reportSection(2, s.progress);
        },
      });
      navZone(el, "light");
    }, el);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [n]);

  const goTo = (i: number) => {
    const s = st.current;
    if (!s) return;
    scrollToTarget(s.start + ((i + 0.5) / n) * (s.end - s.start));
  };

  return (
    <section ref={section} id="methode" className="relative min-h-[100svh] w-full overflow-hidden bg-paper text-ink">
      {/* header */}
      <div className="relative z-10 flex items-start justify-between gap-6 px-[var(--gutter)] pt-[calc(var(--nav-h)+1.75rem)]">
        <div>
          <p className="label">
            <span className="tnum">03</span> — {method.kicker}
          </p>
          <h2 className="display mt-4 max-w-[14ch] text-[clamp(1.8rem,3.2vw,3.2rem)] [font-variation-settings:'opsz'_60]">
            {method.title}
          </h2>
        </div>
        <p className="label text-right motion-reduce:hidden" aria-hidden="true">
          <span className="block opacity-60">{ui.rotation}</span>
          <span className="wide tnum mt-2 block text-[1.6rem] font-light tracking-normal">
            <span ref={deg}>000</span>°
          </span>
        </p>
      </div>

      {/* turntable + object */}
      <div className="pointer-events-none absolute inset-x-0 top-[26%] flex h-[46%] items-center justify-center md:top-[18%] md:h-[64%] motion-reduce:hidden" aria-hidden="true">
        <svg ref={ring} viewBox="0 0 200 200" className="absolute h-[min(92vw,64vh)] w-[min(92vw,64vh)] text-ink/25">
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {Array.from({ length: 72 }, (_, i) => (
            <line
              key={i}
              x1="100"
              y1="2"
              x2="100"
              y2={i % 18 === 0 ? 9 : i % 6 === 0 ? 6 : 4}
              stroke={i === 0 ? "#44b6c7" : "currentColor"}
              strokeWidth={i === 0 ? 1 : 0.3}
              transform={`rotate(${i * 5} 100 100)`}
            />
          ))}
        </svg>
        <div ref={view} className="absolute inset-0" />
      </div>

      {/* tabs */}
      <div
        role="tablist"
        aria-label={method.kicker}
        className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[calc(var(--nav-h)+9.5rem)] z-10 flex gap-4 md:bottom-[var(--gutter)] md:right-auto md:top-auto md:flex-col md:gap-2 motion-reduce:static motion-reduce:mt-10"
      >
        {method.panels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            data-tab
            aria-selected={i === 0}
            onClick={() => goTo(i)}
            className="label group flex items-center gap-3 text-left text-ink/45 transition-colors hover:text-ink aria-selected:text-ink"
          >
            <span className="block size-1.5 rounded-full bg-current opacity-0 transition-opacity group-aria-selected:bg-teal group-aria-selected:opacity-100" />
            <span className="tnum">{pad(i + 1)}</span>
            <span className="hidden md:inline">{p.tab}</span>
          </button>
        ))}
      </div>

      {/* panels */}
      <div className="absolute bottom-[var(--gutter)] left-[var(--gutter)] right-[var(--gutter)] z-10 md:left-auto md:w-[min(34vw,460px)] motion-reduce:static motion-reduce:mt-10 motion-reduce:space-y-16 motion-reduce:px-[var(--gutter)] motion-reduce:pb-24">
        {method.panels.map((p, i) => (
          <div
            key={p.id}
            data-panel
            role="tabpanel"
            className="absolute inset-x-0 bottom-0 motion-reduce:relative"
            aria-label={p.tab}
          >
            <p className="label text-blue-700">
              <span className="tnum">{pad(i + 1)}</span> · {p.tab}
            </p>
            <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.6rem)] [font-variation-settings:'opsz'_72]">{p.term}</h3>
            <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-[1.5] text-ink-80">{p.text}</p>
            <div className="mt-6 flex items-end justify-between gap-6 border-t border-ink/15 pt-4">
              <div>
                <p className="label opacity-60">{ui.dose}</p>
                <p className="wide tnum mt-2 text-[1.35rem] font-medium">{p.dose}</p>
              </div>
              <div className="w-[38%]">
                <p className="label flex justify-between opacity-60">
                  <span>{p.barLabel}</span>
                  <span className="tnum">{Math.round(p.bar * 100)}</span>
                </p>
                <span className="mt-3 block h-[3px] w-full bg-ink/10">
                  <span
                    data-bar
                    className="block h-full origin-left bg-blue"
                    style={{ transform: `scaleX(${p.bar})` }}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assets.equipment[method.equipment].src} alt="" className="mx-auto hidden w-[70vw] max-w-xl grayscale motion-reduce:block" />
    </section>
  );
}
