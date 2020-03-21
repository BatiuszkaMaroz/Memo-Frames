const camera = document.querySelector('.upload__camera');
const canvas = document.querySelector('.upload__canvas');
const shutter = document.querySelector('.upload__shutter');
const rotate = document.querySelector('.upload__rotate');
const trash = document.querySelector('.upload__trash');
const stabilizer = document.querySelector('.video-stabilizer');
let mode = 'user';

export function openMedia() {
  const constraints = {
    video: {
      width: {
        min: 640,
        ideal: 1440,
        max: 1600,
      },
      height: {
        min: 480,
        ideal: 1080,
        max: 1200,
      },
      facingMode: mode,
    },
    audio: false,
  };

  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    camera.srcObject = stream;
    rotate.style.pointerEvents = '';
  });
}

export function closeMedia() {
  blob = null;
  trash.style.display = '';
  camera.srcObject.getVideoTracks().forEach(track => track.stop());
}

//-------------------------CHANGE-CAMERA-------------------------//
let rotateTimer = null;

function changeCamera() {
  rotate.style.pointerEvents = 'none';

  window.clearTimeout(rotateTimer);
  rotate.querySelector('svg').style.animationName = 'control-rotate';
  rotateTimer = setTimeout(() => {
    rotate.querySelector('svg').style.animationName = '';
  }, 250);

  trash.style.display = '';
  stabilizer.style.minHeight = `${camera.offsetHeight}px`;

  if (mode === 'user') {
    mode = 'environment';
    canvas.style.transform = 'scaleX(1)';
    camera.style.transform = 'scaleX(1)';
  } else {
    mode = 'user';
    canvas.style.transform = 'scaleX(-1)';
    camera.style.transform = 'scaleX(-1)';
  }

  closeMedia();
  openMedia(mode);
}

//-------------------------CAPTURE-IMAGE-------------------------//

import { dataURItoBlob } from '../utils/transformation';

export const getBlob = function() {
  return blob;
};

let blob;
let snapshotTimer = null;

function captureImage() {
  window.clearTimeout(snapshotTimer);
  camera.style.animationName = 'snapshot';
  snapshotTimer = setTimeout(() => {
    camera.style.animationName = '';
  }, 250);

  camera.pause();

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  const context = canvas.getContext('2d');

  //Flipping the mirror effect
  if (mode === 'user') {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }

  //Slowing the drawImage because of snapshot animation
  setTimeout(() => {
    trash.style.display = 'flex';
    context.drawImage(camera, 0, 0);

    const image = canvas.toDataURL('image/webp');
    blob = dataURItoBlob(image);
  }, 100);
}

trash.addEventListener('click', () => {
  blob = null;

  trash.style.display = '';
  camera.play();
});

shutter.addEventListener('click', captureImage);
rotate.addEventListener('click', changeCamera);
