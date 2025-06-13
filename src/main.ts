import { Vector3 } from "three";
import { World } from "./class/World";
import { model } from "./utils/model";
import { RenderPlane } from "./utils_old/Model";
import Setup from "./utils_old/Setup";
import * as THREE from "three";
import Lighting from "./utils_old/Lighting";

const world = new World(new Vector3(290, 240, -660), new Vector3(570, -15, 180));
const terrain = model(world.scene, './assets/model/terrain.glb', 'terrain', new Vector3(0, Math.PI*160 - 160, 0), new Vector3(100, -80, 280), new Vector3(120, 100, 100));
