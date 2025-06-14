import { Scene, PerspectiveCamera, WebGLRenderer, CubeTextureLoader, AudioLoader } from 'three';
import { Vector3 } from 'three/src/Three.js';
import { terrain } from '../utils/model';
import lighting from '../utils/lighting';

export class World {
  scene: Scene;
  perspectiveCamera: PerspectiveCamera;
  renderer: WebGLRenderer;
  currentCamPosition: string;
  initialCamPosition: Vector3;
  initialCamRotation: Vector3;

  constructor(position: Vector3, lookAt: Vector3) {
    this.scene = new Scene();
    this.perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.currentCamPosition = "A";
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.perspectiveCamera);
    // @ts-expect-error
    this.perspectiveCamera.position.set(0, 70, -90);
    // @ts-expect-error
    this.perspectiveCamera.position.set(position.x, position.y, position.z);
    this.perspectiveCamera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // @ts-expect-error
    this.initialCamPosition = this.perspectiveCamera.position
    // @ts-expect-error
    this.initialCamRotation = this.perspectiveCamera.rotation

    // Mapbox
    const loader = new CubeTextureLoader();
    const skyBox = loader.load([
      './assets/img/px.png',
      './assets/img/nx.png',
      './assets/img/py.png',
      './assets/img/ny.png',
      './assets/img/pz.png',
      './assets/img/nz.png',
    ]);
    this.scene.background = skyBox;

    terrain(this.scene, './assets/model/terrain.glb', 'terrain');
    lighting(this.scene, 0, 400, -500);

    // Music
    const audio = new Audio('../assets/bgm/YummyFlavorNCS.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    // audio.play();
  }
};