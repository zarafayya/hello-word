const start = document.querySelector('#start');
const startButton = document.querySelector('#startButton');
const dLetter = document.querySelector('#dLetter');
const eLetter = document.querySelector('#eLetter');
const leftArrow = document.querySelector('#leftArrow');
const rightArrow = document.querySelector('#rightArrow');
const guide = document.querySelector('#guide');
const guideButton = document.querySelector('#toggleGuide');

startButton.addEventListener('click', () => {
  start.classList.add('hidden');
});

dLetter.classList.toggle('hidden');
rightArrow.classList.toggle('pressed');

setInterval(() => {
  leftArrow.classList.toggle('pressed');
  rightArrow.classList.toggle('pressed');
}, 1000);

setInterval(() => {
  setTimeout(() => {}, 500);

  eLetter.classList.toggle('hidden');
  dLetter.classList.toggle('hidden');
}, 1000);

guideButton.addEventListener('click', () => {
  guide.classList.toggle('hidden');
});
