import { LitElement, html, css } from 'lit';
import anime from 'animejs';

class RestaurantCard extends LitElement {
  static properties = {
    restaurant: { type: Object },
    isLoading: { type: Boolean, reflect: true },
  };

  static styles = css`
    .card {
      border-radius: 20px;
      width: 100%;
      box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.8);
      overflow: hidden;
      cursor: pointer;
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
      font-size: 0.8em;
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
        @mouseenter="${this._animateHoverIn}"
        @mouseleave="${this._animateHoverOut}"
        @touchstart="${this._animateHoverIn}"
        @touchend="${this._animateHoverOut}"
      >
        ${this.isLoading
          ? this._placeholder()
          : this._cardContent(this.restaurant)}
      </div>
    `;
  }

  _placeholder() {
    return html`
      <div class="placeholder" style="height: 200px;"></div>
      <div class="card-body">
        <div class="placeholder" style="width: 60%;"></div>
        <div class="placeholder" style="width: 90%;"></div>
      </div>
    `;
  }

  _cardContent(restaurant) {
    return html`
      <div class="container-img">
        <img
          class="card-img"
          src="${restaurant.pictureId}"
          alt="${restaurant.name}"
          loading="lazy"
          width="400"
          height="200"
        />
        <div class="card-overlay">
          <p>${restaurant.city}</p>
          <p>⭐️ ${restaurant.rating}</p>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${restaurant.name}</h5>
      </div>
    `;
  }

  _animateHoverIn() {
    const card = this.shadowRoot.querySelector('.card');
    card.style.zIndex = '999';
    this._animateScale(card, 1.1);
  }

  _animateHoverOut() {
    const card = this.shadowRoot.querySelector('.card');
    card.style.zIndex = '';
    this._animateScale(card, 1);
  }

  _animateScale(card, scale) {
    anime({
      targets: card,
      scale: scale,
    });
  }

  _onClick(event) {
    event.stopPropagation();
    if (this.restaurant) {
      window.location.href = `/#/detail/${this.restaurant.id}`;
    }
  }

  _handleKeyDown(event) {
    if (event.key === 'Enter') {
      this._onClick(event);
    }
  }
}

customElements.define('restaurant-card', RestaurantCard);
