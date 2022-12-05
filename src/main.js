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

// Textures

// Model
Model(scene, "./assets/model/A.gltf", 5, 10, 0);
Model(scene, "./assets/model/B.gltf", 5, 10, 200);
Model(scene, "./assets/model/C.gltf", -250, 10, 200);
perspectiveCamera.lookAt(5, 10, 0);

// loader for GLTF D model
const gltfLoader = new GLTFLoader();

gltfLoader.load("./assets/model/D.gltf", (gltf) => {
  gltf.scene.children.forEach((element) => {
    const obj = element.getObjectByName(element.name);
    obj.traverse(function (node) {
      if (node.isMesh) {
        const material = new THREE.MeshPhongMaterial({
          color: 0xff0000, // red (can also use a CSS color string here)
          flatShading: true,
          shininess: 100,
        });
        let color = new THREE.Color(0xaa5511);
        material.color = color;
        node.material = material;
      }
    });
  });

  gltf.scene.scale.set(20, 20, 20);
  gltf.scene.position.set(5, 10, 300);
  gltf.scene.rotateY(3.14159);
  scene.add(gltf.scene);
});
// scene.add(obj, material);

// Lighting
const { pointLight } = Lighting(0, 100, -25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Camera & Control

// Camera Modes:
// 1: Dev Mode
// 2: Play Mode
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

perspectiveCamera.position.y -= 30;
perspectiveCamera.rotation.x -= 0.4;

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

// rotate
window.addEventListener("keydown", (e) => {
  // switch (e.key) {
  //   case "d":
  //     perspectiveCamera.rotation.y += 0.1;
  //     break;
  //   case "a":
  //     perspectiveCamera.rotation.y -= 0.1;
  //     break;
  //   case "s":
  //     perspectiveCamera.rotation.x += 0.1;
  //     break;
  //   case "w":
  //     perspectiveCamera.rotation.x -= 0.1;
  //     break;
  // }
});

// camera translation animate
function translate(x, y, z, x1, y1, z1) {
  
  x=x+x1;
  y=y+y1;
  z=z+z1;
  tl.to(perspectiveCamera.position, {
    duration: 0.1,
    x: x,
    y: y,
    z: z,
  });
}

// Membaca saat tombol ditekan
window.addEventListener("keydown", (e) => {
  if (cam === 2) { // Play Mode
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
        translate(0, 40, -90, 0, 0, 0);
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
      text.innerHTML = "Play Camera";
      break;
  }

  // Change Movement
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
