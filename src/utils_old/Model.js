import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";
import * as THREE from "three";

export function RenderPlane(scene, src, name) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;
    mesh.name = name;
    mesh.rotateY(Math.PI*160 - 160);
    mesh.position.set(100, -80, 280);
    mesh.scale.set(120, 100, 100);
    scene.add(mesh)
  });

  return mesh;
}

export function Model(scene, src, name, position, rotation) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;
    mesh.name = name;
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotateX(rotation.x);
    mesh.rotateY(rotation.y);
    mesh.rotateZ(rotation.z);
    mesh.scale.set(15, 15, 15);
    scene.add(mesh)
  });

  return mesh;
}

export function ColorModel(scene, src, name, position, rotation, modelColor) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;

    mesh.children.forEach((element) => {
      const obj = element.getObjectByName(element.name);
      obj.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            flatShading: true,
            shininess: 100,
          });
          let color = new THREE.Color(modelColor);
          material.color = color;
          node.material = material;
        }
      });
    });
  
    mesh.scale.set(20, 20, 20);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotateX(rotation.x);
    mesh.rotateY(rotation.y);
    mesh.rotateZ(rotation.z);
    mesh.name = name;
  
    scene.add(mesh);
  });

  return mesh;
}