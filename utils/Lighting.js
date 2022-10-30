import * as THREE from 'three'

export default function Lighting() {
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)
  const ambientLight = new THREE.AmbientLight(0xffffff)

  return {pointLight, ambientLight}
}