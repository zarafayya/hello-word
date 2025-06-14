import { AmbientLight, PointLight, PointLightHelper, Scene } from "three";

export default function lighting(scene: Scene, x: number, y: number, z: number) {
  const pointLight = new PointLight(0xffffff);
  // @ts-expect-error
  pointLight.position.set(x, y, z);
  pointLight.intensity = 0.6;
  pointLight.castShadow = true;

  const plHelper = new PointLightHelper(pointLight, 0.5);
  plHelper.visible = false;
  const ambientLight = new AmbientLight(0xffffff);
  scene.add(pointLight, plHelper, ambientLight);
}