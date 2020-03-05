//Bundled Sass
import '../assets/styles/main.scss';

//Images
const IMAGES = require.context('../assets/images', true, /\.(png|jpg)$/);

//Svg Defs
import SYMBOL_DEFS from '../assets/images/symbol-defs.svg';

//ServiceWorker setup
import './utils/sw-setup';

//Fetch posts
import './model/posts-model';

//Create database
import { createDB } from './utils/idb';
createDB(['fetched-posts']);

//Menu animation
import './view/menu-controller';

//Upload post
import './model/upload-model';

//Preventing onload animations
window.addEventListener('load', () => {
  document.querySelector('.preload').classList.remove('preload');
});
