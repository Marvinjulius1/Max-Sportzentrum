import * as THREE from "three";
import { FluidSim } from "../gl/fluid.js";
import { loadCutout, silhouetteProfile } from "../gl/cutout.js";
import { snoise3 } from "../gl/noise.js";
const TEAL = new THREE.Color("#44b6c7");
const compositeVert = (
  /* glsl */
  `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
);
const compositeFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;

uniform vec2 uRes;          // css px
uniform float uDpr;
uniform float uTime;
uniform vec2 uMouse;        // eased, uv
uniform float uMouseAmt;

uniform sampler2D uVel;
uniform float uThreshold;

uniform sampler2D uWire;

uniform sampler2D uHero;
uniform vec4 uHeroRect;     // x, y, w, h in uv (y up, x,y = bottom-left)
uniform vec2 uHeroTexel;    // 1 / texture size

uniform sampler2D uMa;
uniform vec4 uMaRect;
uniform sampler2D uX;
uniform vec4 uXRect;
uniform vec3 uDot;          // centre uv.xy, radius in css px
uniform float uWordAlpha;

uniform float uFlood;
uniform vec2 uFloodCenter;

${snoise3}

// palette (logo colours + tints/shades mixed with white or black only)
const vec3 WHITE = vec3(1.0);
const vec3 INK   = vec3(0.0);
const vec3 TEAL  = vec3(0.2667, 0.7137, 0.7804);   // #44b6c7
const vec3 BLUE  = vec3(0.0196, 0.5098, 0.7843);   // #0582c8

vec3 tealMix(float t){ return t < 0.0 ? TEAL * (1.0 + t) : mix(TEAL, WHITE, t); }  // t<0 -> black
vec3 blueMix(float t){ return t < 0.0 ? BLUE * (1.0 + t) : mix(BLUE, WHITE, t); }

vec4 sampleRect(sampler2D t, vec4 r, vec2 uv){
  vec2 l = (uv - r.xy) / r.zw;
  if (l.x < 0.0 || l.y < 0.0 || l.x > 1.0 || l.y > 1.0) return vec4(0.0);
  return texture2D(t, l);
}

float lum(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main(){
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // ---------------- contour field (shared by both sides) ----------------
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  vec2 dm = p - m;
  float dist = length(dm);
  float push = exp(-dist * dist / 0.045) * 0.16 * uMouseAmt;
  vec2 q = p - normalize(dm + 1e-5) * push;
  float t = uTime * 0.035;
  float n = snoise(vec3(q * 1.35, t)) * 0.72 + snoise(vec3(q * 2.9 + 7.3, t * 1.3)) * 0.28;
  float bands = 7.0;
  float f = (n * 0.5 + 0.5) * bands;
  float fw = fwidth(f);
  float fr = fract(f);
  float line = 1.0 - smoothstep(0.0, fw * 1.25, min(fr, 1.0 - fr));
  float band = floor(f);

  // ---------------- hero cutout ----------------
  vec2 hl = (uv - uHeroRect.xy) / uHeroRect.zw;
  bool inHero = all(greaterThanEqual(hl, vec2(0.0))) && all(lessThanEqual(hl, vec2(1.0)));
  vec4 hero = inHero ? texture2D(uHero, hl) : vec4(0.0);

  // ---------------- wordmark ----------------
  vec4 ma = sampleRect(uMa, uMaRect, uv);
  vec4 xx = sampleRect(uX, uXRect, uv);
  vec2 dp = (uv - uDot.xy) * uRes;
  float dd = length(dp) - uDot.z;
  float dotA = 1.0 - smoothstep(-0.75, 0.75, dd * uDpr) ;
  dotA *= step(0.0, uDot.z);
  ma.a *= uWordAlpha; xx.a *= uWordAlpha; dotA *= uWordAlpha;

  // ================= PAPER =================
  vec3 paper = WHITE;
  paper = mix(paper, tealMix(0.55), line * 0.9);
  // wordmark ink
  paper = mix(paper, ma.rgb / max(ma.a, 1e-4), ma.a);
  paper = mix(paper, xx.rgb / max(xx.a, 1e-4), xx.a);
  paper = mix(paper, TEAL, dotA);
  // contact shadow
  vec2 sh = (uv - vec2(uHeroRect.x + uHeroRect.z * 0.5, uHeroRect.y + uHeroRect.w * 0.02)) * vec2(aspect, 1.0);
  float shadow = exp(-pow(sh.x / (uHeroRect.z * aspect * 0.34), 2.0) - pow(sh.y / 0.018, 2.0));
  paper *= 1.0 - shadow * 0.28;
  // photo (neutralised \u2013 no foreign hues on the page)
  vec3 photo = mix(vec3(lum(hero.rgb)), hero.rgb, 0.35);
  paper = mix(paper, photo, hero.a);

  // ================= NIGHT =================
  // filled bands: shades of teal / blue mixed with black, a few lighter
  float bi = mod(band, 7.0);
  vec3 night =
    bi < 0.5 ? INK :
    bi < 1.5 ? blueMix(-0.86) :
    bi < 2.5 ? tealMix(-0.78) :
    bi < 3.5 ? blueMix(-0.62) :
    bi < 4.5 ? tealMix(-0.55) :
    bi < 5.5 ? blueMix(-0.38) :
               tealMix(-0.22);
  night = mix(night, tealMix(-0.25), line * 0.55);
  // vignette toward the object keeps the centre readable
  vec2 hc = (uv - (uHeroRect.xy + uHeroRect.zw * 0.5)) * vec2(aspect, 1.0);
  night *= 0.7 + 0.3 * smoothstep(0.1, 0.9, length(hc));

  // inverted wordmark (ink becomes light)
  night = mix(night, WHITE, ma.a * 0.92);
  night = mix(night, blueMix(0.62), xx.a * 0.95);
  night = mix(night, TEAL, dotA);

  // x-ray duotone of the cutout
  float l = lum(hero.rgb);
  vec3 duo = mix(blueMix(-0.82), tealMix(0.35), smoothstep(0.03, 0.75, l));
  // rim light: opaque here, transparent a few px up-left
  vec2 o = uHeroTexel * 7.0;
  float aL = texture2D(uHero, hl + vec2(-o.x, o.y * 0.6)).a;
  float aR = texture2D(uHero, hl + vec2(o.x, o.y * 0.3)).a;
  float aD = texture2D(uHero, hl + vec2(0.0, -o.y)).a;
  float rimKey = hero.a * (1.0 - aL);
  float rimFill = hero.a * (1.0 - min(aR, aD)) * 0.45;
  vec3 xray = duo + tealMix(0.55) * (rimKey * 1.35 + rimFill);
  night = mix(night, xray, hero.a * 0.94);
  // soft glow around the object
  float glow = 0.0;
  glow += texture2D(uHero, hl + uHeroTexel * vec2(24.0, 0.0)).a;
  glow += texture2D(uHero, hl - uHeroTexel * vec2(24.0, 0.0)).a;
  glow += texture2D(uHero, hl + uHeroTexel * vec2(0.0, 24.0)).a;
  glow += texture2D(uHero, hl - uHeroTexel * vec2(0.0, 24.0)).a;
  night += TEAL * 0.08 * glow * (1.0 - hero.a) * float(inHero);

  // wireframe lathe
  vec4 wire = texture2D(uWire, uv);
  night = mix(night, tealMix(0.25), wire.a * 0.7);

  // ================= MASK =================
  vec2 vel = texture2D(uVel, uv).xy;
  float speed = length(vel);
  float fFluid = speed / uThreshold - 1.0;

  vec2 fc = (uv - uFloodCenter) * vec2(aspect, 1.0);
  float fFlood = -1e3;
  if (uFlood > 0.0005) {
    float nd = snoise(vec3(fc * 2.2, uTime * 0.15)) * 0.14 + snoise(vec3(fc * 6.0, uTime * 0.3)) * 0.04;
    fFlood = (uFlood * 1.9 - (length(fc) + nd)) * 6.0;
  }

  float field = max(fFluid, fFlood);
  float fwf = max(fwidth(field), 1e-4);
  float night01 = smoothstep(-0.5 * fwf, 0.5 * fwf, field);
  float rim = 1.0 - smoothstep(0.0, 1.6 * uDpr, abs(field) / fwf);

  vec3 col = mix(paper, night, night01);
  col = mix(col, tealMix(0.1), rim);

  gl_FragColor = vec4(col, 1.0);
}
`
);
class HeroEngine {
  renderer;
  canvas;
  opts;
  fluid;
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  mat;
  wireRT;
  wireScene = new THREE.Scene();
  wireCam = new THREE.OrthographicCamera(0, 1, 1, 0, -2e3, 2e3);
  wire;
  cutout;
  heroTex;
  ma;
  x;
  dotBase = new THREE.Vector3();
  heroBase = new THREE.Vector4();
  w = 1;
  h = 1;
  dpr = 1;
  pointer = new THREE.Vector2(0.5, 0.5);
  pointerPrev = new THREE.Vector2(0.5, 0.5);
  eased = new THREE.Vector2(0.5, 0.5);
  lastMove = -1e9;
  idleW = 1;
  hasPointer = false;
  force = new THREE.Vector2();
  effective = new THREE.Vector2(0.5, 0.5);
  effectivePrev = new THREE.Vector2(0.5, 0.5);
  progress = 0;
  time = 0;
  ready = false;
  constructor(canvas, opts) {
    this.canvas = canvas;
    this.opts = opts;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false
    });
    this.renderer.setClearColor(16777215, 1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const rect = canvas.getBoundingClientRect();
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    // render resolution: capped, and lowered automatically if frames get slow
    this.maxDpr = Math.min(window.devicePixelRatio || 1, opts.mobile ? 1.25 : 1.5);
    this.dpr = this.maxDpr;
    this.frameAvg = 16.7;
    this.frameCount = 0;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.w, this.h, false);
    this.fluid = new FluidSim(this.renderer, this.w, this.h, { scale: 0.1, iterations: 4, dissipation: 0.96 });
    this.wireRT = new THREE.WebGLRenderTarget(this.w * this.dpr, this.h * this.dpr, {
      depthBuffer: true,
      samples: 0
    });
    const empty = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
    empty.needsUpdate = true;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: compositeVert,
      fragmentShader: compositeFrag,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uRes: { value: new THREE.Vector2(this.w, this.h) },
        uDpr: { value: this.dpr },
        uTime: { value: 0 },
        uMouse: { value: this.eased },
        uMouseAmt: { value: 0 },
        uVel: { value: this.fluid.texture },
        uThreshold: { value: 0.16 },
        uWire: { value: this.wireRT.texture },
        uHero: { value: empty },
        uHeroRect: { value: new THREE.Vector4(2, 2, 0.1, 0.1) },
        uHeroTexel: { value: new THREE.Vector2(1, 1) },
        uMa: { value: empty },
        uMaRect: { value: new THREE.Vector4(2, 2, 0.1, 0.1) },
        uX: { value: empty },
        uXRect: { value: new THREE.Vector4(2, 2, 0.1, 0.1) },
        uDot: { value: new THREE.Vector3(2, 2, -1) },
        uWordAlpha: { value: 1 },
        uFlood: { value: 0 },
        uFloodCenter: { value: new THREE.Vector2(0.5, 0.5) }
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    const quad = new THREE.Mesh(geo, this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
  }
  /** Load the cutout + fonts, build textures. Resolves when the first frame can be drawn. */
  async load() {
    const [cut] = await Promise.all([loadCutout(this.opts.heroSrc, 1600), this.loadFonts()]);
    this.cutout = cut;
    const tex = new THREE.Texture(cut.img);
    tex.colorSpace = THREE.NoColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    this.heroTex = tex;
    this.mat.uniforms.uHero.value = tex;
    this.mat.uniforms.uHeroTexel.value.set(1 / cut.width, 1 / cut.height);
    this.buildWire(cut);
    this.layout();
    this.ready = true;
  }
  async loadFonts() {
    const { fontSans, fontSerif } = this.opts;
    try {
      await Promise.all([
        document.fonts.load(`800 120px ${fontSans}`),
        document.fonts.load(`italic 300 120px ${fontSerif}`)
      ]);
    } catch {
    }
  }
  buildWire(cut) {
    const prof = silhouetteProfile(cut, "y", 64);
    const pts = prof.points.map(([r, t]) => [r, 0.5 - t]);
    const pos = [];
    const radial = 64;
    const meridians = 22;
    for (let i = 2; i < pts.length - 1; i += 3) {
      const [r, y] = pts[i];
      for (let k = 0; k < radial; k++) {
        const a0 = k / radial * Math.PI * 2;
        const a1 = (k + 1) / radial * Math.PI * 2;
        pos.push(Math.sin(a0) * r, y, Math.cos(a0) * r, Math.sin(a1) * r, y, Math.cos(a1) * r);
      }
    }
    for (let k = 0; k < meridians; k++) {
      const a = k / meridians * Math.PI * 2;
      for (let i = 0; i < pts.length - 1; i++) {
        const [r0, y0] = pts[i];
        const [r1, y1] = pts[i + 1];
        pos.push(Math.sin(a) * r0, y0, Math.cos(a) * r0, Math.sin(a) * r1, y1, Math.cos(a) * r1);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.75 });
    this.wire = new THREE.LineSegments(geo, mat);
    const bb = cut.bbox;
    this.wire.userData.axisOffset = (prof.center - (bb.x0 + bb.x1) / 2) / (bb.y1 - bb.y0);
    this.wireScene.add(this.wire);
  }
  /* ------------------------------------------------------------ layout */
  makeGlyph(text, font, stretch, color, targetH, sizeRef) {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const setFont = (size2) => {
      ctx.font = font.replace("{size}", `${size2}px`);
      if ("fontStretch" in ctx) ctx.fontStretch = stretch;
    };
    setFont(sizeRef);
    let mtx = ctx.measureText(text);
    let size = sizeRef;
    if (targetH) {
      const h = mtx.actualBoundingBoxAscent + mtx.actualBoundingBoxDescent;
      size = sizeRef * targetH / Math.max(1, h);
      setFont(size);
      mtx = ctx.measureText(text);
    }
    const pad = Math.ceil(size * 0.04);
    const bw = mtx.actualBoundingBoxLeft + mtx.actualBoundingBoxRight;
    const bh = mtx.actualBoundingBoxAscent + mtx.actualBoundingBoxDescent;
    const s = this.dpr;
    c.width = Math.ceil((bw + pad * 2) * s);
    c.height = Math.ceil((bh + pad * 2) * s);
    setFont(size * s);
    ctx.fillStyle = color;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(text, (pad + mtx.actualBoundingBoxLeft) * s, (pad + mtx.actualBoundingBoxAscent) * s);
    return { canvas: c, w: bw, h: bh, pad, ascent: mtx.actualBoundingBoxAscent, descent: mtx.actualBoundingBoxDescent };
  }
  toTex(canvas, prev) {
    prev?.tex.dispose();
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.NoColorSpace;
    tex.premultiplyAlpha = false;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }
  layout() {
    if (!this.cutout) return;
    const { w, h } = this;
    const mobile = w < 768;
    const sans = this.opts.fontSans;
    const serif = this.opts.fontSerif;
    const probe = this.makeGlyph(this.opts.text.ma, `800 {size} ${sans}`, "expanded", "#44b6c7", null, 200);
    const xh0 = probe.ascent;
    const probeX = this.makeGlyph(this.opts.text.x, `italic 300 {size} ${serif}`, "normal", "#0582c8", xh0 * 2.03, 200);
    const unitW = probe.w / xh0 + 0.1 + probeX.w / xh0 + 0.12 + 0.34;
    const targetW = w * (mobile ? 0.92 : 0.9);
    let xh = targetW / unitW;
    xh = Math.min(xh, h * (mobile ? 0.3 : 0.62) / 2.03);
    const scale = xh / xh0;
    const maG = this.makeGlyph(this.opts.text.ma, `800 {size} ${sans}`, "expanded", "#44b6c7", null, 200 * scale);
    const xG = this.makeGlyph(this.opts.text.x, `italic 300 {size} ${serif}`, "normal", "#0582c8", xh * 2.03, 200);
    const total = maG.w + xh * 0.1 + xG.w + xh * 0.12 + xh * 0.34;
    const left = (w - total) / 2;
    const baseline = mobile ? h * 0.3 : h * 0.5 + xh * 0.42;
    const maX = left - maG.pad;
    const maY = baseline - maG.ascent - maG.pad;
    const maRect = this.rectUV(maX, maY, maG.w + maG.pad * 2, maG.h + maG.pad * 2);
    const xTop = baseline - xh * 1.08;
    const xLeft = left + maG.w + xh * 0.1;
    const xRect = this.rectUV(xLeft - xG.pad, xTop - xG.pad, xG.w + xG.pad * 2, xG.h + xG.pad * 2);
    const dotR = xh * 0.17;
    const dotCx = xLeft + xG.w + xh * 0.12 + dotR * 0.5;
    const dotCy = baseline + xh * 0.47;
    this.ma = { tex: this.toTex(maG.canvas, this.ma), rect: maRect.clone(), base: maRect };
    this.x = { tex: this.toTex(xG.canvas, this.x), rect: xRect.clone(), base: xRect };
    this.mat.uniforms.uMa.value = this.ma.tex;
    this.mat.uniforms.uX.value = this.x.tex;
    this.dotBase.set(dotCx / w, 1 - dotCy / h, dotR);
    const bb = this.cutout.bbox;
    const cw = this.cutout.width;
    const ch = this.cutout.height;
    const bbH = bb.y1 - bb.y0;
    const heroH = mobile ? h * 0.4 : Math.min(h * 0.58, w * 0.46);
    const pxPerSrc = heroH / bbH;
    const fullW = cw * pxPerSrc;
    const fullH = ch * pxPerSrc;
    const cx = w / 2;
    const cy = h * (mobile ? 0.62 : 0.52);
    const bbCx = (bb.x0 + bb.x1) / 2 * pxPerSrc;
    const bbCy = (bb.y0 + bb.y1) / 2 * pxPerSrc;
    const x0 = cx - bbCx;
    const y0 = cy - bbCy;
    this.heroBase.set(x0 / w, 1 - (y0 + fullH) / h, fullW / w, fullH / h);
    this.mat.uniforms.uFloodCenter.value.set(cx / w, 1 - cy / h);
    this.heroLayout = { cx, cy, heroH };
    this.applyProgress();
  }
  heroLayout = { cx: 0, cy: 0, heroH: 0 };
  rectUV(x, y, rw, rh) {
    return new THREE.Vector4(x / this.w, 1 - (y + rh) / this.h, rw / this.w, rh / this.h);
  }
  /* ------------------------------------------------------------ input */
  setPointer(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    this.pointer.set((clientX - r.left) / r.width, 1 - (clientY - r.top) / r.height);
    if (!this.hasPointer) {
      this.hasPointer = true;
      this.pointerPrev.copy(this.pointer);
    }
    this.lastMove = this.time;
  }
  /** 0..1 progress through the hero pin */
  setProgress(p) {
    this.progress = p;
    this.applyProgress();
  }
  applyProgress() {
    const p = this.progress;
    const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const clamp = (x) => Math.min(1, Math.max(0, x));
    const split = ease(clamp(p / 0.62));
    const u = this.mat.uniforms;
    if (this.ma && this.x) {
      this.ma.rect.copy(this.ma.base);
      this.ma.rect.x -= split * 0.42;
      this.ma.rect.y += split * 0.06;
      this.x.rect.copy(this.x.base);
      this.x.rect.x += split * 0.38;
      this.x.rect.y -= split * 0.1;
      u.uMaRect.value.copy(this.ma.rect);
      u.uXRect.value.copy(this.x.rect);
    }
    u.uDot.value.set(this.dotBase.x + split * 0.2, this.dotBase.y + split * 0.34, this.dotBase.z * (1 + split * 0.6));
    u.uWordAlpha.value = 1 - clamp((p - 0.45) / 0.3);
    u.uFlood.value = Math.pow(clamp((p - 0.04) / 0.62), 1.4);
    const lift = ease(clamp((p - 0.35) / 0.6));
    const s = 1 - lift * 0.2;
    const hb = this.heroBase;
    const cxu = hb.x + hb.z / 2;
    const cyu = hb.y + hb.w / 2;
    u.uHeroRect.value.set(cxu - hb.z * s / 2, cyu - hb.w * s / 2 + lift * 0.1, hb.z * s, hb.w * s);
  }
  /* ------------------------------------------------------------ frame */
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    if (Math.abs(w - this.w) < 1 && Math.abs(h - this.h) < 1) return;
    this.w = w;
    this.h = h;
    this.renderer.setSize(w, h, false);
    this.wireRT.setSize(w * this.dpr, h * this.dpr);
    this.fluid.resize(w, h);
    this.mat.uniforms.uRes.value.set(w, h);
    this.layout();
  }
  /** drop / raise the render resolution to hold the frame rate */
  adapt(dt) {
    this.frameAvg += (dt * 1000 - this.frameAvg) * 0.05;
    if (++this.frameCount < 45) return;
    let next = this.dpr;
    if (this.frameAvg > 22 && this.dpr > 0.6) next = Math.max(0.6, this.dpr - 0.2);
    else if (this.frameAvg < 12 && this.dpr < this.maxDpr) next = Math.min(this.maxDpr, this.dpr + 0.1);
    if (next !== this.dpr) {
      this.dpr = next;
      this.frameCount = 0;
      this.renderer.setPixelRatio(next);
      this.renderer.setSize(this.w, this.h, false);
      this.wireRT.setSize(Math.round(this.w * next), Math.round(this.h * next));
      this.mat.uniforms.uDpr.value = next;
      this.layout();
    }
  }
  render(dt) {
    this.adapt(dt);
    if (!this.ready) return;
    dt = Math.min(dt, 1 / 30);
    this.time += dt;
    const u = this.mat.uniforms;
    u.uTime.value = this.time;
    const idle = this.time - this.lastMove > 1.6 || !this.hasPointer;
    this.idleW += ((idle ? 1 : 0) - this.idleW) * (idle ? 0.02 : 0.2);
    const t = this.time;
    const hc = this.heroLayout;
    const vx = hc.cx / this.w + Math.sin(t * 0.62) * 0.26 + Math.sin(t * 1.7) * 0.03;
    const vy = 1 - hc.cy / this.h + Math.sin(t * 0.93 + 1.2) * 0.2;
    this.effectivePrev.copy(this.effective);
    this.effective.set(
      this.pointer.x * (1 - this.idleW) + vx * this.idleW,
      this.pointer.y * (1 - this.idleW) + vy * this.idleW
    );
    this.eased.lerp(this.effective, 1 - Math.pow(1e-3, dt));
    u.uMouseAmt.value += ((this.opts.reduced ? 0 : 1) - u.uMouseAmt.value) * 0.05;
    if (!this.opts.reduced) {
      this.force.subVectors(this.effective, this.effectivePrev).divideScalar(Math.max(dt, 1e-3));
      this.force.multiplyScalar(1 - this.idleW * 0.35);
      const maxF = 6;
      if (this.force.length() > maxF) this.force.setLength(maxF);
      this.fluid.step(dt, this.effective, this.force, this.w < 768 ? 0.07 : 0.05);
    }
    u.uVel.value = this.fluid.texture;
    if (this.wire) {
      const hr = u.uHeroRect.value;
      const cut = this.cutout;
      const bb = cut.bbox;
      const bbHuv = hr.w * (bb.y1 - bb.y0) / cut.height;
      const bbCy = hr.y + hr.w * (1 - (bb.y0 + bb.y1) / 2 / cut.height);
      const bbCx = hr.x + hr.z * ((bb.x0 + bb.x1) / 2 / cut.width);
      const hpx = bbHuv * this.h;
      this.wireCam.left = 0;
      this.wireCam.right = this.w;
      this.wireCam.top = this.h;
      this.wireCam.bottom = 0;
      this.wireCam.updateProjectionMatrix();
      this.wire.position.set(bbCx * this.w + this.wire.userData.axisOffset * hpx, bbCy * this.h, 0);
      this.wire.scale.setScalar(hpx);
      this.wire.rotation.set(0.16 + (this.eased.y - 0.5) * 0.25, t * 0.35 + (this.eased.x - 0.5) * 0.8, 0);
      const r = this.renderer;
      r.setRenderTarget(this.wireRT);
      r.setClearColor(0, 0);
      r.clear();
      r.render(this.wireScene, this.wireCam);
      r.setClearColor(16777215, 1);
    }
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.fluid.dispose();
    this.wireRT.dispose();
    this.mat.dispose();
    this.heroTex?.dispose();
    this.ma?.tex.dispose();
    this.x?.tex.dispose();
    this.wire?.geometry.dispose();
    this.wire?.material?.dispose();
    this.renderer.dispose();
  }
}
export {
  HeroEngine
};
