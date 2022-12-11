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
        position: new THREE.Vector3(460, 130, -480)
    },
    C: {
        name: "C",
        model: "./assets/model/alphabets/C.gltf",
        color: "rgba(217, 18, 37, 1)",
        position: new THREE.Vector3(380, 70, -320)
    },
    D: {
        name: "D",
        model: "./assets/model/alphabets/D.gltf",
        color: "rgba(192, 64, 39, 1)",
        position: new THREE.Vector3(-80, 4, 135)
    },
    E: {
        name: "E",
        model: "./assets/model/alphabets/E.gltf",
        color: "rgba(236, 136, 121, 1)",
        position: new THREE.Vector3(100, 4, 180)
    },
    F: {
        name: "F",
        model: "./assets/model/alphabets/F.gltf",
        color: "rgba(217, 18, 37, 1)",
        position: new THREE.Vector3(-30, 4, 225)
    },
}

export default Alphabet;