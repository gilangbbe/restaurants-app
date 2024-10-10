import 'regenerator-runtime'; /* for async await transpile */
import '../../sass/main.scss';
import './components/index';
import swRegister from './utils/sw-register';
import App from './views/app';

const app = new App({
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
