import * as THREE from 'three';

export default function Plane() {
  const planeGeo = new THREE.PlaneGeometry(1920, 1080, 35, 35);

  let disMap = new THREE.TextureLoader().load("./assets/img/heightmap.png")
  disMap.wrapS = THREE.RepeatWrapping
  disMap.wrapT = THREE.RepeatWrapping
  disMap.repeat.set(1, 1);

  // let planeLoader = new THREE.TextureLoader().load("./assets/img/grass.jpeg")
  // planeLoader.wrapS = THREE.RepeatWrapping
  // planeLoader.wrapT = THREE.RepeatWrapping
  // planeLoader.repeat.set(1,1);

  const material = new THREE.MeshStandardMaterial(
    {
      color: 0x000000,
      wireframe: true,
      // map: planeLoader,
      displacementMap: disMap,
      displacementScale: 100,
    }
  );

  const plane = new THREE.Mesh(planeGeo, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;

  return {plane}
}
