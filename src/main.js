import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
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
var cam = 1;

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
perspectiveCamera.position.set(280, 250, -680);
perspectiveCamera.lookAt(600, -15, 180);
// perspectiveCamera.position.set(600, 400, 680);
// perspectiveCamera.lookAt(600, -15, 690);

var cameraPosition = [
  // initial camera main menu position
  [
    perspectiveCamera.position.x,
    perspectiveCamera.position.y,
    perspectiveCamera.position.z,
  ],
  // alphabet
];

var j = "A";

for (let index = 0; index < 26; index++) {
  drawAlphabet(j);
  //drawCard(j);
  j = String.fromCharCode(j.charCodeAt(0) + 1);
  console.log("testlog " + j);
}

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
var flag = -1;
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
document.getElementById("wand-button").onclick = () => {
  let bodyID = document.getElementsByTagName("body")[0].id;
  if (bodyID.length == 0) {
    console.log("POF");
    document.getElementsByTagName("body")[0].id = "wand";
  } else {
    document.getElementsByTagName("body")[0].id = "";
  }
};

// Camera Translation Animation
function translate(x1, y1, z1, x2, y2, z2) {
  x1 += x2;
  y1 += y2;
  z1 += z2;
  tl.to(perspectiveCamera.position, {
    duration: 0.1,
    x: x1,
    y: y1,
    z: z1,
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
      case "w":
        if (rotated == false) {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            0,
            0,
            100
          );
          break;
        } else {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            0,
            0,
            -100
          );
          break;
        }
      case "s":
        if (rotated == false) {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            0,
            0,
            -100
          );
          break;
        } else {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            0,
            0,
            100
          );
          break;
        }
      case "a":
        if (rotated == false) {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            100,
            0,
            0
          );
          break;
        } else {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            -100,
            0,
            100
          );
          break;
        }
      case "d":
        if (rotated == false) {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            -100,
            0,
            0
          );
          break;
        } else {
          translate(
            perspectiveCamera.position.x,
            perspectiveCamera.position.y,
            perspectiveCamera.position.z,
            100,
            0,
            0
          );
          break;
        }
      case "2":
        translate(280, 250, -680, 0, 0, 0);
        perspectiveCamera.lookAt(600, -15, 180);
        flag = -1;
        break;
      case "e":
        if (rotated == false) {
          rotate(
            perspectiveCamera.rotation.x,
            perspectiveCamera.rotation.y,
            perspectiveCamera.rotation.z,
            -0.6,
            -3.5,
            0
          );
          rotated = true;
        } else {
          rotate(
            perspectiveCamera.rotation.x,
            perspectiveCamera.rotation.y,
            perspectiveCamera.rotation.z,
            0.6,
            3.5,
            0
          );
          rotated = false;
        }
      case "ArrowLeft":
        if (flag <= 0) {
          flag = 1;
        }
        flag--;
        // translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, 100, 0, 0);
        break;
      case "ArrowRight":
        if (flag >= 26) {
          flag = 26;
        }
        flag++;
        // translate(perspectiveCamera.position.x, perspectiveCamera.position.y, perspectiveCamera.position.z, -100, 0, 0);
        break;
    }
    if (flag != altflag) {
      switch (flag) {
        case 0:
          flag = 27;
          adj1=false;
        case 1: //A
          translate(280, 250, -679, 0, 0, 0);
          perspectiveCamera.lookAt(600, -15, 180);
          break;
        case 2: //B
          translate(320, 200, -550, 0, 0, 0);
          break;
        case 3: //C
          translate(360, 125, -420, 0, 0, 0);
          break;
        case 4: //D
          translate(220, 10, -340, 0, 0, 0);
          break;
        case 5: //E
          translate(25, 10, -280, 0, 0, 0);
          break;
        case 6: //F
          translate(-150, 10, -200, 0, 0, 0);
          break;
        case 7: //G
          translate(-370, 10, -150, 0, 0, 0);
          break;
        case 8: //H
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          };
          translate(-250, 10, -20, 0, 0, 0);
          break;
        case 9: //I Easter Egg
          translate(-320, 10, 80, 0, 0, 0);
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
          translate(-250, 10, 150, 0, 0, 0);
          break;
        case 11: //K
          translate(-400, 30, 200, 0, 0, 0);
          break;
        case 12: //L
          translate(-250, 10, 270, 0, 0, 0);
          break;
        case 13: //M
          translate(-400, 10, 350, 0, 0, 0);
          break;
        case 14: //N
          translate(-290, 10, 450, 0, 0, 0);
          break;
        case 15: //O
          translate(-75, 10, 400, 0, 0, 0);
          break;
        case 16: //P
          translate(100, 25, 500, 0, 0, 0);
          break;
        case 17: //Q
          translate(290, 35, 475, 0, 0, 0);
          break;
        case 18: //R
          translate(535, 180, 475, 0, 0, 0);
          break;
        case 19: //S
          translate(780, 150, 350, 0, 0, 0);
          break;
        case 20: //T
          if (adj1 == true) {
            rotate( perspectiveCamera.rotation.x, perspectiveCamera.rotation.y,perspectiveCamera.rotation.z, 0, -0.6, 0);
            adj1 = false;
          };
          translate(950, 85, 300, 0, 0, 0);
          break;
        case 21: //U Easter Egg
          translate(850, 150, 175, 0, 0, 0);
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
          translate(860, 50, 50, 0, 0, 0);
          break;
        case 23: //W
          translate(750, 50, -100, 0, 0, 0);
          break;
        case 24: //X
          translate(900, 50, -200, 0, 0, 0);
          break;
        case 25: //Y
          translate(675, 100, -150, 0, 0, 0);
          break;
        case 26: //Z
          translate(550, 50, -50, 0, 0, 0);
          break;
        case 27: //Loop
          flag = 0;
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

  window.addEventListener("click", (e) => {
    if (document.getElementsByTagName("body")[0].id == "wand") {
      document
        .getElementById("pof-img")
        .classList.toggle("elementToFadeInAndOut");
    }
  });
}

animate();
