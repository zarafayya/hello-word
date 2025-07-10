import './style.scss';
import './interface';
import { Vector3 } from "three";
import { World } from "./class/World";
import { Alphabet } from './class/Alphabet';
import { Card } from './class/Card';

const world = new World(new Vector3(290, 240, -660), new Vector3(570, -15, 180));
Alphabet.renderAllAlphabets(world.scene);

function animate() {
  requestAnimationFrame(animate);
  world.renderer.render(world.scene, world.perspectiveCamera);
}
animate();

document.getElementById('startButton')!.onclick = async () => {
  // Music
  const audio = new Audio('/bgm/YummyFlavorNCS.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();
}

document.getElementById('wand-button')!.onclick = async () => {
  const pofImg = document.getElementById('pof-img');
  if (pofImg) {
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

window.addEventListener('keydown', (e) => {
  if (world.moveState !== "none") return;
  switch (e.key) {
    case 'ArrowRight':
      world.move("right");
      break;
    case 'ArrowLeft':
      world.move("left");
      break;
  }
});