import "./style.css";
import * as THREE from "three";
import Setup from "./utils/Setup";
import Lighting from "./utils/Lighting";
import { Model, ColorModel, RenderPlane } from "./utils/Model";
import CameraSetup from "./utils/CameraSetup";
import Alphabet from "./utils/Alphabet";
import Card from "./utils/Card";
import IntToChar from "./utils/IntToChar";
import gsap from "gsap";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import {AddOperation} from "three";
import { Camera } from "three";

// Modes
// 1: Dev Mode
// 2: Alphabet Mode
let cam = 2;

// Setup
const { scene, perspectiveCamera, renderer, controls } = Setup();
const tl = gsap.timeline();

// Plane
// Plane(scene);
RenderPlane(scene, "./assets/model/terrain.glb", "terrain");

// Model & Position
function drawAlphabet(alphabet) {
  ColorModel(
    scene,
    Alphabet[alphabet].model,
    Alphabet[alphabet].name,
    Alphabet[alphabet].position,
    Alphabet[alphabet].rotation,
    Alphabet[alphabet].color
  );
}

function drawCard(alphabet) {
  Model(
    scene,
    Card[alphabet].model,
    Card[alphabet].name,
    Card[alphabet].position,
    Card[alphabet].rotation
  );
}

let j;

function initAlphabet(){
  j = "A";
  for (let index = 0; index < 26; index++) {
    drawAlphabet(j);
    j = String.fromCharCode(j.charCodeAt(0) + 1);
  }
}

function renderAlphabet(){
  j = "A";
  j = String.fromCharCode(j.charCodeAt(0) + flag - 1);
  console.log("[main.js] (renderAlphabet) flag: ", flag);
  console.log("[main.js] (renderAlphabet) alphabet: ", j);
  drawAlphabet(j);
}

function renderCard(){
  j = "A";
  j = String.fromCharCode(j.charCodeAt(0) + flag-1);
  console.log("[main.js] (renderCard) flag: ", flag);
  console.log("[main.js] (renderCard) card: ", j);
  drawCard(j);
}

function removeAlphabet(){
  j = "A";
  j = String.fromCharCode(j.charCodeAt(0) + flag-1);
  console.log("[main.js] (removeAlphabet) flag: ", flag);
  console.log("[main.js] (removeAlphabet) alphabet: ", j);
  scene.remove(scene.getObjectByName(j));
}

function removeCard(){
  j = "A"
  j = String.fromCharCode(j.charCodeAt(0) + flag-1);
  let card = "card" + j;
  console.log("[main.js] (removeAlphabet) flag: ", flag);
  console.log("[main.js] (removeAlphabet) card: ", card);
  scene.remove(scene.getObjectByName(card));
}

initAlphabet();

// Camera & Position
perspectiveCamera.position.set(290, 240, -660);
perspectiveCamera.lookAt(570, -15, 180);

let initialCamPosition = [
  // initial camera position
  perspectiveCamera.position.x,
  perspectiveCamera.position.y,
  perspectiveCamera.position.z,
];

let initialCamRotation = [
  perspectiveCamera.rotation.x,
  perspectiveCamera.rotation.y,
  perspectiveCamera.rotation.z,
]

// Music
const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

const backgroundSound = new THREE.Audio(listener);
audioLoader.load("./assets/bgm/YummyFlavorNCS.mp3", function (buffer) {
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true);
    backgroundSound.setVolume(0.13);
    backgroundSound.play();
});

// Lighting
const { pointLight } = Lighting(0, 400, -500);
const plHelper = new THREE.PointLightHelper(pointLight, 0.5);
plHelper.visible = false;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, plHelper, ambientLight);

// Camera & Control
let forward = false;
let back = false;
let left = false;
let right = false;
let flag = 1;

// Menulis tulisan mode kamera
let text = document.createElement("div");
text.style.position = "absolute";
text.style.width = 100;
text.style.height = 100;
text.style.backgroundColor = "blue";
text.style.top = 0 + "px";
text.style.left = 0 + "px";

// Mengatur tombol wand
let pofImg;
document.getElementById("wand-button").onclick = () => {
  pofImg = document.getElementById("pof-img");
  pofImg.classList.toggle("elementToFadeInAndOut");
  j = "A";
  j = String.fromCharCode(j.charCodeAt(0) + flag-1);
  if (scene.getObjectByName(j)){
    renderCard();
    removeAlphabet();
  } else {
    renderAlphabet();
    removeCard();
  }
};

// Camera Translation Animation
function translate(destination) {
  tl.to(perspectiveCamera.position, {
    duration: 1.6,
    x: destination.x,
    y: destination.y,
    z: destination.z,
  });
}
//camera rotation animation
function rotate(rotation) {
  let x1 = rotation.x + initialCamRotation[0];
  let y1 = rotation.y + initialCamRotation[1];
  let z1 = rotation.z + initialCamRotation[2];

  if(
    x1.toFixed(4) == perspectiveCamera.rotation.x.toFixed(4) &&
    y1.toFixed(4) == perspectiveCamera.rotation.y.toFixed(4) &&
    z1.toFixed(4) == perspectiveCamera.rotation.z.toFixed(4)
  ) return;

  tl.to(perspectiveCamera.rotation, {
    duration: 2,
    x: x1,
    y: y1,
    z: z1,
  });
}

// Set Mode Kamera
// window.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "1":
//       cam = 1;
//       break;
//     case "2":
//       cam = 2;
//       break;
//   }
// });

// Membaca saat tombol ditekan
window.addEventListener("keydown", (e) => {
  // if (cam === 1) {
  //   // Dev Mode
  //   switch (e.key) {
  //     case "w":
  //       forward = true;
  //       break;
  //     case "s":
  //       back = true;
  //       break;
  //     case "a":
  //       left = true;
  //       break;
  //     case "d":
  //       right = true;
  //       break;
  //   }
  // }
  
  if (cam === 2) {
    
    if (scene.getObjectByName("A") === undefined) {
      renderAlphabet();
    }
    if (scene.getObjectByName("cardA")) {
      removeCard();
    }

    switch (e.key) {
      case "ArrowRight":
        if (flag == 26) {
          flag = 1;
        }
        else flag++;
        break;
      case "ArrowLeft":
        if (flag == 1) {
          flag = 26;
        }
        else flag--;
        break;
    }

    let currentAlphabet = IntToChar(flag - 1);
    rotate(CameraSetup[currentAlphabet].rotation);
    translate(CameraSetup[currentAlphabet].position);

  }
});

// Membaca saat tombol berhenti ditekan
// window.addEventListener("keyup", (e) => {
//   if (cam === 1) {
//     // Dev Mode
//     switch (e.key) {
//       case "w":
//         forward = false;
//         break;
//       case "s":
//         back = false;
//         break;
//       case "a":
//         left = false;
//         break;
//       case "d":
//         right = false;
//         break;
//     }
//   }
// });

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
    perspectiveCamera.position.z += 4;
  }
  if (back) {
    perspectiveCamera.position.z -= 4;
  }
  if (left) {
    perspectiveCamera.position.x += 4;
  }
  if (right) {
    perspectiveCamera.position.x -= 4;
  }

  document.body.appendChild(text);
  // controls.update();
}

animate();
