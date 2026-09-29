"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStageView } from "@/components/gl/useStageView";
import { assets, studio, studioSection, type EquipmentKey } from "@/lib/content";
import { gsap, navZone, reportSection, runtime, scrollToTarget, ScrollTrigger } from "@/lib/runtime";

const pad = (n: number) => String(n).padStart(2, "0");

function OfferCard({ offer, index }: { offer: (typeof studioSection.offers)[number]; index: number }) {
  const view = useRef<HTMLDivElement>(null);
  const hover = useRef(0);
  const spin = useRef(index * 1.7);

  useStageView(view, [offer.equipment as EquipmentKey], {
    fov: 24,
    distance: 3.3,
    setup: ({ scene }) => {
      const rim = new THREE.DirectionalLight("#44b6c7", 1.8);
      rim.position.set(-2, 1, -2);
      scene.add(rim);
    },
    frame: (t, dt, [m]) => {
      spin.current += dt * (0.35 + hover.current * 1.6);
      const key = m.userData.key as EquipmentKey;
      m.rotation.set(key === "plate" ? -0.3 : 0.14, spin.current, key === "dumbbell" ? 0.2 : 0);
      m.position.y = Math.sin(t * 0.9 + index) * 0.025;
      m.scale.setScalar(key === "dumbbell" ? 0.92 : 0.74);
    },
  });

  return (
    <article
      data-offer
      data-cursor={offer.cta}
      onPointerEnter={() => gsap.to(hover, { current: 1, duration: 0.6 })}
      onPointerLeave={() => gsap.to(hover, { current: 0, duration: 0.8 })}
      className="group relative flex flex-col overflow-hidden border border-ink/15 bg-paper transition-colors duration-700 hover:bg-teal-50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ink/10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_55%,var(--color-teal-100),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <p className="label absolute left-4 top-4 tnum">{pad(index + 1)}</p>
        <div ref={view} className="absolute inset-0" aria-hidden="true" />
        {/* no-GL / reduced still */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.equipment[offer.equipment as EquipmentKey].src}
          alt=""
          className="absolute inset-0 m-auto hidden h-[62%] w-auto object-contain grayscale motion-reduce:block"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="display text-[clamp(1.8rem,2.4vw,2.6rem)] [font-variation-settings:'opsz'_60]">{offer.title}</h3>
        <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-[1.5] text-ink-80">{offer.text}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <div>
            <p className="wide tnum text-[1.5rem] font-semibold leading-none">{offer.price}</p>
            <p className="label mt-2 normal-case tracking-normal text-ink-60">{offer.unit}</p>
          </div>
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#kontakt");
            }}
            className="label link-u pb-1 text-blue-700"
          >
            {offer.cta} →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Studio() {
  const section = useRef<HTMLElement>(null);
  const facts = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current!;
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-num]");
      const cells = gsap.utils.toArray<HTMLElement>("[data-fact]");
      // progress of the whole tail of the page (studio + footer) -> nav
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        endTrigger: document.getElementById("kontakt"),
        end: "bottom bottom",
        onUpdate: (s) => reportSection(5, Math.max(0.001, s.progress)),
      });
      if (runtime.reduced) {
        navZone(el, "light");
        return;
      }
      const counters = studioSection.facts.map(() => ({ v: 0 }));
      nums.forEach((n) => (n.textContent = "0"));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: facts.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.9}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      studioSection.facts.forEach((f, i) => {
        tl.to(
          counters[i],
          {
            v: f.value,
            duration: 0.6,
            ease: "power1.out",
            onUpdate: () => {
              nums[i].textContent = String(Math.round(counters[i].v));
            },
          },
          0.1 + i * 0.06,
        );
      });
      tl.to({}, { duration: 0.2 });
      gsap.from(cells, {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: facts.current, start: "top 55%" },
      });
      navZone(el, "light");

      gsap.from("[data-offer]", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-offers]", start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="studio" className="relative w-full bg-paper text-ink">
      <div ref={facts} className="relative flex min-h-[100svh] flex-col px-[var(--gutter)] pb-[var(--gutter)] pt-[calc(var(--nav-h)+1.75rem)]">
        <div className="flex items-start justify-between gap-6">
          <p className="label">
            <span className="tnum">06</span> — {studioSection.kicker}
          </p>
          <p className="label text-right text-ink-60">
            {studio.street}
            <br />
            {studio.zip} {studio.city}
          </p>
        </div>
        <h2 className="display mt-6 max-w-[12ch] text-[clamp(3rem,8vw,9rem)] [font-variation-settings:'opsz'_72]">
          {studioSection.title}
        </h2>

        <div className="mt-auto grid grid-cols-2 border-t border-ink md:grid-cols-4">
          {studioSection.facts.map((f, i) => (
            <div
              key={f.label}
              data-fact
              className={`flex flex-col justify-between gap-10 border-ink/15 py-5 pr-4 md:py-7 ${i > 0 ? "md:border-l md:pl-5" : ""} ${i % 2 === 1 ? "max-md:border-l max-md:pl-4" : ""} ${i > 1 ? "max-md:border-t" : ""}`}
            >
              <p className="label flex justify-between">
                <span>{f.label}</span>
                <span className="tnum hidden text-ink-60 md:inline">{pad(i + 1)}</span>
              </p>
              <div>
                <p className="wide tnum text-[clamp(3rem,6.4vw,6.5rem)] font-light leading-[0.85] tracking-[-0.03em]">
                  <span data-num>{f.value}</span>
                  <span className="text-teal">{f.suffix}</span>
                </p>
                <div className="mt-3 min-h-[5.25rem] text-[0.9rem] text-ink-60">
                  <p>{f.note}</p>
                {"showHours" in f && f.showHours && (
                  <ul className="label mt-3 space-y-1.5 normal-case tracking-[0.04em] text-ink-80">
                    {studio.hours.map((h) => (
                      <li key={h.days} className="tnum flex justify-between gap-3">
                        <span>{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-offers className="grid gap-4 px-[var(--gutter)] pb-[clamp(4rem,10vw,9rem)] pt-10 md:grid-cols-3">
        {studioSection.offers.map((o, i) => (
          <OfferCard key={o.id} offer={o} index={i} />
        ))}
      </div>
    </section>
  );
}
