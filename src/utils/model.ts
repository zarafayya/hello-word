import { Color, MeshPhongMaterial, Scene, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function model(scene: Scene, src: string, name: string, position: Vector3, rotation: Vector3, scale: Vector3 = new Vector3(15, 15, 15)) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;
    mesh.name = name;
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotateX(rotation.x);
    mesh.rotateY(rotation.y);
    mesh.rotateZ(rotation.z);
    mesh.scale.set(scale);
    scene.add(mesh)
  });

  return mesh;
}

export function colorModel(scene: Scene, src: string, name: string, position: Vector3, rotation: Vector3, modelColor: string) {
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
          let color = new Color(modelColor);
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