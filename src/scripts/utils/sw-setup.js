import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('./sw.js');

  wb.addEventListener('installed', event => {
    if (event.isUpdate) {
      if (confirm(`New content is available!. Click OK to refresh`)) {
        window.location.reload();
      }
    }
  });

  wb.register();
}

navigator.serviceWorker.ready.then(sw => {
  sw.sync.register('workbox-background-sync:MemoFrames-StoredPosts');
});

let banner = null;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  banner = event;
});

const installButton = document.querySelector('#app-install');
installButton.addEventListener('click', () => {
  if (banner) {
    banner.prompt();
  } else {
    alert('Application already installed.');
  }
});
