import * as THREE from "three";
const vert = (
  /* glsl */
  `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
);
const advectFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform float uDt;
uniform float uDissipation;
void main(){
  vec2 v0 = texture2D(uVel, vUv).xy;
  // forward
  vec2 spotNew = vUv - v0 * uDt;
  vec2 vOld = texture2D(uVel, spotNew).xy;
  // backward
  vec2 spotOld = spotNew + vOld * uDt;
  vec2 err = spotOld - vUv;
  // compensated
  vec2 spotNew2 = vUv - err * 0.5;
  vec2 v2 = texture2D(uVel, spotNew2).xy;
  vec2 spotOld2 = spotNew2 - v2 * uDt;
  vec2 vel = texture2D(uVel, spotOld2).xy;
  gl_FragColor = vec4(vel * uDissipation, 0.0, 1.0);
}
`
);
const splatFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform vec2 uPoint;
uniform vec2 uForce;
uniform float uRadius;
uniform float uAspect;
void main(){
  vec2 v = texture2D(uVel, vUv).xy;
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float g = exp(-dot(d, d) / (uRadius * uRadius));
  gl_FragColor = vec4(v + uForce * g, 0.0, 1.0);
}
`
);
const divergenceFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform vec2 uPx;
void main(){
  float L = texture2D(uVel, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uVel, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uVel, vUv - vec2(0.0, uPx.y)).y;
  float T = texture2D(uVel, vUv + vec2(0.0, uPx.y)).y;
  // in cell units
  float div = 0.5 * ((R - L) / uPx.x + (T - B) / uPx.y);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`
);
const jacobiFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uDiv;
uniform vec2 uPx;
void main(){
  float L = texture2D(uPressure, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uPx.y)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uPx.y)).x;
  float div = texture2D(uDiv, vUv).x;
  gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}
`
);
const gradientFrag = (
  /* glsl */
  `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uVel;
uniform vec2 uPx;
void main(){
  float L = texture2D(uPressure, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uPx.y)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uPx.y)).x;
  vec2 v = texture2D(uVel, vUv).xy;
  v -= 0.5 * vec2((R - L) * uPx.x, (T - B) * uPx.y);
  gl_FragColor = vec4(v, 0.0, 1.0);
}
`
);
function makeRT(w, h) {
  return new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
    stencilBuffer: false
  });
}
class FluidSim {
  iterations;
  dissipation;
  scale;
  renderer;
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  quad;
  vel;
  pres;
  div;
  px = new THREE.Vector2();
  aspect = 1;
  mats;
  constructor(renderer, cssW, cssH, opts = {}) {
    this.renderer = renderer;
    this.scale = opts.scale ?? 0.1;
    this.iterations = opts.iterations ?? 4;
    this.dissipation = opts.dissipation ?? 0.96;
    const [w, h] = this.dims(cssW, cssH);
    this.vel = [makeRT(w, h), makeRT(w, h)];
    this.pres = [makeRT(w, h), makeRT(w, h)];
    this.div = makeRT(w, h);
    this.px.set(1 / w, 1 / h);
    this.aspect = cssW / cssH;
    const m = (frag, uniforms) => new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    this.mats = {
      advect: m(advectFrag, { uVel: { value: null }, uDt: { value: 0 }, uDissipation: { value: this.dissipation } }),
      splat: m(splatFrag, {
        uVel: { value: null },
        uPoint: { value: new THREE.Vector2() },
        uForce: { value: new THREE.Vector2() },
        uRadius: { value: 0.05 },
        uAspect: { value: 1 }
      }),
      div: m(divergenceFrag, { uVel: { value: null }, uPx: { value: this.px } }),
      jacobi: m(jacobiFrag, { uPressure: { value: null }, uDiv: { value: null }, uPx: { value: this.px } }),
      grad: m(gradientFrag, { uPressure: { value: null }, uVel: { value: null }, uPx: { value: this.px } })
    };
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    this.quad = new THREE.Mesh(geo, this.mats.advect);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);
    this.clear();
  }
  dims(cssW, cssH) {
    return [Math.max(16, Math.round(cssW * this.scale)), Math.max(16, Math.round(cssH * this.scale))];
  }
  get texture() {
    return this.vel[0].texture;
  }
  resize(cssW, cssH) {
    const [w, h] = this.dims(cssW, cssH);
    this.aspect = cssW / cssH;
    if (w === this.vel[0].width && h === this.vel[0].height) return;
    [...this.vel, ...this.pres, this.div].forEach((rt) => rt.setSize(w, h));
    this.px.set(1 / w, 1 / h);
    this.clear();
  }
  clear() {
    const prev = this.renderer.getRenderTarget();
    const c = new THREE.Color();
    this.renderer.getClearColor(c);
    const a = this.renderer.getClearAlpha();
    this.renderer.setClearColor(0, 0);
    [...this.vel, ...this.pres, this.div].forEach((rt) => {
      this.renderer.setRenderTarget(rt);
      this.renderer.clear(true, false, false);
    });
    this.renderer.setClearColor(c, a);
    this.renderer.setRenderTarget(prev);
  }
  pass(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.scene, this.camera);
  }
  swapVel() {
    this.vel.reverse();
  }
  /**
   * @param point pointer in uv (0..1, y up)
   * @param force impulse in uv / s
   */
  step(dt, point, force, radius = 0.05) {
    const prev = this.renderer.getRenderTarget();
    const r = this.renderer;
    const autoClear = r.autoClear;
    r.autoClear = false;
    this.mats.advect.uniforms.uVel.value = this.vel[0].texture;
    this.mats.advect.uniforms.uDt.value = dt;
    this.pass(this.mats.advect, this.vel[1]);
    this.swapVel();
    if (point && force && force.lengthSq() > 1e-8) {
      const u = this.mats.splat.uniforms;
      u.uVel.value = this.vel[0].texture;
      u.uPoint.value.copy(point);
      u.uForce.value.copy(force);
      u.uRadius.value = radius;
      u.uAspect.value = this.aspect;
      this.pass(this.mats.splat, this.vel[1]);
      this.swapVel();
    }
    this.mats.div.uniforms.uVel.value = this.vel[0].texture;
    this.pass(this.mats.div, this.div);
    for (let i = 0; i < this.iterations; i++) {
      this.mats.jacobi.uniforms.uPressure.value = this.pres[0].texture;
      this.mats.jacobi.uniforms.uDiv.value = this.div.texture;
      this.pass(this.mats.jacobi, this.pres[1]);
      this.pres.reverse();
    }
    this.mats.grad.uniforms.uPressure.value = this.pres[0].texture;
    this.mats.grad.uniforms.uVel.value = this.vel[0].texture;
    this.pass(this.mats.grad, this.vel[1]);
    this.swapVel();
    r.autoClear = autoClear;
    r.setRenderTarget(prev);
  }
  dispose() {
    [...this.vel, ...this.pres, this.div].forEach((rt) => rt.dispose());
    Object.values(this.mats).forEach((m) => m.dispose());
    this.quad.geometry.dispose();
  }
}
export {
  FluidSim
};
