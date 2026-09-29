import { gsap, navZone, runtime } from "../runtime.js";

export function initFooter() {
  const el = document.getElementById("kontakt");
  navZone(el, "dark", "top 45%");
  document.getElementById("year").textContent = String(new Date().getFullYear());

  // placeholder submit – point the form's action at your mail/form service
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  form.addEventListener("submit", (e) => {
    if (form.getAttribute("action") && form.getAttribute("action") !== "#") return;
    e.preventDefault();
    note.textContent = note.dataset.success;
    form.querySelector("button").disabled = true;
  });

  const closing = document.getElementById("closing");
  closing.innerHTML = [...closing.textContent].map((c) => `<span aria-hidden="true">${c}</span>`).join("");
  if (runtime.reduced) return;
  gsap.from(closing.children, { yPercent: 105, duration: 1.2, stagger: 0.025, ease: "expo.out", scrollTrigger: { trigger: closing, start: "top 92%" } });
}
