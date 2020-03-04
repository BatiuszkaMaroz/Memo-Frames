import { createPost } from '../view/posts-view';
import { readData } from '../utils/idb';

const postUrl = 'https://memoframes-c2a63.firebaseio.com/posts.json';

async function fetchPosts(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      for (const post in data) {
        createPost(data[post]);
      }
    }
  } catch (e) {
    const data = await readData('fetched-posts');
    for (const post of data) {
      createPost(post);
    }
  }
}

fetchPosts(postUrl);
