import * as THREE from 'three'

export default function Object(){
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  const object = new THREE.Mesh(geometry, material);
  object.position.set(0, 20, 0);

  return {object}
}