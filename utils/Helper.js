import * as THREE from 'three';

export default function Lighting(pointLight) {
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);

  return {lightHelper, gridHelper};
}
