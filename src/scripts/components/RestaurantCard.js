import { LitElement, html, css } from 'lit';
import anime from 'animejs';

class RestaurantCard extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String },
    description: { type: String },
    pictureId: { type: String },
    city: { type: String },
    rating: { type: Number },
    isLoading: { type: Boolean, reflect: true },
    isOpen: { type: Boolean, reflect: true },
  };

  static styles = css`
    .card {
      border-radius: 20px;
      width: 100%;
      box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.8);
      overflow: hidden;
    }

    @keyframes glazing {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    .placeholder {
      background-color: #f0f0f0;
      background-image: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
      );
      background-size: 200px 100%;
      border-radius: 4px;
      height: 16px;
      margin-bottom: 10px;
      width: 100%;
      animation: glazing 1.5s infinite linear;
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-body {
      padding: 15px;
      background-color: #fff;
    }

    .card-title {
      font-size: 1.5rem;
      margin: 0;
      font-weight: bold;
    }

    .card-text {
      color: #555;
    }

    .container-img {
      position: relative;
      height: 200px;
    }

    .container-img::after {
      box-shadow: 1px -36px 96px 7px rgba(0, 0, 0, 0.42) inset;
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    }

    .card-overlay {
      font-family: 'Playwrite DE Grund';
      font-weight: bolder;
      position: absolute;
      bottom: 0;
      z-index: 100;
      color: #fff;
      margin-left: 1em;
      margin-bottom: 1em;
    }

    .card-overlay p {
      margin: 0;
    }

    .overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 50;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this._onClick}"
        @keydown="${this._handleKeyDown}"
      >
        ${this.isLoading
          ? html`
              <div class="placeholder" style="height: 200px;"></div>
              <div class="card-body">
                <div class="placeholder" style="width: 60%;"></div>
                <div class="placeholder" style="width: 90%;"></div>
              </div>
            `
          : html`
              <div class="container-img">
                <img
                  class="card-img"
                  src="${this.pictureId}"
                  alt="${this.name}"
                />
                <div class="card-overlay">
                  <p>${this.city}</p>
                  <p>Rating: ${this.rating}</p>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                ${this.isOpen
                  ? html`<p class="card-text">${this.description}</p>`
                  : ''}
              </div>
            `}
      </div>
      ${this.isOpen ? html`<div class="overlay"></div>` : ''}
    `;
  }

  _onClick(event) {
    const card = this.shadowRoot.querySelector('.card');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      const rect = card.getBoundingClientRect();
      card.style.width = `${rect.width}px`;
      card.style.position = 'absolute';
      card.style.zIndex = 1000;
      anime({
        targets: card,
        scale: 1.1,
      });
      this.requestUpdate();
    } else {
      card.style.width = ``;

      card.style.top = ``;
      card.style.left = ``;
      card.style.position = 'relative';
      card.style.zIndex = 0;
      anime({
        targets: card,
        scale: 1,
      });
      this.requestUpdate();
    }
  }

  _handleKeyDown(event) {
    console.log(event);
    if (event.key === 'Enter') {
      this._onClick(event);
    }
  }
}

customElements.define('restaurant-card', RestaurantCard);
