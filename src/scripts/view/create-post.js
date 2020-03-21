const list = document.querySelector('.posts__list');
const template = document.querySelector('.post-template');

export function createPost(data) {
  const post = template.content.cloneNode(true);
  const image = post.querySelector('.post__image');
  const description = post.querySelector('.post__description p');
  const likes = post.querySelector('#likes-count');

  image.src = data.image;
  image.alt = data.name;

  description.textContent = `${data.name} in ${data.location} `;
  likes.textContent = `${data.likes || 0}`;

  post.querySelector('li').setAttribute('id', data.id);

  list.append(post);
}

export function deleteAllPosts() {
  const posts = document.querySelectorAll('li.post');
  posts.forEach(post => {
    post.remove();
  });
}
