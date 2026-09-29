import * as THREE from "three";
import { HDRLoader } from "three";
import { config, gsap, resolveAsset, trackLoad } from "../runtime.js";
class StageImpl {
  renderer = null;
  canvas = null;
  envMap = null;
  envPromise = null;
  views = new Set();
  drewLast = true;
  time = 0;
  last = 0;
  mount() {
    if (this.renderer) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:30;";
    document.body.appendChild(canvas);
    this.canvas = canvas;
    try {
      const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.5));
      r.setSize(window.innerWidth, window.innerHeight, false);
      r.setClearColor(0, 0);
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
  onResize = () => {
    if (!this.renderer) return;
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  loadEnv() {
    if (this.envPromise) return this.envPromise;
    this.mount();
    const r = this.renderer;
    if (!r) return this.envPromise = Promise.resolve(null);
    this.envPromise = trackLoad(
      new HDRLoader().loadAsync(resolveAsset(config.hdri)).then((hdr) => {
        const pmrem = new THREE.PMREMGenerator(r);
        const env = pmrem.fromEquirectangular(hdr).texture;
        hdr.dispose();
        pmrem.dispose();
        this.envMap = env;
        return env;
      })
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
  add(view) {
    this.mount();
    this.views.add(view);
    return () => {
      this.views.delete(view);
    };
  }
  tick = () => {
    const r = this.renderer;
    if (!r) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1e3);
    this.last = now;
    this.time += dt;
    const W = window.innerWidth;
    const H = window.innerHeight;
    // collect visible views first – if none, skip all GPU work
    const visible = [];
    for (const v of this.views) {
      const rect = v.el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > H || rect.right < 0 || rect.left > W || rect.width < 2 || rect.height < 2) continue;
      visible.push([v, rect]);
    }
    if (!visible.length && !this.drewLast) return;
    this.drewLast = visible.length > 0;
    r.setScissorTest(false);
    r.clear(true, true, false);
    r.setScissorTest(true);
    for (const [v, rect] of visible) {
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
const Stage = new StageImpl();
export {
  Stage
};
