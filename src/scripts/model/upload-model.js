import { isPhotoDone, getBlob, closeMedia } from './camera';
import { reloadPosts } from './posts-model';
import { closeUpload } from '../view/menu-controller';
const uniqid = require('uniqid');
const form = document.querySelector('.upload__form');

const functionsURL =
  'https://us-central1-memoframes-c2a63.cloudfunctions.net/postsFunctions/';

// const functionsURL =
//   'http://localhost:5001/memoframes-c2a63/us-central1/postsFunctions/';

form.addEventListener('submit', event => {
  event.preventDefault();

  //Checks if inputs are empty
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    if (!input.value.trim()) {
      return;
    }
  }

  //Checks if image were done
  if (!isPhotoDone()) {
    alert('You must take a photo in order to post it :)');
    return;
  }

  const imageBlob = getBlob();

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
      } else {
        throw new Error('No network connection.');
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
      //
      //
      //
      //
      //
      //
      //TU MOZe BYC BLAD XD
      closeMedia();
      closeUpload();
    });
});

//Display banner on bgsync store
const bgsyncBanner = document.querySelector('.bgsync');
let bgsyncTimer = null;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.message === 'BG-SYNC') {
      window.clearTimeout(bgsyncTimer);
      bgsyncBanner.style.animationName = 'slide-up';
      bgsyncTimer = setTimeout(() => {
        bgsyncBanner.style.animationName = 'slide-down';
      }, 2000);
    }
  });
}
