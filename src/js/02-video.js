import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

setPlayerTime();

player.on('timeupdate', throttle(timeUpdateHendler, 1000));

function timeUpdateHendler(data) {
  localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, JSON.stringify(data));
}

function setPlayerTime() {
  if (localStorage.getItem(VIDEOPLAYER_CURRENT_TIME)) {
    const data = JSON.parse(localStorage.getItem(VIDEOPLAYER_CURRENT_TIME));

    if (data.seconds === data.duration) {
      localStorage.removeItem(VIDEOPLAYER_CURRENT_TIME);
      return;
    }

    player.setCurrentTime(data.seconds);
  }
}