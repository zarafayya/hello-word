import {GLTFLoader} from "three/examples/jsm/loaders/gltfloader";


export default function Model(scene, src, x, y, z) {
  const objectLoader = new GLTFLoader();
  let mesh;
  objectLoader.load(src, (gltf) => {
    mesh = gltf.scene;
    mesh.rotateY(Math.PI);
    mesh.rotateX(Math.PI * -0.1)
    mesh.position.set(x, y, z);
    mesh.scale.set(15, 15, 15);
    scene.add(mesh)
  });

  return mesh;
}