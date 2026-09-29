import * as THREE from "three";
import { createView } from "../gl/view.js";
import { gsap, navZone, reportSection, runtime, ScrollTrigger } from "../runtime.js";

export function initStudio() {
  const el = document.getElementById("studio");
  const facts = document.getElementById("studio-facts");
  const nums = [...el.querySelectorAll("[data-num]")];
  const cells = [...el.querySelectorAll("[data-fact]")];
  const offers = [...el.querySelectorAll("[data-offer]")];

  // studio + footer count as the last nav section (created after the pin below)
  const trackProgress = () =>
    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      endTrigger: document.getElementById("kontakt"),
      end: "bottom bottom",
      onUpdate: (s) => reportSection(5, Math.max(0.001, s.progress)),
    });

  if (runtime.static) {
    trackProgress();
    navZone(el, "light");
    return;
  }

  // live 3D piece per offer card
  if (runtime.webgl) {
    offers.forEach((card, index) => {
      const view = card.querySelector("[data-view]");
      const hover = { v: 0 };
      let spin = index * 1.7;
      card.addEventListener("pointerenter", () => gsap.to(hover, { v: 1, duration: 0.6 }));
      card.addEventListener("pointerleave", () => gsap.to(hover, { v: 0, duration: 0.8 }));
      createView(view, [view.dataset.equipment], {
        fov: 24,
        distance: 3.3,
        setup: ({ scene }) => {
          const rim = new THREE.DirectionalLight("#44b6c7", 1.8);
          rim.position.set(-2, 1, -2);
          scene.add(rim);
        },
        frame: (t, dt, [m]) => {
          spin += dt * (0.35 + hover.v * 1.6);
          const k = m.userData.key;
          m.rotation.set(k === "plate" ? -0.3 : 0.14, spin, k === "dumbbell" ? 0.2 : 0);
          m.position.y = Math.sin(t * 0.9 + index) * 0.025;
          m.scale.setScalar(k === "dumbbell" ? 0.92 : 0.74);
        },
      });
    });
  }

  // facts: pinned briefly, numbers count up with the scroll
  nums.forEach((n) => (n.textContent = "0"));
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: facts,
      start: "top top",
      end: () => `+=${window.innerHeight * 0.6}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });
  nums.forEach((n, i) => {
    const c = { v: 0 };
    const to = +n.dataset.num;
    tl.to(c, { v: to, duration: 0.6, ease: "power1.out", onUpdate: () => (n.textContent = String(Math.round(c.v))) }, i * 0.06);
  });
  tl.to({}, { duration: 0.2 });
  trackProgress();
  gsap.from(cells, { y: 60, opacity: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: facts, start: "top 55%" } });
  gsap.from(offers, { y: 80, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el.querySelector(".offers"), start: "top 80%" } });
  navZone(el, "light");
}
