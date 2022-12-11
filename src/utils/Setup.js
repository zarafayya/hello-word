import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

  const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

  return {scene, perspectiveCamera, renderer, controls};
};