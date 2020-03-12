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

const postUrl = 'https://memoframes-c2a63.firebaseio.com/postsV1.json';
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

//-----------------------BG-SYNC-----------------------//

import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { Queue } from 'workbox-background-sync';

const queueName = 'MemoFrames-StoredPosts';

const queue = new Queue(queueName);

self.addEventListener('fetch', event => {
  if (!self.navigator.onLine) {
    {
      const promiseChain = fetch(event.request.clone())
        .catch(err => {
          return queue.pushRequest({ request: event.request });
        })
        .then(() => {
          //Send message to app to show bgsync banner
          if (
            event.request.url.includes(
              'us-central1-memoframes-c2a63.cloudfunctions.net/postsFunctions/',
            )
          ) {
            clients.get(event.clientId).then(client => {
              client.postMessage({ message: 'BG-SYNC' });
            });
          }
        });

      event.waitUntil(promiseChain);
    }
  }
});

// self.addEventListener('fetch', event => {
//   // Clone the request to ensure it's safe to read when
//   // adding to the Queue.
//   const promiseChain = fetch(event.request.clone()).catch(err => {
//     return queue.pushRequest({ request: event.request });
//   });

//   event.waitUntil(promiseChain);
// });
