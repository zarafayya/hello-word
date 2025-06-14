import { Scene, PerspectiveCamera, WebGLRenderer, CubeTextureLoader, AudioLoader } from 'three';
import { Vector3 } from 'three/src/Three.js';
import { terrain } from '../utils/model';
import lighting from '../utils/lighting';
import { Alphabet } from '../class/Alphabet';
import gsap from 'gsap';
import { CameraSetup } from '../data/CameraSetup';

export class World {
  scene: Scene;
  perspectiveCamera: PerspectiveCamera;
  renderer: WebGLRenderer;
  currentCamPosition: string;
  initialCamPosition: Vector3;
  initialCamRotation: Vector3;
  moveState: "left" | "right" | "none";
  timeline: any;

  constructor(position: Vector3, lookAt: Vector3) {
    this.scene = new Scene();
    this.perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.currentCamPosition = "A";
    this.moveState = "none"
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
    this.timeline = gsap.timeline();

    // @ts-expect-error
    this.initialCamPosition = new Vector3(this.perspectiveCamera.position.x, this.perspectiveCamera.position.y, this.perspectiveCamera.position.z)
    // @ts-expect-error
    this.initialCamRotation = new Vector3(this.perspectiveCamera.rotation.x, this.perspectiveCamera.rotation.y, this.perspectiveCamera.rotation.z)

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
  move(direction: "right" | "left") {
    if (direction === "right") {
      if (this.currentCamPosition === "Z") return;
      this.currentCamPosition = String.fromCharCode(this.currentCamPosition.charCodeAt(0) + 1);
      this.moveState = "right";
    }
    else {
      if (this.currentCamPosition === "A") return;
      this.currentCamPosition = String.fromCharCode(this.currentCamPosition.charCodeAt(0) - 1);
      this.moveState = "left";
    }
    setTimeout(() => {
      this.moveState = "none";
    }, 1000)

    const cameraSetup = CameraSetup[this.currentCamPosition];
    this.rotate(cameraSetup.rotation);
    this.translate(cameraSetup.position);
  }
  rotate(rotation: Vector3) {
    let x1 = rotation.x + this.initialCamRotation.x;
    let y1 = rotation.y + this.initialCamRotation.y;
    let z1 = rotation.z + this.initialCamRotation.z;

    if (
      // @ts-expect-error
      x1.toFixed(4) == this.perspectiveCamera.rotation.x.toFixed(4) && 
      // @ts-expect-error
      y1.toFixed(4) == this.perspectiveCamera.rotation.y.toFixed(4) && 
      // @ts-expect-error
      z1.toFixed(4) == this.perspectiveCamera.rotation.z.toFixed(4)
    )
      return;
  
      
    // @ts-expect-error
    this.timeline.to(this.perspectiveCamera.rotation, {
      duration: 2,
      x: x1,
      y: y1,
      z: z1,
    });
  }
  translate(destination: Vector3) {
    // @ts-expect-error
    this.timeline.to(this.perspectiveCamera.position, {
      duration: 1.6,
      x: destination.x,
      y: destination.y,
      z: destination.z,
    });
  }
};