import * as THREE from "three";
import { createView } from "../gl/view.js";
import { gsap, navZone, reportSection, runtime, scrollToTarget, ScrollTrigger } from "../runtime.js";

export function initMethod() {
  const el = document.getElementById("methode");
  const panels = [...el.querySelectorAll("[data-panel]")];
  const tabs = [...el.querySelectorAll("[data-tab]")];
  const ring = document.getElementById("method-ring");
  const deg = document.getElementById("method-deg");
  const n = panels.length;
  const state = { p: 0, turn: 0, px: 0, py: 0, tx: 0, ty: 0 };

  // turntable ticks
  let svg = '<circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" stroke-width="0.3"/>';
  for (let i = 0; i < 72; i++) {
    const y2 = i % 18 === 0 ? 9 : i % 6 === 0 ? 6 : 4;
    svg += `<line x1="100" y1="2" x2="100" y2="${y2}" stroke="${i === 0 ? "#44b6c7" : "currentColor"}" stroke-width="${i === 0 ? 1 : 0.3}" transform="rotate(${i * 5} 100 100)"/>`;
  }
  ring.innerHTML = svg;
  panels.forEach((p) => p.querySelector(".bar b").style.setProperty("--v", p.dataset.bar));

  if (runtime.reduced) {
    ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(2, s.progress) });
    navZone(el, "light");
    return;
  }

  if (runtime.webgl) {
    createView(el.querySelector('[data-view="method"]'), [el.dataset.equipment || "dumbbell"], {
      fov: 18,
      distance: 3.7,
      setup: ({ scene }) => {
        const rim = new THREE.DirectionalLight("#44b6c7", 1.6);
        rim.position.set(-3, 2, -3);
        scene.add(rim);
      },
      frame: (_t, dt, [mesh]) => {
        const k = 1 - Math.pow(0.0025, dt);
        state.turn += (state.p * Math.PI * 2 - state.turn) * k;
        state.px += (state.tx - state.px) * k * 0.6;
        state.py += (state.ty - state.py) * k * 0.6;
        mesh.rotation.set(0.28 + state.py * 0.22, state.turn + state.px * 0.35, 0.08 - state.px * 0.06);
        mesh.position.set(state.px * 0.05, -state.py * 0.03, 0);
        const d = ((((state.turn * 180) / Math.PI) % 360) + 360) % 360;
        deg.textContent = String(Math.round(d)).padStart(3, "0");
        ring.style.transform = `rotate(${(-state.turn * 180) / Math.PI}deg)`;
      },
    });
  }
  window.addEventListener(
    "pointermove",
    (e) => {
      state.tx = (e.clientX / innerWidth) * 2 - 1;
      state.ty = (e.clientY / innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  let current = -1;
  const setActive = (i) => {
    if (i === current) return;
    const prev = current;
    current = i;
    tabs.forEach((t, ti) => t.setAttribute("aria-selected", String(ti === i)));
    if (prev >= 0) gsap.to(panels[prev], { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" });
    gsap.fromTo(panels[i], { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: prev >= 0 ? 0.15 : 0, ease: "expo.out" });
    gsap.fromTo(panels[i].querySelector(".bar b"), { scaleX: 0 }, { scaleX: +panels[i].dataset.bar, duration: 1.1, delay: 0.25, ease: "expo.out" });
  };
  panels.forEach((p, i) => i && gsap.set(p, { autoAlpha: 0 }));
  setActive(0);

  const st = ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: () => `+=${window.innerHeight * 0.7 * n}`,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (s) => {
      state.p = s.progress;
      setActive(Math.min(n - 1, Math.floor(s.progress * n * 0.9999)));
      reportSection(2, s.progress);
    },
  });
  navZone(el, "light");
  tabs.forEach((t, i) => t.addEventListener("click", () => scrollToTarget(st.start + ((i + 0.5) / n) * (st.end - st.start))));
}
