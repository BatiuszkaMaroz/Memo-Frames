let posts;

export function setLikers() {
  posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    post.addEventListener('click', sendLike);
  });
}

export function removeLikers() {
  posts.forEach(post => {
    post.removeEventListener('dblclick', sendLike);
  });
}

let stackFree = true;

async function sendLike(e) {
  if (!stackFree) {
    return;
  }

  const liker = e.target.closest('.post__likes');

  if (!liker) {
    return;
  }

  liker.style.pointerEvents = 'none';

  const post = e.currentTarget;
  const id = post.id;
  const sendData = {
    id,
  };

  const heart = post.querySelector('.icon');
  heart.classList.add('liked');

  const count = post.querySelector('#likes-count');
  count.textContent = parseInt(count.textContent) + 1;

  stackFree = false;

  fetch(
    // 'http://localhost:5001/memoframes-c2a63/us-central1/postsFunctions/like',
    'https://us-central1-memoframes-c2a63.cloudfunctions.net/postsFunctions/like',
    {
      method: 'POST',
      body: JSON.stringify(sendData),
    },
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      stackFree = true;
    });
}
