import * as THREE from "three";
import { createView } from "../gl/view.js";
import { clamp01, easeInOut, gsap, navZone, pad, reportSection, runtime, ScrollTrigger, setNavTheme } from "../runtime.js";

export function initAreas() {
  const el = document.getElementById("bereiche");
  const panels = [...el.querySelectorAll("[data-area]")];
  const glows = [...el.querySelectorAll("[data-glow]")];
  const segs = [...el.querySelectorAll("[data-seg]")];
  const count = el.querySelector("[data-count]");
  const n = panels.length;
  const state = { a: 0, spin: 0 };

  if (runtime.static) {
    ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", onUpdate: (s) => reportSection(1, s.progress) });
    navZone(el, "light");
    return;
  }

  // the one 3D view sits on the active area's empty stage cell
  const view = el.querySelector('[data-view="areas"]');
  let current = 0;
  const placeView = () => {
    const stage = panels[current].querySelector(".area__stage");
    const s = el.getBoundingClientRect();
    const r = stage.getBoundingClientRect();
    Object.assign(view.style, {
      left: `${r.left - s.left}px`,
      top: `${r.top - s.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    });
  };
  placeView();
  window.addEventListener("resize", placeView);
  ScrollTrigger.addEventListener("refresh", placeView);

  if (runtime.webgl) {
    createView(view, panels.map((p) => p.dataset.equipment), {
      fov: 26,
      distance: 3.1,
      setup: ({ scene }) => {
        const rim = new THREE.DirectionalLight("#44b6c7", 2.2);
        rim.position.set(-2, 1.5, -2);
        const key = new THREE.DirectionalLight("#ffffff", 0.6);
        key.position.set(2, 2, 3);
        scene.add(rim, key);
      },
      frame: (t, dt, meshes) => {
        state.spin += dt * 0.35;
        meshes.forEach((m, i) => {
          const d = state.a - i;
          const vis = 1 - clamp01(Math.abs(d) * 1.9);
          const k = m.userData.key;
          m.visible = vis > 0.001;
          const base = k === "dumbbell" ? 0.95 : k === "plate" ? 0.78 : 0.82;
          m.scale.setScalar(base * (0.55 + 0.45 * easeInOut(vis)));
          m.position.set(0, -d * 0.9, 0);
          m.rotation.set((k === "plate" ? -0.25 : 0.12) + Math.sin(t * 0.6) * 0.04, state.spin + i * 1.3 + d * 2.4, k === "dumbbell" ? 0.18 : 0);
        });
      },
    });
  }

  const setActive = (i) => {
    if (i === current) return;
    const prev = current;
    current = i;
    placeView();
    const dir = i > prev ? 1 : -1;
    gsap.to(panels[prev], { autoAlpha: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(panels[prev].querySelectorAll("[data-rise]"), { yPercent: -40 * dir, duration: 0.35, ease: "power2.in" });
    gsap.fromTo(panels[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.15 });
    gsap.fromTo(panels[i].querySelectorAll("[data-rise]"), { yPercent: 60 * dir }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.035, delay: 0.15 });
    glows.forEach((g, gi) => gsap.to(g, { opacity: gi === i ? 1 : 0, duration: 0.8, ease: "power2.inOut" }));
    count.textContent = pad(i + 1);
    const dark = panels[i].dataset.tint === "dark";
    el.dataset.dark = dark ? "1" : "0";
    setNavTheme(dark ? "dark" : "light");
  };

  ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: () => `+=${window.innerHeight * 0.7 * n}`,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: (s) => {
      const raw = s.progress * (n - 1);
      const i0 = Math.floor(raw);
      state.a = Math.min(n - 1, i0 + easeInOut(clamp01((raw - i0 - 0.3) / 0.4)));
      setActive(Math.min(n - 1, Math.round(raw)));
      segs.forEach((b, bi) => (b.style.transform = `scaleX(${clamp01(raw - bi + 1)})`));
      reportSection(1, s.progress);
    },
    onToggle: (s) => s.isActive && setNavTheme(panels[current].dataset.tint === "dark" ? "dark" : "light"),
  });
}
