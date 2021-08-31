const videoList = document.querySelectorAll('.preview');
let player;
let video;
let progress;
let progressBar;
let toggle;
let skipButtons;
let volume;
let volumeButton;
let speedRate;

let wideScreenButton;
let fullScreenButton;
const renderElement = document.querySelector('.render');

const playButton = `<svg version="1.1" viewBox="0 0 512 512"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z"/></svg>`;
const pauseButton = `<svg version="1.1" viewBox="0 0 512 512"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"/><path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"/></g></svg>`;

const volumeNormal = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style="enable-background: new 0 0 480 480" xml:space="preserve" > <path d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128 c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.544,6.944-1.6 c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z" /> <path d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656 C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624 c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009 S399.328,156.777,368.992,126.857z" /> <path d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624 C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656 c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009 S456.64,123.881,414.144,81.769z" /> </svg>`;
const volumeMute = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 448.075 448.075" style="enable-background:new 0 0 448.075 448.075;" xml:space="preserve"> <path d="M352.021,16.075c0-6.08-3.52-11.84-8.96-14.4c-5.76-2.88-12.16-1.92-16.96,1.92l-141.76,112.96l167.68,167.68V16.075z"/> <path d="M443.349,420.747l-416-416c-6.24-6.24-16.384-6.24-22.624,0s-6.24,16.384,0,22.624l100.672,100.704h-9.376 c-9.92,0-18.56,4.48-24.32,11.52c-4.8,5.44-7.68,12.8-7.68,20.48v128c0,17.6,14.4,32,32,32h74.24l155.84,124.48 c2.88,2.24,6.4,3.52,9.92,3.52c2.24,0,4.8-0.64,7.04-1.6c5.44-2.56,8.96-8.32,8.96-14.4v-57.376l68.672,68.672 c3.136,3.136,7.232,4.704,11.328,4.704s8.192-1.568,11.328-4.672C449.589,437.131,449.589,427.019,443.349,420.747z"/> </svg>`;

const widenScreen = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m496 256.01a23.874 23.874 0 0 1 -7.03 16.98l-72 71.98a24 24 0 0 1 -33.94-33.94l31.03-31.03h-102.06a8 8 0 0 1 -8-8v-32a8 8 0 0 1 8-8h102.05l-31.02-31.03a24 24 0 1 1 33.94-33.94l72 72.01a23.892 23.892 0 0 1 7.03 16.97z"/><path d="m208 240v32a8 8 0 0 1 -8 8h-102.06l31.03 31.03a24 24 0 1 1 -33.94 33.94l-72-71.99a24 24 0 0 1 0-33.94l72-72.01a24 24 0 0 1 33.94 33.94l-31.02 31.03h102.05a8 8 0 0 1 8 8z"/><path d="m320 80v352a24 24 0 0 1 -48 0v-352a24 24 0 0 1 48 0z"/><path d="m240 80v352a24 24 0 0 1 -48 0v-352a24 24 0 0 1 48 0z"/></g></svg>`;
const shrinkScreen = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 488.4 488.4" style="enable-background:new 0 0 488.4 488.4;" xml:space="preserve"> <g> <g> <g> <polygon points="393.8,260.9 488.4,260.9 488.4,227.5 393.8,227.5 433.8,188 410.1,164.3 329.9,244.2 410.1,324.1 433.8,300.4 "/> <polygon points="94.6,227.5 0,227.5 0,260.9 94.6,260.9 54.6,300.4 78.3,324.1 158.5,244.2 78.3,164.3 54.6,188 			"/> <rect x="185.7" y="0" width="42.3" height="488.4"/> <rect x="268.6" y="0" width="42.3" height="488.4"/> </g> </g> </g> </svg>`;

const fullScreen = `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>`;
const normalScreen = `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g><path d="M30,60H6A6,6,0,0,0,6,72H24V90a6,6,0,0,0,12,0V66A5.9966,5.9966,0,0,0,30,60Z"/><path d="M90,60H66a5.9966,5.9966,0,0,0-6,6V90a6,6,0,0,0,12,0V72H90a6,6,0,0,0,0-12Z"/><path d="M66,36H90a6,6,0,0,0,0-12H72V6A6,6,0,0,0,60,6V30A5.9966,5.9966,0,0,0,66,36Z"/><path d="M30,0a5.9966,5.9966,0,0,0-6,6V24H6A6,6,0,0,0,6,36H30a5.9966,5.9966,0,0,0,6-6V6A5.9966,5.9966,0,0,0,30,0Z"/></g></svg>`;

const exitRenderButton = `<svg " viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>`;

{
  /* <video class="player__video viewer" src="assets/video/Parkour Atlas.mp4" crossorigin="anonymous"></video> */
}
// ${video}

function renderPlayer(video) {
  return `
  <div class="player_wrapper">
  <div class="player">

    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled"></div>
      </div>
      <div class="left">
        <div class="action">
          <button class="player__button" data-skip="-5">
            <svg
              version="1.1"
              viewBox="0 0 16 16"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <polygon points="1,8 8,14 8,8 8,2 " />
              <polygon points="15,2 8,8 15,14 " />
            </svg>
          </button>
          <button class="player__button toggle" title="Toggle Play">
            <svg
              version="1.1"
              viewBox="0 0 512 512"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z"
              />
            </svg>
          </button>
          <button class="player__button" data-skip="5">
            <svg
              version="1.1"
              viewBox="0 0 16 16"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <polygon points="15,8 8,2 8,8 8,14 " />
              <polygon points="1,2 1,14 8,8 " />
            </svg>
          </button>
        </div>
        <div class="volume">
          <button class="player__button volume__button unmuted">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 480 480"
              style="enable-background: new 0 0 480 480"
              xml:space="preserve"
            >
              <path
                d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128
           c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.544,6.944-1.6
           c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z"
              />
              <path
                d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656
           C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624
           c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009
           S399.328,156.777,368.992,126.857z"
              />
              <path
                d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624
           C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656
           c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009
           S456.64,123.881,414.144,81.769z"
              />
            </svg>
          </button>
          <input class="player__slider" min="0" max="1" step="0.05" value="1" type="range" name="volume" />
        </div>
      </div>
      <div class="right">
        <select name="playbackRate" class="play_speed" title="playrate">
          <option disabled selected>speed</option>
          <option value="0.5">0.50</option>
          <option value="0.75">0.75</option>
          <option value="1">1</option>
          <option value="1.25">1.25</option>
          <option value="1.5">1.50</option>
          <option value="1.75">1.75</option>
          <option value="2">2</option>
        </select>
        <button class="player__button widen">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g id="Solid">
              <path
                d="m496 256.01a23.874 23.874 0 0 1 -7.03 16.98l-72 71.98a24 24 0 0 1 -33.94-33.94l31.03-31.03h-102.06a8 8 0 0 1 -8-8v-32a8 8 0 0 1 8-8h102.05l-31.02-31.03a24 24 0 1 1 33.94-33.94l72 72.01a23.892 23.892 0 0 1 7.03 16.97z"
              />
              <path
                d="m208 240v32a8 8 0 0 1 -8 8h-102.06l31.03 31.03a24 24 0 1 1 -33.94 33.94l-72-71.99a24 24 0 0 1 0-33.94l72-72.01a24 24 0 0 1 33.94 33.94l-31.02 31.03h102.05a8 8 0 0 1 8 8z"
              />
              <path d="m320 80v352a24 24 0 0 1 -48 0v-352a24 24 0 0 1 48 0z" />
              <path d="m240 80v352a24 24 0 0 1 -48 0v-352a24 24 0 0 1 48 0z" />
            </g>
          </svg>
        </button>
        <button class="player__button fullscreen">
          <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g>
              <path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z" />
              <path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z" />
              <path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z" />
              <path
                d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
  </div>
  <div class="exit">
  <svg
    enable-background="new 0 0 386.667 386.667"
    viewBox="0 0 386.667 386.667"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z"
    />
  </svg>
  </div>
  `;
}

function togglePlay() {
  this[this.paused ? 'play' : 'pause']();
}

function toggleButtonPlay() {
  video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
  const icon = this.paused ? pauseButton : playButton;
  toggle.innerHTML = icon;
}

function skip({ value }) {
  if (value) {
    if (video.currentTime + value > 0 && video.currentTime + value < video.duration) video.currentTime += value;
    else if (video.currentTime + value < 0) video.currentTime = 0;
    else video.currentTime;
  } else video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function headwayHandler() {
  const headway = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${headway}%`;
}

function shiftPositionHandler({ e, value }) {
  if (value) {
    switch (value) {
      case 1:
        return (video.currentTime = (video.duration / 100) * 10);
      case 2:
        return (video.currentTime = (video.duration / 100) * 20);
      case 3:
        return (video.currentTime = (video.duration / 100) * 30);
      case 4:
        return (video.currentTime = (video.duration / 100) * 40);
      case 5:
        return (video.currentTime = (video.duration / 100) * 50);
      case 6:
        return (video.currentTime = (video.duration / 100) * 60);
      case 7:
        return (video.currentTime = (video.duration / 100) * 70);
      case 8:
        return (video.currentTime = (video.duration / 100) * 80);
      case 9:
        return (video.currentTime = (video.duration / 100) * 90);
    }
  } else {
    const position = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = position;
  }
}

function speedRateHandler({ value }) {
  if (value) {
    if (video.playbackRate + value >= 0.5 && video.playbackRate + value <= 2) video.playbackRate += value;
    else if (video.playbackRate + value < 0.5) video.playbackRate = 0.5;
    else if (video.playbackRate + value > 2) video.playbackRate = 2;
    else video.playbackRate;
  } else video.playbackRate = this.value;
}

function muteHandler() {
  if (volumeButton.classList.contains('unmuted')) {
    volumeButton.classList.remove('unmuted');
    volumeButton.innerHTML = volumeMute;
    video.muted = true;
  } else {
    volumeButton.classList.add('unmuted');
    volumeButton.innerHTML = volumeNormal;
    video.muted = false;
  }
}

function wideScreenHandler() {
  if (wideScreenButton.classList.contains('active')) {
    wideScreenButton.classList.remove('active');
    wideScreenButton.innerHTML = widenScreen;
    player.style.height = 'auto';
    player.style.width = '65vw';
    player.style.marginTop = '15vh';
    player.style.marginLeft = '17.5vw';
  } else {
    wideScreenButton.classList.add('active');
    wideScreenButton.innerHTML = shrinkScreen;
    player.style.marginTop = '0';
    player.style.marginLeft = '0';
    player.style.height = '100vh';
    player.style.width = '100vw';
  }
}

function toggleFullscreen() {
  const element = video;

  const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

  element.requestFullScreen =
    element.requestFullScreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    function () {
      return false;
    };
  document.cancelFullScreen =
    document.cancelFullScreen ||
    document.webkitCancelFullScreen ||
    document.mozCancelFullScreen ||
    function () {
      return false;
    };

  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

function fullScreenHandler() {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
    this.innerHTML = fullScreen;
    toggleFullscreen();
  } else {
    this.classList.add('active');
    this.innerHTML = normalScreen;
    toggleFullscreen();
  }
}

function keydownHandler(e) {
  if (e.key === 'f' || e.key === 'а') toggleFullscreen();
  else if (e.key === ' ') toggleButtonPlay();
  else if (e.key === 'm' || e.key === 'ь') muteHandler();
  else if (e.key === ',' || e.key === 'б') speedRateHandler({ value: -0.1 });
  else if (e.key === '.' || e.key === 'ю') speedRateHandler({ value: 0.1 });
  else if (e.key === 'j' || e.key === 'о') skip({ value: -5 });
  else if (e.key === 'k' || e.key === 'л') toggleButtonPlay();
  else if (e.key === 'l' || e.key === 'д') skip({ value: 5 });
  else if (e.key === 't' || e.key === 'е') wideScreenHandler();
  else if (e.key === '1') shiftPositionHandler({ value: 1 });
  else if (e.key === '2') shiftPositionHandler({ value: 2 });
  else if (e.key === '3') shiftPositionHandler({ value: 3 });
  else if (e.key === '4') shiftPositionHandler({ value: 4 });
  else if (e.key === '5') shiftPositionHandler({ value: 5 });
  else if (e.key === '6') shiftPositionHandler({ value: 6 });
  else if (e.key === '7') shiftPositionHandler({ value: 7 });
  else if (e.key === '8') shiftPositionHandler({ value: 8 });
  else if (e.key === '9') shiftPositionHandler({ value: 9 });
}

function buildNPlay() {
  this.removeEventListener('mouseenter', togglePlay);
  this.removeEventListener('mouseleave', togglePlay);
  const videoElement = this;
  videoElement.classList.remove('preview');
  videoElement.classList.add('player__video');
  videoElement.classList.add('viewer');
  renderElement.innerHTML = renderPlayer();
  player = document.querySelector('.player');
  player.insertBefore(videoElement, player.firstChild);
  // player.appendChild(videoElement);

  video = player.querySelector('.viewer');
  video.muted = false;
  progress = player.querySelector('.progress');
  progressBar = player.querySelector('.progress__filled');
  toggle = player.querySelector('.toggle');
  skipButtons = player.querySelectorAll('[data-skip]');
  volume = player.querySelector('.player__slider');
  volumeButton = player.querySelector('.volume__button');
  speedRate = player.querySelector('.play_speed');

  wideScreenButton = player.querySelector('.widen');
  fullScreenButton = player.querySelector('.fullscreen');
  const clearRender = document.querySelector('.exit');

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', headwayHandler);
  toggle.addEventListener('click', toggleButtonPlay);
  skipButtons.forEach(element => {
    element.addEventListener('click', skip);
  });
  volumeButton.addEventListener('click', muteHandler);
  wideScreenButton.addEventListener('click', wideScreenHandler);
  fullScreenButton.addEventListener('click', fullScreenHandler);

  let progressMousedown = false;
  let volumeMousedown = false;
  volume.addEventListener('mousedown', () => (volumeMousedown = true));
  volume.addEventListener('mouseup', () => (volumeMousedown = false));
  progress.addEventListener('mousedown', () => (progressMousedown = true));
  progress.addEventListener('mouseup', () => (progressMousedown = false));

  volume.addEventListener('change', handleRangeUpdate);
  volume.addEventListener('mousemove', () => volumeMousedown && handleRangeUpdate);

  speedRate.addEventListener('change', speedRateHandler);

  progress.addEventListener('click', e => shiftPositionHandler({ e }));
  progress.addEventListener('mousemove', e => progressMousedown && shiftPositionHandler({ e }));

  window.addEventListener('keydown', keydownHandler);

  function clearRenderHandler() {
    renderElement.innerHTML = '';
  }

  clearRender.addEventListener('click', clearRenderHandler);
}

videoList.forEach(video => {
  video.addEventListener('mouseenter', togglePlay);
  video.addEventListener('mouseleave', togglePlay);
  video.addEventListener('click', buildNPlay);
});
