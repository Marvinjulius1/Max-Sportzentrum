"use client";

import { useEffect, type RefObject } from "react";
import * as THREE from "three";
import type { EquipmentKey } from "@/lib/content";
import { runtime } from "@/lib/runtime";
import { equipmentMaterial, loadEquipment } from "./equipment";
import { Stage, type View } from "./Stage";

export type StageSetup = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** resolves with meshes in the order of `keys` */
  meshes: Promise<THREE.Mesh[]>;
};

/**
 * Registers a scissored view on the shared Stage for the element in `ref`,
 * loads the requested equipment pieces and hands back scene/camera/meshes.
 * `frame` runs every rendered frame while the element is on screen.
 */
export function useStageView(
  ref: RefObject<HTMLElement | null>,
  keys: EquipmentKey[],
  opts: {
    fov?: number;
    distance?: number;
    setup?: (s: StageSetup) => void;
    frame?: (t: number, dt: number, meshes: THREE.Mesh[], rect: DOMRect) => void;
  },
) {
  const keyStr = keys.join(",");
  useEffect(() => {
    const el = ref.current;
    if (!el || runtime.reduced) return;
    Stage.mount();
    if (!Stage.renderer) return; // no WebGL – DOM fallback stays
    el.dataset.gl = "1";

    const scene = Stage.createScene();
    const camera = new THREE.PerspectiveCamera(opts.fov ?? 30, 1, 0.1, 100);
    camera.position.set(0, 0, opts.distance ?? 2.6);
    camera.lookAt(0, 0, 0);

    let meshes: THREE.Mesh[] = [];
    let disposed = false;
    const ks = keyStr.split(",") as EquipmentKey[];
    const meshesP = Promise.all(ks.map((k) => loadEquipment(k))).then((list) => {
      if (disposed) return [];
      meshes = list.map((a) => {
        const m = new THREE.Mesh(a.geometry, equipmentMaterial(a));
        m.userData.key = a.key;
        scene.add(m);
        return m;
      });
      return meshes;
    });
    opts.setup?.({ scene, camera, meshes: meshesP });

    const view: View = {
      el,
      scene,
      camera,
      update: (t, dt, rect) => {
        if (meshes.length) opts.frame?.(t, dt, meshes, rect);
      },
    };
    const remove = Stage.add(view);
    return () => {
      disposed = true;
      remove();
      meshes.forEach((m) => (m.material as THREE.Material).dispose());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyStr]);
}
