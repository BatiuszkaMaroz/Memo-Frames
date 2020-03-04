const uploadButton = document.querySelector('.op--upload');
const helpButton = document.querySelector('.op--help');

uploadButton.addEventListener('click', () => {
  document.querySelector('.backdrop--upload').style.animationName = 'open';
});

helpButton.addEventListener('click', () => {
  document.querySelector('.backdrop--help').style.animationName = 'open';
});
