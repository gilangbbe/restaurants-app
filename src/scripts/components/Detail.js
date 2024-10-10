import { LitElement, html, css } from 'lit';
import RestaurantsSource from '../data/restaurants-source';
import triggerError from '../utils/triggerError';

class Detail extends LitElement {
  static properties = {
    restaurant: { type: Object },
  };

  static styles = css`
    * {
      margin: 0;
    }

    #image-container {
      width: 100%;
      height: 15em;
      position: relative;
    }

    #image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #image-container::after {
      box-shadow: 1px -36px 96px 7px rgba(0, 0, 0, 0.8) inset;
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    }

    #description-container-overlay {
      padding: 1em;
      position: absolute;
      bottom: 0;
      color: #fff;
      z-index: 10;
      font-weight: bolder;
      font-size: 1.5em;
    }

    #rating-container-overlay {
      padding: 1em;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      z-index: 10;
      font-weight: bolder;
      font-size: 1.5em;
    }

    #restaurant-city {
      font-size: 0.6em;
      font-family: 'Playwrite DE Grund';
    }
    #restaurant-address {
      padding-top: 0.5em;
      font-weight: lighter;
      font-size: 0.4em;
      font-family: 'Playwrite DE Grund';
    }

    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.125em;
      color: red;
    }

    .dancing-font {
      font-family: 'Dancing Script';
      font-weight: bolder;
    }

    #categories-container {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      z-index: 10;
      padding: 1.5em;
    }

    #restaurant-categories {
      margin-top: 0.5em;
      display: flex;
      flex-direction: row;
      gap: 1em;
      list-style: none;
      padding: 0;
    }

    .menu-list {
      font-size: 0.8em;
      margin-top: 0.5em;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      text-align: start;
    }

    #restaurant-menu {
      margin-top: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 1.5em;
    }

    #menu-container {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    }

    #restaurant-description {
      font-family: 'Playwrite DE Grund';
      font-size: 0.8em;
      padding: 1.7em;
      text-align: justify;
    }

    #customer-reviews-container {
      margin-top: 1em;
      padding: 1.5em;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="image-container">
        <img src="${this.restaurant.pictureId}" />
        <div id="description-container-overlay">
          <p id="restaurant-name" class="dancing-font">
            ${this.restaurant.name}
          </p>
          <p id="restaurant-city">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 384 512"
            >
              <path
                fill="#ff0000"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              /></svg
            >${this.restaurant.city}
          </p>
          <p id="restaurant-address">${this.restaurant.address}</p>
        </div>
        <div id="rating-container-overlay">
          <p>
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="#FFD43B"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>
            ${this.restaurant.rating}
          </p>
        </div>
        <div id="categories-container">
          <p class="dancing-font" style="font-size: 1.5em;">Categories</p>
          <ul id="restaurant-categories">
            ${this.createList(this.restaurant.categories, '#ffffff')}
          </ul>
        </div>
        <like-button
          class="like-button"
          .restaurant=${this.restaurant}
        ></like-button>
      </div>
      <div id="restaurant-description">
        <p class="dancing-font" style="font-size: 1.5em;">Description</p>
        <p>${this.restaurant.description}</p>
      </div>
      <div id="restaurant-menu">
        <p class="dancing-font">Menu</p>
        <div id="menu-container">
          <div style="text-align: center;">
            <p class="dancing-font">Foods</p>
            <ul class="menu-list">
              ${this.createList(this.restaurant.menus.foods)}
            </ul>
          </div>
          <div style="text-align: center;">
            <p class="dancing-font">Drinks</p>
            <ul class="menu-list">
              ${this.createList(this.restaurant.menus.drinks)}
            </ul>
          </div>
        </div>
      </div>
      <div id="customer-reviews-container">
        <p class="dancing-font" style="font-size: 1.5em;">Customer Reviews</p>
        ${this.populateReviews()}
        <review-overlay id="${this.restaurant.id}"></review-overlay>
      </div>
    `;
  }

  createList(values, fill) {
    return values.map(
      (value) =>
        html`<li>
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="${fill}"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            /></svg
          >${value.name}
        </li>`
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('review-submitted', this.handleReviewSubmitted);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('review-submitted', this.handleReviewSubmitted);
  }

  async handleReviewSubmitted() {
    try {
      this.restaurant = await RestaurantsSource.detailRestaurant(
        this.restaurant.id
      );
    } catch (error) {
      triggerError(error.message);
    }
  }

  createReviewCard(customerReview) {
    const reviewCard = document.createElement('review-card');
    reviewCard.customerReview = customerReview;
    return reviewCard;
  }

  populateReviews() {
    return this.restaurant.customerReviews.map((customerReview) =>
      this.createReviewCard(customerReview)
    );
  }
}

customElements.define('detail-component', Detail);
