import { closeMedia, openMedia } from '../model/camera';

const backdrop = document.querySelector('.backdrop');
let backdropTimer = null;

//-------------------------UPLOAD-------------------------//

const uploadOpen = document.querySelector('.op--upload');
const upload = document.querySelector('.upload');
const uploadClose = document.querySelector('.upload__close');
export const uploadButton = document.querySelector('.upload__button');

uploadOpen.addEventListener('click', () => {
  openMedia();
  openOption(upload, uploadOpen);
});

uploadClose.addEventListener('click', () => {
  closeMedia();
  closeOption(upload);
});

//-------------------------SETTINGS-------------------------//

const settingsButton = document.querySelector('.op--settings');
const settings = document.querySelector('.settings');
const settingsClose = document.querySelector('.settings__close');

settingsButton.addEventListener(
  'click',
  openOption.bind(this, settings, settingsButton),
);

settingsClose.addEventListener('click', closeOption.bind(this, settings));

//-------------------------FUNCTIONS-------------------------//

function openOption(element, button) {
  window.clearTimeout(backdropTimer);

  const coords = button.getBoundingClientRect();
  backdrop.style.top = `${coords.top}px`;
  backdrop.style.left = `${coords.left}px`;
  backdrop.style.display = 'block';
  backdrop.style.animationName = 'open';

  element.style.animationDelay = 'var(--animation-delay)';
  element.style.animationName = 'appear';
  element.style.pointerEvents = 'all';

  element.classList.add('appeared');
}

function closeOption(element) {
  backdrop.style.animationName = 'close';

  element.style.animationName = 'disappear';
  element.style.animationDelay = '0s';
  element.style.pointerEvents = '';

  backdropTimer = setTimeout(() => {
    backdrop.style.display = 'none';
  }, 500);
}

export const closeUpload = closeOption.bind(this, upload);

//-------------------------COLORS-------------------------//
