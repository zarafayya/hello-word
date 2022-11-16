import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Setup from './lib/Setup';
import Object from './lib/Object';
import Lighting from './lib/Lighting';
import Plane from './lib/Plane';
import Helper from './lib/Helper';

// Setupd
const {scene, perspectiveCamera, renderer} = Setup();

// Geometry
const {object} = Object();
scene.add(object);

// Plane
const {plane} = Plane();
scene.add(plane);

// Lighting
const {pointLight, ambientLight} = Lighting();
scene.add(pointLight, ambientLight);

// Helper
// const {lightHelper, gridHelper} = Helper(pointLight);
// scene.add(lightHelper, gridHelper);

// Controls
const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

// Texture
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

  object.rotation.x += 0.01;
  object.rotation.y += 0.01;
  object.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, perspectiveCamera);
}

animate();