import * as THREE from 'three';

export default function Lighting(x, y, z) {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(x, y, z);
  pointLight.intensity = 0.6;
  pointLight.castShadow = true;

  return {pointLight};
}