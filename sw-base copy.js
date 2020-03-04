importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js',
);

importScripts('./scripts/idb.js');

//-----------------------CONFIG-----------------------//

workbox.setConfig({ debug: false });

self.skipWaiting();
self.clients.claim();

//-----------------------POSTS-FETCH-----------------------//

const postUrl = 'https://memoframes-c2a63.firebaseio.com/posts.json';
const postStore = 'fetched-posts';

workbox.routing.registerRoute(postUrl, args => {
  return fetch(args.event.request).then(res => {
    const clonedRes = res.clone();
    clearData(postStore).then(() => {
      clonedRes.json().then(data => {
        for (const key in data) {
          addData(postStore, data[key]);
        }
      });
    });
    return res;
  });
});

workbox.routing.registerRoute(
  new RegExp(/.*firebasestorage\.googleapis\.com.*/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'MemoFrames-Post_Images',
  }),
);

workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'MemoFrames-Static',
  }),
);

//-----------------------PRECACHING-----------------------//

workbox.core.setCacheNameDetails({
  prefix: 'MemoFrames_Precache',
});

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
