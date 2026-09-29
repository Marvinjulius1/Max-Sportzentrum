/* max – Sport- und Gesundheitszentrum · entry point */
import { runtime, ScrollTrigger } from "./runtime.js";
import { initScroll } from "./scroll.js";
import { initCursor } from "./cursor.js";
import { initPreloader } from "./preloader.js";
import { initNav } from "./nav.js";
import { initHero } from "./hero.js";
import { initAreas } from "./sections/areas.js";
import { initMethod } from "./sections/method.js";
import { initStory } from "./sections/story.js";
import { initVoices } from "./sections/voices.js";
import { initStudio } from "./sections/studio.js";
import { initFooter } from "./sections/footer.js";

const html = document.documentElement;
if (runtime.reduced) html.classList.add("reduced");
try {
  const c = document.createElement("canvas");
  runtime.webgl = !!c.getContext("webgl2");
} catch {
  runtime.webgl = false;
}
if (!runtime.webgl) html.classList.add("no-webgl");

initScroll();
initCursor();
initNav();
// sections in page order – pins must be created top to bottom
initHero();
initAreas();
initMethod();
initStory();
initVoices();
initStudio();
initFooter();
initPreloader();

document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh());
