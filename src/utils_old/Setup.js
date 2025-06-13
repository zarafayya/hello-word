import * as THREE from 'three';

export default function Setup() {
  const scene = new THREE.Scene();

  const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  perspectiveCamera.position.set(0, 70, -90);
  renderer.render(scene, perspectiveCamera);

  perspectiveCamera.position.set(290, 240, -660);
  perspectiveCamera.lookAt(570, -15, 180);

  let initialCamPosition = [
    perspectiveCamera.position.x,
    perspectiveCamera.position.y,
    perspectiveCamera.position.z,
  ];

  let initialCamRotation = [
    perspectiveCamera.rotation.x,
    perspectiveCamera.rotation.y,
    perspectiveCamera.rotation.z,
  ];

  return {scene, perspectiveCamera, renderer, initialCamPosition, initialCamRotation};
};