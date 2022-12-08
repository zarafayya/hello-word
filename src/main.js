import "./style.css";
import * as THREE from "three";
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Setup from "./utils/Setup";
import Lighting from "./utils/Lighting";
import Plane from "./utils/Plane";
import { Model, ColorModel} from "./utils/Model";
import Alphabet from "./utils/Alphabet";
import Card from "./utils/Card";
import gsap from "gsap";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


// Modes
// 1: Dev Mode
// 2: Alphabet Mode
var cam = 1;

// Setup
const { scene, perspectiveCamera, renderer } = Setup();
const tl = gsap.timeline();

// Plane
Plane(scene);

// Model & Position
const gltfLoader = new GLTFLoader();

function drawAlphabet(alphabet) {
  ColorModel(
    scene,
    Alphabet[alphabet].model, 
    Alphabet[alphabet].name, 
    Alphabet[alphabet].position, 
    Alphabet[alphabet].color); 
}

function drawCard(alphabet) {
  Model(
    scene,
    Card[alphabet].model, 
    Card[alphabet].name, 
    Card[alphabet].position); 
}

// Camera & Position
perspectiveCamera.lookAt(-20, -15, 30);

var cameraPosition = [
  // initial camera main menu position
  [perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z] 
  // alphabet
];

drawAlphabet("A");
drawAlphabet("B");

// Lighting
const { pointLight } = Lighting(0, 100, -25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Camera & Control

var forward = false;
var back = false;
var left = false;
var right = false;

// Menulis tulisan mode kamera
var text = document.createElement('div');
text.style.position = 'absolute';
text.style.width = 100;
text.style.height = 100;
text.style.backgroundColor = "blue";
text.style.top = 0 + 'px';
text.style.left = 0 + 'px';

// Camera Translation Animation
function translate(x1, y1, z1, x2, y2, z2) {
  x1+=x2;
  y1+=y2;
  z1+=z2;
  tl.to(perspectiveCamera.position, {
    duration: 0.1,
    x: x1,
    y: y1,
    z: z1,
  });
}

// Set Mode Kamera
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "1":
      cam = 1;
      break;
    case "2":
      cam = 2;
      break;
    case "3":
      cam = 3;
      break;
  }
});

// Membaca saat tombol ditekan
window.addEventListener("keydown", (e) => {
  if (cam === 1) { // Dev Mode
    switch (e.key) {
      case "w":
        forward = true;
        break;
      case "s":
        back = true;
        break;
      case "a":
        left = true;
        break;
      case "d":
        right = true;
        break;
    }
  }

  else if (cam === 2) { // Alphabet Mode
    if (scene.getObjectByName('A') === undefined) 
    {
      scene.remove(scene.getObjectByName("cardA"));
      drawAlphabet("A");
    }
    switch (e.key) {
      case "w":  
        translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, 0, 0, 200);
        break;
      case "s":
        translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, 0, 0, -200);
        break;
      case "a":
        translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, 250, 0, 0);
        break;
      case "d":
        translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, -250, 0, 0);
        break;
      case "2":
        translate(35, 70, -90, 0, 0, 0);
    }
  }

  else if (cam === 3) {
    scene.remove(scene.getObjectByName("A"));
    drawCard("A");
  }
});

// Membaca saat tombol berhenti ditekan
window.addEventListener("keyup", (e) => {
  if (cam === 1) { // Dev Mode
    switch (e.key) {
      case "w":
        forward = false;
        break;
      case "s":
        back = false;
        break;
      case "a":
        left = false;
        break;
      case "d":
        right = false;
        break;
    }
  }
});

// Map Texture
const loader = new THREE.CubeTextureLoader();
const skyBox = loader.load([
  "./assets/img/px.png",
  "./assets/img/nx.png",
  "./assets/img/py.png",
  "./assets/img/ny.png",
  "./assets/img/pz.png",
  "./assets/img/nz.png",
]);
scene.background = skyBox;






function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, perspectiveCamera);
  switch (cam) {
    case 1:
      text.innerHTML = "Dev Camera";
      break;
    case 2:
      text.innerHTML = "Alphabet Camera";
      break;
    case 3:
      text.innerHTML = "Card Camera";
      break;
  }

  // Change movement from dev mode
  if (forward) {
    perspectiveCamera.position.z += 1;
  }
  if (back) {
    perspectiveCamera.position.z -= 1;
  }
  if (left) {
    perspectiveCamera.position.x += 1;
  }
  if (right) {
    perspectiveCamera.position.x -= 1;
  }

  document.body.appendChild(text);
  // controls.update();
  
}

animate();
