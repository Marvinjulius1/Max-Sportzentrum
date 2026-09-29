import * as THREE from "three";
import { equipmentMaterial, loadEquipment } from "./equipment.js";
import { Stage } from "./stage.js";
import { trackLoad } from "../runtime.js";

/**
 * Registers a scissored 3D view on the shared stage for a DOM element and
 * loads the requested equipment pieces into it.
 * `frame(t, dt, meshes, rect)` runs every rendered frame while on screen.
 */
export function createView(el, keys, { fov = 30, distance = 2.6, setup, frame } = {}) {
  Stage.mount();
  if (!Stage.renderer) return null;
  const scene = Stage.createScene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, distance);
  let meshes = [];
  const ready = trackLoad(Promise.all(keys.map((k) => loadEquipment(k))).then((list) => {
    meshes = list.map((a) => {
      const m = new THREE.Mesh(a.geometry, equipmentMaterial(a));
      m.userData.key = a.key;
      scene.add(m);
      return m;
    });
    return meshes;
  }));
  setup?.({ scene, camera });
  Stage.add({
    el,
    scene,
    camera,
    update: (t, dt, rect) => {
      if (meshes.length) frame?.(t, dt, meshes, rect);
    },
  });
  return { scene, camera, ready };
}
