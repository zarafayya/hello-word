import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Setup from './utils/Setup';
import Lighting from './utils/Lighting';
import Plane from './utils/Plane';
import Model from './utils/Model';
import gsap from 'gsap';

// Setup
const {scene, perspectiveCamera, renderer} = Setup();
const tl = gsap.timeline();
window.addEventListener('mousedown', () => {
  tl.to(perspectiveCamera.position, {
    z: 100,
    duration: 2,
  })
  .to(perspectiveCamera.position, {
    z: -100,
    duration: 2,
  })
})


// Plane
Plane(scene);

// Model
Model(scene, './assets/model/A.gltf', 5, 10, 0);
Model(scene, './assets/model/B.gltf', 5, 10, 200);
Model(scene, './assets/model/C.gltf', -250, 10, 200);
perspectiveCamera.lookAt(5, 10, 0);

// Lighting
const {pointLight} = Lighting(0, 100, -25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Controls
// const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

// Map Texture
const loader = new THREE.CubeTextureLoader();
const skyBox = loader.load([
  './assets/img/px.png',
  './assets/img/nx.png',
  './assets/img/py.png',
  './assets/img/ny.png',
  './assets/img/pz.png',
  './assets/img/nz.png',
]);
scene.background = skyBox;


function animate() {
  requestAnimationFrame(animate);

  // controls.update();
  renderer.render(scene, perspectiveCamera);
}

animate();