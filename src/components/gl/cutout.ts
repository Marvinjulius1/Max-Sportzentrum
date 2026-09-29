/**
 * Loads a transparent PNG cutout and extracts what the 3D code needs:
 * raw RGBA pixels, the alpha bounding box and a silhouette profile
 * (radius along the object's axis) for lathing.
 */

export type Cutout = {
  src: string;
  img: HTMLImageElement;
  width: number;
  height: number;
  /** straight (non-premultiplied) RGBA */
  data: Uint8ClampedArray;
  bbox: { x0: number; y0: number; x1: number; y1: number };
};

const cache = new Map<string, Promise<Cutout>>();

export function loadCutout(src: string, maxSize = 1400): Promise<Cutout> {
  const hit = cache.get(src);
  if (hit) return hit;
  const p = new Promise<Cutout>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const s = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * s);
      const h = Math.round(img.naturalHeight * s);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let x0 = w,
        y0 = h,
        x1 = 0,
        y1 = 0;
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] > 127) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
      resolve({ src, img, width: w, height: h, data, bbox: { x0, y0, x1: x1 + 1, y1: y1 + 1 } });
    };
    img.onerror = reject;
    img.src = src;
  });
  cache.set(src, p);
  return p;
}

export type Profile = {
  /** [radius, t] pairs; t runs 0..1 along the axis, radius in axis-length units */
  points: [number, number][];
  /** pixel coordinate of the rotation axis (perpendicular direction) */
  center: number;
  /** pixel start / length along the axis */
  start: number;
  length: number;
};

/**
 * Silhouette profile: for each slice across the axis take the outer extent
 * of opaque pixels and measure it from the object's centre line.
 * axis "y" = upright (slices are rows), axis "x" = lying (slices are columns).
 */
export function silhouetteProfile(c: Cutout, axis: "x" | "y", samples = 96): Profile {
  const { data, width: w, bbox } = c;
  const along0 = axis === "y" ? bbox.y0 : bbox.x0;
  const along1 = axis === "y" ? bbox.y1 : bbox.x1;
  const across0 = axis === "y" ? bbox.x0 : bbox.y0;
  const across1 = axis === "y" ? bbox.x1 : bbox.y1;
  const length = along1 - along0;

  const lo: number[] = [];
  const hi: number[] = [];
  for (let i = 0; i < samples; i++) {
    const a = Math.min(along1 - 1, Math.round(along0 + ((i + 0.5) / samples) * length));
    let mn = Infinity,
      mx = -Infinity;
    for (let b = across0; b < across1; b++) {
      const x = axis === "y" ? b : a;
      const y = axis === "y" ? a : b;
      if (data[(y * w + x) * 4 + 3] > 127) {
        if (b < mn) mn = b;
        if (b > mx) mx = b;
      }
    }
    lo.push(mn);
    hi.push(mx);
  }
  // centre line: median of slice centres (robust against perspective)
  const centres = lo.map((l, i) => (Number.isFinite(l) ? (l + hi[i]) / 2 : NaN)).filter((v) => !Number.isNaN(v));
  centres.sort((a, b) => a - b);
  const center = centres[Math.floor(centres.length / 2)] ?? (across0 + across1) / 2;

  let radii = lo.map((l, i) => (Number.isFinite(l) ? Math.max(center - l, hi[i] - center) / length : 0));
  // light smoothing
  radii = radii.map((r, i) => {
    const a = radii[Math.max(0, i - 1)];
    const b = radii[Math.min(radii.length - 1, i + 1)];
    return r * 0.5 + (a + b) * 0.25;
  });

  const points: [number, number][] = [[0, 0]];
  radii.forEach((r, i) => points.push([Math.max(0.002, r), (i + 0.5) / samples]));
  points.push([0, 1]);
  return { points, center, start: along0, length };
}
