import { createPost, deleteAllPosts } from '../view/create-post';
import { readData } from '../utils/idb';
import { setLikers, removeLikers } from './likes';

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
      let posts = [];
      for (const post in data) {
        posts.push(data[post]);
      }
      posts = posts.reverse();

      deleteAllPosts();
      for (const post of posts) {
        createPost(post);
      }

      removeLikers();
      setLikers();
    })
    .catch(err => {
      console.log(err);
    });

  if ('indexedDB' in window) {
    readData('fetched-posts').then(data => {
      if (!networkDownloaded) {
        data = data.reverse();
        deleteAllPosts();
        for (const post of data) {
          createPost(post);
        }
        setLikers();
      }
    });
  }
}

fetchPosts(postUrl);

export const reloadPosts = fetchPosts.bind(this, postUrl);
