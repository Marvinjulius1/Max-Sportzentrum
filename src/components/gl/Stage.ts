import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { assets } from "@/lib/content";
import { gsap, trackLoad } from "@/lib/runtime";

/**
 * One WebGL context for every "product" view on the page (areas, method,
 * offer cards). A fixed, transparent, pointer-transparent canvas covers the
 * viewport; each view is a DOM element whose rect is scissored and rendered
 * into every frame – so the objects scroll perfectly with Lenis.
 *
 * Lighting recipe: studio HDRI via PMREM, environmentIntensity 1.2, env
 * rotated 90°, ACES filmic tone mapping at exposure 1.15.
 */

export type View = {
  el: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** called before rendering while visible; t = seconds, dt = delta */
  update?: (t: number, dt: number, rect: DOMRect) => void;
  /** render even when the element is off screen (never) – for pins that fade */
  enabled?: boolean;
};

class StageImpl {
  renderer: THREE.WebGLRenderer | null = null;
  canvas: HTMLCanvasElement | null = null;
  envMap: THREE.Texture | null = null;
  private envPromise: Promise<THREE.Texture | null> | null = null;
  private views = new Set<View>();
  private time = 0;
  private last = 0;
  private dirtyClear = false;

  mount() {
    if (this.renderer) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:30;";
    document.body.appendChild(canvas);
    this.canvas = canvas;
    try {
      const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2));
      r.setSize(window.innerWidth, window.innerHeight, false);
      r.setClearColor(0x000000, 0);
      r.toneMapping = THREE.ACESFilmicToneMapping;
      r.toneMappingExposure = 1.15;
      r.outputColorSpace = THREE.SRGBColorSpace;
      r.setScissorTest(true);
      this.renderer = r;
    } catch {
      canvas.remove();
      this.canvas = null;
      return;
    }
    window.addEventListener("resize", this.onResize);
    gsap.ticker.add(this.tick);
    this.last = performance.now();
  }

  private onResize = () => {
    if (!this.renderer) return;
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  };

  loadEnv(): Promise<THREE.Texture | null> {
    if (this.envPromise) return this.envPromise;
    this.mount();
    const r = this.renderer;
    if (!r) return (this.envPromise = Promise.resolve(null));
    this.envPromise = trackLoad(
      new HDRLoader().loadAsync(assets.hdri).then((hdr) => {
        const pmrem = new THREE.PMREMGenerator(r);
        const env = pmrem.fromEquirectangular(hdr).texture;
        hdr.dispose();
        pmrem.dispose();
        this.envMap = env;
        return env;
      }),
    ).catch(() => null);
    return this.envPromise;
  }

  /** Scene preconfigured with the shared environment. */
  createScene() {
    const scene = new THREE.Scene();
    scene.environmentIntensity = 1.2;
    scene.environmentRotation.set(0, Math.PI / 2, 0);
    this.loadEnv().then((env) => {
      if (env) scene.environment = env;
    });
    return scene;
  }

  add(view: View) {
    this.mount();
    this.views.add(view);
    return () => {
      this.views.delete(view);
      this.dirtyClear = true;
    };
  }

  private tick = () => {
    const r = this.renderer;
    if (!r) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;

    const W = window.innerWidth;
    const H = window.innerHeight;
    // clear the whole canvas once
    r.setScissorTest(false);
    r.clear(true, true, false);
    r.setScissorTest(true);
    this.dirtyClear = false;

    for (const v of this.views) {
      if (v.enabled === false) continue;
      const rect = v.el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > H || rect.right < 0 || rect.left > W || rect.width < 2 || rect.height < 2) continue;
      if (v.el.dataset.hidden === "1") continue;
      v.update?.(this.time, dt, rect);
      const aspect = rect.width / rect.height;
      if (Math.abs(v.camera.aspect - aspect) > 1e-4) {
        v.camera.aspect = aspect;
        v.camera.updateProjectionMatrix();
      }
      const y = H - rect.bottom;
      r.setViewport(rect.left, y, rect.width, rect.height);
      r.setScissor(rect.left, y, rect.width, rect.height);
      r.render(v.scene, v.camera);
    }
  };
}

export const Stage = new StageImpl();
