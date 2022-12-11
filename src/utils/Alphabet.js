import * as THREE from "three";

const Alphabet = {
  // panduan koordinat, by Trelel129
  // untuk setiap 10 alphabet pindah baris (koordinat z ditambah/dikurang)
  // untuk setiap alphabet (misal dari a ke b) berjarak 35 koordinat x
  // *per baris bisa berisi 10 alphabet atau 5 saja jika dirasa terlalu banyak
  A: {
    name: "A",
    model: "./assets/model/alphabets/A.gltf",
    color: "rgba(247, 96, 69, 1)",
    position: new THREE.Vector3(360, 180, -600),
  },
  B: {
    name: "B",
    model: "./assets/model/alphabets/B.gltf",
    color: "rgba(236, 136, 121, 1)",
    position: new THREE.Vector3(460, 130, -480),
  },
  C: {
    name: "C",
    model: "./assets/model/alphabets/C.gltf",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(380, 70, -320),
  },
  D: {
    name: "D",
    model: "./assets/model/alphabets/D.gltf",
    color: "rgba(192, 64, 39, 1)",
    position: new THREE.Vector3(230, -30, -240),
  },
  E: {
    // x-180
    name: "E",
    model: "./assets/model/alphabets/E.gltf",
    color: "rgba(236, 136, 121, 1)",
    position: new THREE.Vector3(50, -30, -180),
  },
  F: {
    name: "F",
    model: "./assets/model/alphabets/F.gltf",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-120, -30, -120),
  },
  G: {
    // Start from here
    name: "G",
    model: "./assets/model/alphabets/G.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-300, -30, -40),
  },
  H: {
    name: "H",
    model: "./assets/model/alphabets/H.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(360, 180, -600),
  },
  I: {
    name: "I",
    model: "./assets/model/alphabets/I.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  J: {
    name: "J",
    model: "./assets/model/alphabets/J.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  K: {
    name: "K",
    model: "./assets/model/alphabets/K.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  L: {
    name: "L",
    model: "./assets/model/alphabets/L.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  M: {
    name: "M",
    model: "./assets/model/alphabets/M.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  N: {
    name: "N",
    model: "./assets/model/alphabets/N.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  O: {
    name: "O",
    model: "./assets/model/alphabets/O.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  P: {
    name: "P",
    model: "./assets/model/alphabets/P.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  Q: {
    name: "Q",
    model: "./assets/model/alphabets/Q.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  R: {
    name: "R",
    model: "./assets/model/alphabets/R.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  S: {
    name: "S",
    model: "./assets/model/alphabets/S.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  T: {
    name: "T",
    model: "./assets/model/alphabets/T.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  U: {
    name: "U",
    model: "./assets/model/alphabets/U.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  V: {
    name: "V",
    model: "./assets/model/alphabets/V.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  W: {
    name: "W",
    model: "./assets/model/alphabets/W.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  X: {
    name: "X",
    model: "./assets/model/alphabets/X.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  Y: {
    name: "Y",
    model: "./assets/model/alphabets/Y.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
  Z: {
    name: "Z",
    model: "./assets/model/alphabets/Z.glb",
    color: "rgba(217, 18, 37, 1)",
    position: new THREE.Vector3(-30, 4, 225),
  },
};

export default Alphabet;
