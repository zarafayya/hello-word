import "./style.css";
import * as THREE from "three";
import Setup from "./utils/Setup";
import Lighting from "./utils/Lighting";
// import Plane from "./utils/Plane";
import { Model, ColorModel, RenderPlane } from "./utils/Model";
import Alphabet from "./utils/Alphabet";
import Card from "./utils/Card";
import gsap from "gsap";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Modes
// 1: Dev Mode
// 2: Alphabet Mode
var cam = 2;

// Setup
const { scene, perspectiveCamera, renderer, controls } = Setup();
const tl = gsap.timeline();

// Plane
// Plane(scene);
RenderPlane(scene, "./assets/model/terrain.glb", "terrain");

// Model & Position
const gltfLoader = new GLTFLoader();

function drawAlphabet(alphabet) {
  ColorModel(
    scene,
    Alphabet[alphabet].model,
    Alphabet[alphabet].name,
    Alphabet[alphabet].position,
    Alphabet[alphabet].color
  );
}

function drawCard(alphabet) {
  Model(
    scene,
    Card[alphabet].model,
    Card[alphabet].name,
    Card[alphabet].position
  );
}

// Camera & Position
perspectiveCamera.position.set(290, 240, -660);
perspectiveCamera.lookAt(570, -15, 180);

var cameraPosition = [
  // initial camera position
  perspectiveCamera.position.x,
  perspectiveCamera.position.y,
  perspectiveCamera.position.z,
];

var j = "A";

for (let index = 0; index < 26; index++) {
  drawAlphabet(j);
  
  j = String.fromCharCode(j.charCodeAt(0) + 1);
  console.log("testlog " + j);
}
drawCard("Q");


// Lighting
const { pointLight } = Lighting(0, 400, -500);
const plHelper = new THREE.PointLightHelper(pointLight, 0.5);
plHelper.visible = false;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, plHelper, ambientLight);

// Camera & Control
var forward = false;
var back = false;
var left = false;
var right = false;
var flag = 1;
var altflag = -1;
var adj1 =false;

// Menulis tulisan mode kamera
var text = document.createElement("div");
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
  console.log(pofImg.classList);
  if (cam == 3) {
    cam = 2;
    if (scene.getObjectByName("A") === undefined) {
      j = "A";
      for (let index = 0; index < 6; index++) {
        drawAlphabet(j);
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }
    if (scene.getObjectByName("cardA")) {
      scene.remove(scene.getObjectByName("cardA"));
      scene.remove(scene.getObjectByName("cardB"));
      scene.remove(scene.getObjectByName("cardC"));
      scene.remove(scene.getObjectByName("cardD"));
      scene.remove(scene.getObjectByName("cardE"));
      scene.remove(scene.getObjectByName("cardF"));
    }
  }
  else {
    cam = 3;
    if (scene.getObjectByName("cardA") === undefined) {
      // Mewakili state card yg lainnya
      j = "A";
      for (let index = 0; index < 6; index++) {
        drawCard(j);
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }

    if (scene.getObjectByName("A")) {
      j = "A";
      for (let index = 0; index < 6; index++) {
        scene.remove(scene.getObjectByName(j));
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }
  }
};

// Camera Translation Animation
function translate(destinationX, destinationY, destinationZ) {
  tl.to(perspectiveCamera.position, {
    duration: 0.5,
    x: destinationX,
    y: destinationY,
    z: destinationZ,
  });
}
//camera rotation animation
var rotated = false;
function rotate(x1, y1, z1, x2, y2, z2) {
  x1 += x2;
  y1 += y2;
  z1 += z2;
  tl.to(perspectiveCamera.rotation, {
    duration: 0.5,
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
  if (cam === 1) {
    // Dev Mode
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
  } else if (cam === 2) {
    
    // Alphabet Mode
    if (scene.getObjectByName("A") === undefined) {
      // Mewakili state card yg lainnya
      j = "A";
      for (let index = 0; index < 6; index++) {
        drawAlphabet(j);
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }

    if (scene.getObjectByName("cardA")) {
      scene.remove(scene.getObjectByName("cardA"));
      scene.remove(scene.getObjectByName("cardB"));
      scene.remove(scene.getObjectByName("cardC"));
      scene.remove(scene.getObjectByName("cardD"));
      scene.remove(scene.getObjectByName("cardE"));
      scene.remove(scene.getObjectByName("cardF"));
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
    if (flag != altflag) {
      console.log(flag);
      switch (flag) {
        case 1: //A
          translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
          break;
        case 2: //B
          translate(320, 200, -550);
          break;
        case 3: //C
          translate(340, 125, -400);
          break;
        case 4: //D
          translate(190, 30, -320);
          break;
        case 5: //E
          translate(25, 10, -250);
          break;
        case 6: //F
          translate(-140, 10, -190);
          break;
        case 7: //G
          translate(-340, 10, -100);
          break;
        case 8: //H
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          };
          translate(-250, 10, -20);
          break;
        case 9: //I Easter Egg
          translate(-320, 10, 80);
          if (adj1 == false) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, 0.6, 0);
            adj1 = true;
          };
          break;
        case 10: //J
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          }
          translate(-250, 10, 150);
          break;
        case 11: //K
          translate(-400, 30, 250);
          break;
        case 12: //L
          translate(-250, 10, 270);
          break;
        case 13: //M
          translate(-400, 10, 380);
          break;
        case 14: //N
          translate(-290, 10, 450);
          break;
        case 15: //O
          translate(-75, 10, 400);
          break;
        case 16: //P
          translate(100, 25, 500);
          break;
        case 17: //Q
          translate(290, 35, 475);
          break;
        case 18: //R
          translate(535, 180, 475);
          break;
        case 19: //S
          translate(780, 150, 350);
          break;
        case 20: //T
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          };
          translate(950, 85, 300);
          break;
        case 21: //U Easter Egg
          translate(850, 150, 175);
          if (adj1 == false) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, 0.6, 0);
            adj1 = true;
          };
          break;
        case 22: //V
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          };
          translate(860, 50, 50);
          break;
        case 23: //W
          translate(750, 50, -100);
          break;
        case 24: //X
          translate(900, 50, -200);
          break;
        case 25: //Y
          translate(675, 100, -150);
          break;
        case 26: //Z
          translate(550, 50, -50);
          break;
      }
    }
  } else if (cam === 3) {
    if (scene.getObjectByName("cardA") === undefined) {
      // Mewakili state card yg lainnya
      j = "A";
      for (let index = 0; index < 6; index++) {
        drawCard(j);
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }

    if (scene.getObjectByName("A")) {
      j = "A";
      for (let index = 0; index < 6; index++) {
        scene.remove(scene.getObjectByName(j));
        j = String.fromCharCode(j.charCodeAt(0) + 1);
        console.log(j);
      }
    }
    // var x = perspectiveCamera.position.x;
    // var z = perspectiveCamera.position.z;
    // if (x<0) {
    //   x*=-1;
    // }
    // if (z<0) {
    //   z*=-1;
    // }
    // x%=100;
    // z%=100;
    // x-=35;
    // z-=90;
    // translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, -x, 0, z);
    scene.remove(scene.getObjectByName("A"));
    scene.remove(scene.getObjectByName("B"));
  }
});

// Membaca saat tombol berhenti ditekan
window.addEventListener("keyup", (e) => {
  if (cam === 1) {
    // Dev Mode
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
