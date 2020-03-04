if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(registration => {
      console.log('Service Worker registered.');
    })
    .catch(err => {
      console.log('SX');
      console.log(err);
      console.log('Service Worker registration failed.');
    });
}

window.banner = null;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  banner = event;
});
