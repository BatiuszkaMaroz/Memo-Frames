//Bundled Sass
import '../styles/main.scss';

//Images + Icons
const IMAGES = require.context('../images', true, /\.(png|jpg)$/);

//SVG Defs
import SYMBOL_DEFS from '../images/symbol-defs.svg';

//Preventing onload animations
window.addEventListener('load', () => {
  document.querySelector('.preload').classList.remove('preload');
});
