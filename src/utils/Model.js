import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";
import * as THREE from "three";

export function Model(scene, src, name, position) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;
    mesh.name = name;
    mesh.rotateY(Math.PI);
    mesh.rotateX(Math.PI * -0.1)
    mesh.position.set(position.x, position.y, position.z);
    mesh.scale.set(15, 15, 15);
    scene.add(mesh)
  });

  return mesh;
}

export function ColorModel(scene, src, name, position, modelColor) {
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
    mesh.rotateY(3.14159);
    mesh.rotateX(-0.5);
    mesh.name = name;
  
    scene.add(mesh);
  });

  return mesh;
}