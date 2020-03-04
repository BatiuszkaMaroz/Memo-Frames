//Bundled Sass
import '../assets/styles/main.scss';

//Images
const IMAGES = require.context('../assets/images', true, /\.(png|jpg)$/);

//SVG Defs
import SYMBOL_DEFS from '../assets/images/symbol-defs.svg';

//Preventing onload animations
window.addEventListener('load', () => {
  document.querySelector('.preload').classList.remove('preload');
});

//Setup of service worker
import './utils/sw-setup';

//Post fetcher
import './model/posts-model';

//Creation of indexed Database
import { createDB } from './utils/idb';

createDB(['fetched-posts']);

import './view/menu-controller';
