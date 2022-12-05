import "./style.css";
import * as THREE from "three";
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Setup from "./utils/Setup";
import Lighting from "./utils/Lighting";
import Plane from "./utils/Plane";
import Model from "./utils/Model";
import gsap from "gsap";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Setup
const { scene, perspectiveCamera, renderer } = Setup();
const tl = gsap.timeline();

// Plane
Plane(scene);

// Model & Position
const gltfLoader = new GLTFLoader();

var alphabetCount = 0;

var alphabetPosition = [
  [70, -8, -46],
  [-30, -8, 45],
];

function drawModel(model, baseColor, x, y, z) {
  gltfLoader.load(model, (gltf) => {
    gltf.scene.children.forEach((element) => {
      const obj = element.getObjectByName(element.name);
      obj.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            flatShading: true,
            shininess: 100,
          });
          let color = new THREE.Color(baseColor);
          material.color = color;
          node.material = material;
        }
      });
    });
  
    gltf.scene.scale.set(20, 20, 20);
    gltf.scene.position.set(x, y, z);
    gltf.scene.rotateY(3.14159);
    gltf.scene.rotateX(-0.5);
  
    scene.add(gltf.scene);
  });
}

function drawAlphabet(model, baseColor) {
  drawModel(model, baseColor, 
    alphabetPosition[alphabetCount][0], 
    alphabetPosition[alphabetCount][1], 
    alphabetPosition[alphabetCount][2]
  ); 
  alphabetCount++;   
}

// Camera & Position
perspectiveCamera.lookAt(-20, -15, 30);



var cameraPosition = [
  [perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z] // initial camera main menu position
];

drawAlphabet("./assets/model/A.gltf", "rgba(192, 64, 39, 1)");
drawAlphabet("./assets/model/B.gltf", "rgba(236, 136, 121, 1)");


// Lighting
const { pointLight } = Lighting(0, 100, -25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Camera & Control

// Camera Modes:
// 1: Dev Mode
// 2: Alphabet Mode
var cam = 1;

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
    }
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
