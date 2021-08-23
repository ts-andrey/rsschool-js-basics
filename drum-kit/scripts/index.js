import {
  changeModeHandler,
  changeThemeHandler,
  keyClickHandler,
  playSoundHandler,
  buttonClickHandler,
} from './handlers.js';

const mode = document.querySelector('.mode');
const theme = document.querySelector('.theme');

let keys = document.querySelectorAll('.key');

window.addEventListener('keydown', ev => playSoundHandler(ev), false);
keys.forEach(key => key.addEventListener('click', keyClickHandler, false));

mode.addEventListener('click', ev => changeModeHandler(ev), false);
theme.addEventListener('click', ev => changeThemeHandler(ev), false);
