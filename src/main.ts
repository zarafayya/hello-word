import './style.scss';
import './utils_old/Interfaces';
import { Vector3 } from "three";
import { World } from "./class/World";
import { Alphabet } from './class/Alphabet';
import { Card } from './class/Card';

const world = new World(new Vector3(290, 240, -660), new Vector3(570, -15, 180));
Alphabet.renderAllAlphabets(world.scene);

document.getElementById('wand-button')!.onclick = async () => {
  const pofImg = document.getElementById('pof-img');
  if (pofImg) {
    // made the
    pofImg.classList.add('elementToFadeInAndOut');
    setTimeout(() => {
      pofImg.classList.remove('elementToFadeInAndOut');
    }, 2000)
  }
  const letter = world.currentCamPosition;
  if (Alphabet.alphabets.find(data => data.name === letter)?.isVisible) {
    Alphabet.removeAlphabet(world.scene, letter);
    Card.renderCard(world.scene, letter);
  } else {
    Card.removeCard(world.scene, letter);
    Alphabet.renderAlphabet(world.scene, letter)
  }
};

function animate() {
  requestAnimationFrame(animate);
  world.renderer.render(world.scene, world.perspectiveCamera);
}
animate();