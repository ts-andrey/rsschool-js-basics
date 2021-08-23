import { plainDrums, expandedDrums, repleteDrums } from './html.js';
import { keyClickHandler, buttonClickHandler } from './handlers.js';

import { modeOptions, plainMode, expandedMode, repleteMode } from './variables.js';

let keys = document.querySelectorAll('.key');

const playSound = ({ option, audio, key }) => {
  if (!key.classList.contains(option)) return;
  audio.currentTime = 0;
  audio.play();
};

export const playModeSounds = (audio, key) => {
  if (modeOptions[0].classList.contains('active')) {
    playSound({ option: 'option-1', audio, key });
  } else if (modeOptions[1].classList.contains('active')) {
    playSound({ option: 'option-2', audio, key });
  } else if (modeOptions[2].classList.contains('active')) {
    playSound({ option: 'option-3', audio, key });
  }
};

export const changeMode = ev => {
  if (ev.target.classList.contains('mode-1')) {
    expandedMode.innerHTML = '';
    repleteMode.innerHTML = '';
    plainMode.innerHTML = plainDrums;

    keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('click', keyClickHandler, false));
  } else if (ev.target.classList.contains('mode-2')) {
    plainMode.innerHTML = '';
    repleteMode.innerHTML = '';
    expandedMode.innerHTML = expandedDrums;

    keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('click', keyClickHandler, false));
  } else if (ev.target.classList.contains('mode-3')) {
    plainMode.innerHTML = '';
    expandedMode.innerHTML = '';
    repleteMode.innerHTML = repleteDrums;

    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', buttonClickHandler));

    keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('click', keyClickHandler, false));
  }
};
