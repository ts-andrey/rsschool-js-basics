import { changeMode, playModeSounds } from './mods.js';
import { modeOptions, themeOptions, darkBackgroundPath, lightBackgroundPath } from './variables.js';

function removeTransition(ev) {
  if (ev.propertyName !== 'transform') return;
  this.classList.remove('playing');
  this.classList.remove('click-playing');
}

export const playSoundHandler = ev => {
  const audio = document.querySelector(`audio[data-key="${ev.key}"]`);
  const key = document.querySelector(`li[data-key="${ev.key}"]`);
  if (!key) return;
  key.classList.remove('playing');
  key.classList.add('playing');
  playModeSounds(audio, key);
  key.addEventListener('transitionend', removeTransition, false);
};

export const changeModeHandler = ev => {
  if (ev.target.classList.contains('active')) return;
  modeOptions.forEach(el => el.classList.remove('active'));
  ev.target.classList.add('active');
  changeMode(ev);
};

export const changeThemeHandler = ev => {
  themeOptions.forEach(el => el.classList.remove('active'));
  ev.target.classList.add('active');
  if (ev.target.classList.contains('theme-1')) {
    document.querySelector('body').style.backgroundImage = `url(${darkBackgroundPath})`;
  } else if (ev.target.classList.contains('theme-2')) {
    document.querySelector('body').style.backgroundImage = `url(${lightBackgroundPath})`;
  }
};

export function keyClickHandler(ev) {
  ev.preventDefault();
  const audio = document.querySelector(`audio[data-key="${this.getAttribute('data-key')}"]`);
  this.classList.remove('click-playing');
  this.classList.add('click-playing');
  audio.currentTime = 0;
  audio.play();
  this.addEventListener('transitionend', removeTransition, false);
}

export function buttonClickHandler(ev) {
  ev.preventDefault();

  const sleep = speed => new Promise(resolve => setTimeout(resolve, speed * 1000));

  const playSong = (key, speed) =>
    sleep(speed).then(() => key.dispatchEvent(new KeyboardEvent('keydown', { key: key.value })));

  const autoplayFunction = async (key, speed) => {
    const replete = document.querySelector('.replete');
    while (key.getAttribute('data-play') === 'true' && replete.children.length > 0) {
      await playSong(key, speed);
    }
  };
  if (this.classList.contains('autoplay')) {
    const key = this.previousElementSibling.previousElementSibling;
    const speed = this.previousElementSibling.value;
    if (speed !== '') {
      key.addEventListener('keydown', playSoundHandler, false);
      key.setAttribute('data-play', 'true');
      key.classList.add('autoplay');
    }
    autoplayFunction(key, speed);
  } else if (this.classList.contains('stop')) {
    const key = this.previousElementSibling.previousElementSibling.previousElementSibling;
    key.setAttribute('data-play', 'false');
    key.removeEventListener('keydown', playSoundHandler);
    key.classList.remove('autoplay');
  } else return;
}
