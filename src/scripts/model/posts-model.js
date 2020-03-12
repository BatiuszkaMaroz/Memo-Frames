import { createPost, deleteAllPosts } from '../view/posts-view';
import { readData } from '../utils/idb';

const postUrl = 'https://memoframes-c2a63.firebaseio.com/postsV1.json';

function fetchPosts(url) {
  let networkDownloaded = false;

  fetch(url)
    .then(res => {
      if (res.ok) {
        networkDownloaded = true;
        return res.json();
      }
    })
    .then(data => {
      deleteAllPosts();
      for (const post in data) {
        createPost(data[post]);
      }
    })
    .catch(err => {
      console.log(err);
    });

  if ('indexedDB' in window) {
    readData('fetched-posts').then(data => {
      if (!networkDownloaded) {
        deleteAllPosts();
        for (const post of data) {
          createPost(post);
        }
      }
    });
  }
}

fetchPosts(postUrl);

export const reloadPosts = fetchPosts.bind(this, postUrl);

// async function fetchPosts(url) {
//   if ('indexedDB' in window) {
//     const data = await readData('fetched-posts');
//     deleteAllPosts();
//     for (const post of data) {
//       createPost(post);
//     }
//   }

//   const res = await fetch(url);
//   if (res.ok) {
//     const data = await res.json();
//     deleteAllPosts();
//     for (const post in data) {
//       createPost(data[post]);
//     }
//   }
// }
