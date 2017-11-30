const soundDatas = [
  {
    dataKey: 65,
    keyboardKey: 'A',
    sound: 'clap'
  },
  {
    dataKey: 83,
    keyboardKey: 'S',
    sound: 'hihat'
  },
  {
    dataKey: 68,
    keyboardKey: 'D',
    sound: 'kick'
  },
  {
    dataKey: 70,
    keyboardKey: 'F',
    sound: 'openhat'
  },
  {
    dataKey: 71,
    keyboardKey: 'G',
    sound: 'boom'
  },
  {
    dataKey: 72,
    keyboardKey: 'H',
    sound: 'ride'
  },
  {
    dataKey: 74,
    keyboardKey: 'J',
    sound: 'snare'
  },
  {
    dataKey: 75,
    keyboardKey: 'K',
    sound: 'tom'
  },
  {
    dataKey: 76,
    keyboardKey: 'L',
    sound: 'tink'
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
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
}

const markup = `
  ${soundDatas.map(soundData => `
    <div data-key="${soundData.dataKey}" class="key">
      <kbd>${soundData.keyboardKey}</kbd>
      <span class="sound">${soundData.sound}</span>
    </div>
  `).join('')}
`;

document.querySelector('.keys').innerHTML = markup;

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
