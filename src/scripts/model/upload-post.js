import { getBlob, closeMedia } from './camera';
import { reloadPosts } from './fetch-posts';
import { closeUpload, uploadButton } from '../view/menu-controller';
const uniqid = require('uniqid');
const form = document.querySelector('.upload__form');

//EDITOR
const functionsURL =
  'https://us-central1-memoframes-c2a63.cloudfunctions.net/postsFunctions/upload';

// const functionsURL =
//   'http://localhost:5001/memoframes-c2a63/us-central1/postsFunctions/upload';

form.addEventListener('submit', event => {
  uploadButton.style.pointerEvents = 'none';
  event.preventDefault();

  //Checks if inputs are empty
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    if (!input.value.trim()) {
      return;
    }
  }

  const imageBlob = getBlob();

  //Checks if photo was taken
  if (!imageBlob) {
    alert('You must take a photo in order to post it :)');
    return;
  }

  const nameInput = document.querySelector('#input__name');
  const locationInput = document.querySelector('#input__location');

  const sendData = new FormData();
  const id = uniqid('memoframes-');
  sendData.append('id', id);
  sendData.append('name', nameInput.value);
  sendData.append('location', locationInput.value);
  sendData.append('image', imageBlob, id + '.png');

  fetch(`${functionsURL}`, {
    method: 'POST',
    body: sendData,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      console.log(data);
      reloadPosts();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      closeMedia();
      closeUpload();
      window.scrollTo(0, 0);
      uploadButton.style.pointerEvents = '';
    });
});

const bgSyncBanner = document.querySelector('.bgsync');
let bgsyncTimer = null;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.message === 'BG-SYNC') {
      window.clearTimeout(bgsyncTimer);
      bgSyncBanner.style.animationName = 'slide-up';
      bgsyncTimer = setTimeout(() => {
        bgSyncBanner.style.animationName = 'slide-down';
      }, 2000);
    }
  });
}
