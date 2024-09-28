import { LitElement } from 'lit';
import { html, css } from 'lit';
import anime from 'animejs';

class HeroElement extends LitElement {
  static styles = css`
    .hero-container {
      position: relative;
      height: 10em;
      box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.8);
      overflow: hidden;
      z-index: 100;
    }

    .hero-container::after {
      box-shadow: 1px -36px 96px 7px rgba(0, 0, 0, 0.42) inset;
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 20px;
    }

    .grid-item {
      text-align: center;
      position: relative;
      border-radius: 20px;
    }

    .grid-item img {
      border-radius: 20px;
    }

    .grid-item:focus {
      box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 600px) {
      .hero-container {
        height: 10em;
      }
    }
    @media (min-width: 601px) and (max-width: 900px) {
      .hero-container {
        height: 20em;
      }
    }

    @media (min-width: 901px) {
      .hero-container {
        height: 25em;
      }
    }
  `;

  constructor() {
    super();
    this.srcImage = './images/heros/hero-image_1.jpg';
  }

  render() {
    return html`
      <div>
        <div class="hero-container show">
          <img class="hero-image hero-jumbo" src="${this.srcImage}" alt="" />
        </div>
      </div>
      <div class="grid-container">
        <div
          class="grid-item"
          @click="${this._onClick}"
          @keydown="${this._onKeyDown}"
          tabindex="0"
        >
          <img
            class="hero-image hero-1"
            src="./images/heros/hero-image_1.jpg"
            alt="Best restaurant to hangout"
          />
        </div>
        <div
          class="grid-item"
          @click="${this._onClick}"
          @keydown="${this._onKeyDown}"
          tabindex="0"
        >
          <img
            class="hero-image hero-2"
            src="./images/heros/hero-image_2.jpg"
            alt="Get that vibes"
          />
        </div>
        <div
          class="grid-item"
          @click="${this._onClick}"
          @keydown="${this._onKeyDown}"
          tabindex="0"
        >
          <img
            class="hero-image hero-3"
            src="./images/heros/hero-image_3.jpg"
            alt="Best food in the world"
          />
        </div>
        <div
          class="grid-item"
          @click="${this._onClick}"
          @keydown="${this._onKeyDown}"
          tabindex="0"
        >
          <img
            class="hero-image hero-4 "
            src="./images/heros/hero-image_4.jpg"
            alt="Search for the best chef"
          />
        </div>
      </div>
    `;
  }

  updated() {
    const container = this.shadowRoot.querySelector('.show');
    anime({
      targets: container,
      translateX: ['-200%', 0],
      easing: 'easeInOutElastic(1, .6)',
    });
  }

  _onKeyDown(event) {
    if (event.key === 'Enter') {
      const imgElement = event.target.querySelector('img');
      this._changeJumbotron(imgElement.attributes.src.value);
    }
  }

  _onClick(event) {
    const srcImg = event.target.attributes.src.value;
    this._changeJumbotron(srcImg);
  }

  _changeJumbotron(srcImg) {
    const jumbotron = this.shadowRoot.querySelector('.hero-jumbo');
    const container = this.shadowRoot.querySelector('.hero-container');
    container.classList.remove('show');
    container.classList.add('remove');
    const animation = anime
      .timeline({
        targets: this.shadowRoot.querySelector('.remove'),
        duration: 200,
        easing: 'easeInOutQuad',
      })
      .add({
        scale: 1.5,
      })
      .add({
        translateX: '-200%',
        scale: 1,
      });
    animation.finished.then(() => {
      container.classList.add('show');
      jumbotron.src = srcImg;
      this.requestUpdate();
    });
  }
}

customElements.define('hero-element', HeroElement);
