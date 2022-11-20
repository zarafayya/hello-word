import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import Setup from './utils/Setup';
import Lighting from './utils/Lighting';
import Plane from './utils/Plane';

// Setup
const {scene, perspectiveCamera, renderer} = Setup();

// Plane
const {plane} = Plane();
scene.add(plane);

// Model
const objectLoader = new GLTFLoader();
let mesh;
objectLoader.load('./assets/model/A.gltf', (gltf) => {
  mesh = gltf.scene;
  mesh.rotateY(Math.PI);
  mesh.rotateX(Math.PI * -0.1)
  mesh.position.set(15,10,0);
  mesh.scale.set(15, 15, 15);
  scene.add(mesh);
});

// Lighting
const {pointLight} = Lighting(0, 100, -25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helper
// const {lightHelper} = Helper(pointLight);
// scene.add(lightHelper);

// Controls
const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

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

  controls.update();
  renderer.render(scene, perspectiveCamera);
}

animate();