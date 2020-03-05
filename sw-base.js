import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

importScripts('./scripts/idb.js');

//-----------------------CONFIG-----------------------//

self.__WB_DISABLE_DEV_LOGS = true;

skipWaiting();
clientsClaim();

//-----------------------POSTS-FETCH-----------------------//

const postUrl = 'https://memoframes-c2a63.firebaseio.com/posts.json';
const postStore = 'fetched-posts';

registerRoute(postUrl, args => {
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

registerRoute(
  new RegExp(/.*fonts\.googleapis\.com.*/),
  new StaleWhileRevalidate({
    cacheName: 'MemoFrames-Fonts',
  }),
);

registerRoute(
  new RegExp(/.*firebasestorage\.googleapis\.com.*/),
  new StaleWhileRevalidate({
    cacheName: 'MemoFrames-Post_Images',
  }),
);

//-----------------------PRECACHING-----------------------//

setCacheNameDetails({
  prefix: 'MemoFrames_Precache',
});

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
