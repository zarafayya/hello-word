import * as THREE from 'three';

export default function Ground(){
  const geometry = new THREE.BoxGeometry(5000, 20, 5000);
  const loader = new THREE.TextureLoader().load('../assets/img/grass.jpeg');
  loader.wrapS = THREE.RepeatWrapping;
  loader.wrapT = THREE.RepeatWrapping;
  loader.repeat.set(200,200);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff, map:loader});
  const ground = new THREE.Mesh(geometry, material);
  ground.position.set(0, -10, 0);

  return {ground};
}