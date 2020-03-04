const backdrop = document.querySelector('.backdrop');
const uploadButton = document.querySelector('.op--upload');
const helpButton = document.querySelector('.op--help');

uploadButton.addEventListener('click', () => {
  const coords = uploadButton.getBoundingClientRect();
  backdrop.style.top = `${coords.top}px`;
  backdrop.style.left = `${coords.left}px`;
  backdrop.style.display = 'block';
  backdrop.style.animationName = 'open';
});

helpButton.addEventListener('click', () => {
  const coords = helpButton.getBoundingClientRect();
  backdrop.style.top = `${coords.top}px`;
  backdrop.style.left = `${coords.left}px`;
  backdrop.style.display = 'block';
  backdrop.style.animationName = 'open';
});
