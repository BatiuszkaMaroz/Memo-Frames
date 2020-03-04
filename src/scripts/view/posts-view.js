const list = document.querySelector('.posts__list');
const template = document.querySelector('.post-template');

export function createPost(data) {
  const post = template.content.cloneNode(true);
  const image = post.querySelector('.post__image');
  image.src = data.image;
  image.alt = data.name;

  list.append(post);
}
