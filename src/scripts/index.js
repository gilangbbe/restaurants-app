import 'regenerator-runtime'; /* for async await transpile */
import '../../sass/main.scss';
import './components/index';
import swRegister from './utils/sw-register';
import App from './views/app';

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${
      header.clientHeight + footer.clientHeight
    }px)`;
  }
};

const app = new App({
  content: document.querySelector('#main-content'),
});

window.addEventListener('DOMContentLoaded', () => {
  initPages();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
