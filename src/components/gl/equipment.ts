import * as THREE from "three";
import { assets, type EquipmentKey } from "@/lib/content";
import { loadCutout, silhouetteProfile, type Cutout } from "./cutout";

/**
 * Builds a physically based 3D piece from a single photo cutout:
 *  - geometry: a lathe of the photo's silhouette profile (or a disc for plates)
 *  - map: the photo itself, projected front-to-back so it wraps 360°
 *  - roughness (G) / metalness (B) packed into one map derived from the photo
 *
 * Everything is normalised so the object's longest side is 1 unit.
 */

export type EquipmentAsset = {
  key: EquipmentKey;
  geometry: THREE.BufferGeometry;
  map: THREE.DataTexture;
  orm: THREE.DataTexture;
  /** bounding size after normalisation */
  size: THREE.Vector3;
};

const cache = new Map<EquipmentKey, Promise<EquipmentAsset>>();

export function loadEquipment(key: EquipmentKey): Promise<EquipmentAsset> {
  const hit = cache.get(key);
  if (hit) return hit;
  const def = assets.equipment[key];
  const p = loadCutout(def.src, 1024).then((cut) => build(key, cut, def.axis));
  cache.set(key, p);
  return p;
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Albedo (neutralised, gently lifted), alpha kept for alphaTest, RGB bled into transparent pixels. */
function makeTextures(cut: Cutout) {
  const { width: w, height: h, data } = cut;
  const albedo = new Uint8Array(w * h * 4);
  const orm = new Uint8Array(w * h * 4);
  // average colour of opaque pixels -> bleed colour
  let ar = 0,
    ag = 0,
    ab = 0,
    n = 0;
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3] > 200) {
      ar += data[i * 4];
      ag += data[i * 4 + 1];
      ab += data[i * 4 + 2];
      n++;
    }
  }
  ar /= n || 1;
  ag /= n || 1;
  ab /= n || 1;

  // pseudo-random grain for roughness breakup
  let seed = 1234567;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (y * w + x) * 4;
      // DataTexture rows are bottom-up when flipY is false -> write flipped
      const di = ((h - 1 - y) * w + x) * 4;
      const a = data[si + 3];
      let r = a > 8 ? data[si] : ar;
      let g = a > 8 ? data[si + 1] : ag;
      let b = a > 8 ? data[si + 2] : ab;
      const mx = Math.max(r, g, b);
      const mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;
      const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      // neutralise hue (page palette stays logo-only) and lift the albedo:
      // a metal's albedo is its specular colour, a raw photo of black iron is too dark
      const k = 0.12;
      const lift = 0.16 + Math.pow(l, 0.75) * 0.95;
      r = (l + (r / 255 - l) * k) * lift * 255;
      g = (l + (g / 255 - l) * k) * lift * 255;
      b = (l + (b / 255 - l) * k) * lift * 255;
      albedo[di] = Math.min(255, r);
      albedo[di + 1] = Math.min(255, g);
      albedo[di + 2] = Math.min(255, b);
      albedo[di + 3] = a;

      // packed: G = roughness, B = metalness
      const bright = smoothstep(0.35, 0.8, l);
      const rough = Math.min(1, 0.52 - bright * 0.34 + sat * 0.4 + (rnd() - 0.5) * 0.08);
      const metal = Math.min(1, Math.max(0, (1 - sat * 2.2) * (0.78 + bright * 0.22)));
      orm[di] = 255;
      orm[di + 1] = Math.round(Math.max(0.06, rough) * 255);
      orm[di + 2] = Math.round(metal * 255);
      orm[di + 3] = 255;
    }
  }
  const map = new THREE.DataTexture(albedo, w, h, THREE.RGBAFormat);
  map.colorSpace = THREE.SRGBColorSpace;
  const ormTex = new THREE.DataTexture(orm, w, h, THREE.RGBAFormat);
  ormTex.colorSpace = THREE.NoColorSpace;
  for (const t of [map, ormTex]) {
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.anisotropy = 8;
    t.needsUpdate = true;
  }
  return { map, orm: ormTex };
}

/**
 * Planar front projection: every vertex takes the photo pixel it covers when
 * seen straight on, front and back alike – the photo, unwrapped around 360°.
 */
function projectUVs(geo: THREE.BufferGeometry, cut: Cutout, pxPerUnit: number, cx: number, cy: number) {
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const px = cx + x * pxPerUnit;
    const py = cy - y * pxPerUnit;
    uv[i * 2] = px / cut.width;
    uv[i * 2 + 1] = 1 - py / cut.height;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

function build(key: EquipmentKey, cut: Cutout, axis: "x" | "y" | "disc"): EquipmentAsset {
  const { map, orm } = makeTextures(cut);
  const bb = cut.bbox;
  const bw = bb.x1 - bb.x0;
  const bh = bb.y1 - bb.y0;
  let geometry: THREE.BufferGeometry;

  if (axis === "disc") {
    // Plate: a real cylinder. The photo shows the face at an angle; its width
    // is the true diameter, so the face maps onto a circle of that width.
    const diameter = bw;
    const thickness = 0.16; // in diameters
    const geo = new THREE.CylinderGeometry(0.5, 0.5, thickness, 96, 1, false);
    geo.rotateX(Math.PI / 2); // faces toward ±z
    // project caps from the photo's face ellipse (squash vertical to the ellipse)
    const faceH = bh - diameter * 0.1; // visible face height in px (minus the rim)
    const pos = geo.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    const cx = (bb.x0 + bb.x1) / 2;
    const cy = bb.y0 + faceH / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const px = cx + x * diameter;
      const py = cy - y * faceH;
      uv[i * 2] = px / cut.width;
      uv[i * 2 + 1] = 1 - py / cut.height;
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geometry = geo;
  } else {
    const prof = silhouetteProfile(cut, axis, 128);
    const len = prof.length; // px along the axis
    const pts = prof.points.map(([r, t]) => new THREE.Vector2(r, 0.5 - t)).reverse();
    const geo = new THREE.LatheGeometry(pts, 128);
    // lathe is built around y with height 1; for lying pieces turn it on its side
    let cx: number, cy: number;
    if (axis === "x") {
      geo.rotateZ(-Math.PI / 2);
      // after rotation: +y(top of profile) -> +x ... profile t=0 is the image's left end
      geo.rotateY(Math.PI); // make t=0 end sit on the left
      cx = prof.start + len / 2;
      cy = prof.center;
    } else {
      cx = prof.center;
      cy = prof.start + len / 2;
    }
    geo.computeVertexNormals();
    projectUVs(geo, cut, len, cx, cy);
    geometry = geo;
  }

  geometry.computeBoundingBox();
  const size = new THREE.Vector3();
  geometry.boundingBox!.getSize(size);
  const s = 1 / Math.max(size.x, size.y, size.z);
  geometry.scale(s, s, s);
  geometry.computeBoundingBox();
  geometry.boundingBox!.getSize(size);
  const center = new THREE.Vector3();
  geometry.boundingBox!.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  // keep uv projection consistent: it was computed before scaling (uv unaffected)
  return { key, geometry, map, orm, size };
}

/** The shared physical material recipe. */
export function equipmentMaterial(a: EquipmentAsset) {
  return new THREE.MeshPhysicalMaterial({
    map: a.map,
    roughnessMap: a.orm,
    metalnessMap: a.orm,
    roughness: 1,
    metalness: 0.92,
    clearcoat: 0.35,
    clearcoatRoughness: 0.28,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
    envMapIntensity: 1,
  });
}
