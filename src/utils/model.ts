import { Color, MeshPhongMaterial, Scene, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function terrain(scene, src, name) {
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

export function model(scene, src, name, position, rotation) {
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

export function coloredModel(scene: Scene, src: string, name: string, position: Vector3, rotation: Vector3, color: string) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;

    mesh.children.forEach((element) => {
      const obj = element.getObjectByName(element.name);
      obj.traverse(function (node) {
        if (node.isMesh) {
          const material = new MeshPhongMaterial({
            color: 0x000000,
            flatShading: true,
            shininess: 100,
          });
          let colorClass = new Color(color);
          material.color = colorClass;
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