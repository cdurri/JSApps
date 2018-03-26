const audioElements = document.getElementsByClassName('sounds');

const soundDatas = [
  {
    dataKey: 65,
    keyboardKey: 'A',
    sound: 'clap',
    source: 'sounds/clap.wav'
  },
  {
    dataKey: 83,
    keyboardKey: 'S',
    sound: 'hihat',
    source: 'sounds/hihat.wav'
  },
  {
    dataKey: 68,
    keyboardKey: 'D',
    sound: 'kick',
    source: 'sounds/kick.wav'
  },
  {
    dataKey: 70,
    keyboardKey: 'F',
    sound: 'openhat',
    source: "sounds/openhat.wav"
  },
  {
    dataKey: 71,
    keyboardKey: 'G',
    sound: 'boom',
    source: "sounds/boom.wav"
  },
  {
    dataKey: 72,
    keyboardKey: 'H',
    sound: 'ride',
    source: "sounds/ride.wav"
  },
  {
    dataKey: 74,
    keyboardKey: 'J',
    sound: 'snare',
    source: "sounds/snare.wav"
  },
  {
    dataKey: 75,
    keyboardKey: 'K',
    sound: 'tom',
    source: "sounds/tom.wav"
  },
  {
    dataKey: 76,
    keyboardKey: 'L',
    sound: 'tink',
    source: "sounds/tink.wav"
  }
]

const shuffleKeys =
  arr =>
  arr.sort(() =>
  Math.random() - 0.5);

shuffleKeys(soundDatas);

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop the function from running all together
  audio.currentTime = 0; // rewind to the start
  audio.play();
  key.classList.add('playing');// changes appearance of button when key is pressed
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
}

function playSoundAuto(index = 0) {
  audioElements[index].play();
  keyPressAuto(index);
  audioElements[index].addEventListener('ended', () => {
    index += 1;
    if(index < audioElements.length) {
      setTimeout(() => {
        playSoundAuto(index);
      }, 500);
    } else {
      displayRemovePrompt();
    }
  });
}

function playRandomSound() {
  const randomSound = Math.floor( Math.random() * 8 ) + 1;
  console.log(randomSound);
  audioElements[randomSound].play();
}

function displayRemovePrompt() {
  const prompt = document.querySelector('.prompt');
  prompt.classList.add('fade-in');
  setTimeout(() => {
       prompt.classList.remove('fade-in');
       //playRandomSound();
   }, 3000);
}

function keyPressAuto(index) {
  audioElements[index].parentNode.classList.add('playing');
}

const markup = `
  ${soundDatas.map(soundData => `
    <div data-key="${soundData.dataKey}" class="key">
      <kbd>${soundData.keyboardKey}</kbd>
      <span class="sound">${soundData.sound}</span>
      <audio class="sounds" src="${soundData.source}"></audio>
    </div>
  `).join('')}
`;

document.querySelector('.keys').innerHTML = markup;

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

window.onload = () => {
  playSoundAuto();
}
