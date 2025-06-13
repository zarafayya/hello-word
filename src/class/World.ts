import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { Vector3 } from 'three/src/Three.js';

export class World {
  scene: Scene;
  perspectiveCamera: PerspectiveCamera;
  renderer: WebGLRenderer;
  initialCamPosition: Vector3;
  initialCamRotation: Vector3;

  constructor(position: Vector3, lookAt: Vector3) {
    this.scene = new Scene();
    this.perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.perspectiveCamera);
    this.perspectiveCamera.lookAt(lookAt);
    // @ts-expect-error
    this.perspectiveCamera.position.set(position);

    // @ts-expect-error
    this.initialCamPosition = this.perspectiveCamera.position
    // @ts-expect-error
    this.initialCamRotation = this.perspectiveCamera.rotation
  }
};