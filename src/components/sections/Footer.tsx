"use client";

import { useEffect, useRef, useState } from "react";
import { assets, footer, studio, ui } from "@/lib/content";
import { gsap, navZone, runtime } from "@/lib/runtime";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      navZone(el, "dark", "top 45%");
      if (runtime.reduced) return;
      gsap.from("[data-close] span", {
        yPercent: 105,
        duration: 1.3,
        stagger: 0.03,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-close]", start: "top 92%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="kontakt" className="relative w-full overflow-hidden bg-ink text-white">
      <div className="grid grid-cols-12 gap-x-4 gap-y-14 px-[var(--gutter)] pb-10 pt-[clamp(5rem,10vw,9rem)]">
        {/* form */}
        <div className="col-span-12 md:col-span-7">
          <p className="label text-teal">{footer.formKicker}</p>
          <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.4rem,5.2vw,5.6rem)] [font-variation-settings:'opsz'_72]">
            {footer.formTitle}
          </h2>

          <form
            className="mt-12 grid max-w-2xl gap-8 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              // Placeholder: wire this to your CRM / mail endpoint.
              setSent(true);
            }}
          >
            <label className="block">
              <span className="label text-white/60">{footer.fields.name}</span>
              <input required name="name" autoComplete="name" className="underline-input mt-2 text-[1.15rem] text-white" />
            </label>
            <label className="block">
              <span className="label text-white/60">{footer.fields.contact}</span>
              <input required name="contact" autoComplete="email" className="underline-input mt-2 text-[1.15rem] text-white" />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-6 md:col-span-2">
              <p className="max-w-[40ch] text-[0.85rem] text-white/55" aria-live="polite">
                {sent ? footer.success : footer.privacy}
              </p>
              <button
                type="submit"
                disabled={sent}
                className="label group relative flex items-center gap-3 overflow-hidden rounded-full bg-teal px-6 py-4 text-ink transition-colors disabled:opacity-60"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                <span className="relative">{footer.submit}</span>
                <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </form>
        </div>

        {/* address + links */}
        <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-4 md:col-start-9 md:pt-3">
          <div>
            <p className="label text-white/50">{ui.address}</p>
            <address className="mt-3 not-italic leading-[1.6] text-white/85">
              {studio.street}
              <br />
              {studio.zip} {studio.city}
              <br />
              <a href={studio.phoneHref} className="link-u tnum">
                {studio.phone}
              </a>
              <br />
              <a href={`mailto:${studio.email}`} className="link-u">
                {studio.email}
              </a>
            </address>
            <p className="label mt-8 text-white/50">{ui.hours}</p>
            <ul className="mt-3 space-y-1 text-white/85">
              {studio.hours.map((h) => (
                <li key={h.days} className="tnum flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.8rem] text-white/45">{studio.hoursNote}</p>
          </div>
          <nav aria-label={ui.moreAria}>
            <p className="label text-white/50">{ui.more}</p>
            <ul className="mt-3 space-y-2">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-u text-white/85 hover:text-white" target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* closing */}
      <div className="px-[var(--gutter)]">
        <p
          data-close
          className="display overflow-hidden whitespace-nowrap border-t border-white/15 pt-6 text-[clamp(2rem,7.3vw,9.6rem)] italic leading-[1] tracking-[-0.03em] [font-variation-settings:'opsz'_72]"
          aria-label={footer.closing}
        >
          {footer.closing.split("").map((c, i) => (
            <span key={i} className="inline-block whitespace-pre" aria-hidden="true">
              {c}
            </span>
          ))}
        </p>
      </div>

      {/* colophon */}
      <div className="grid grid-cols-12 items-end gap-x-4 gap-y-6 px-[var(--gutter)] pb-[var(--gutter)] pt-10">
        <div className="col-span-12 md:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assets.logoInverse} alt={studio.fullName} className="h-14 w-auto" width={150} height={70} />
        </div>
        <div className="label col-span-12 space-y-1.5 leading-[1.6] text-white/45 normal-case tracking-[0.04em] md:col-span-6">
          <p>{footer.colophon.type}</p>
          <p>{footer.colophon.build}</p>
          <p>{footer.colophon.credits}</p>
        </div>
        <div className="label col-span-12 flex gap-5 text-white/60 md:col-span-3 md:justify-end">
          {footer.legal.map((l) => (
            <a key={l.label} href={l.href} className="link-u" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
          <span className="tnum">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
