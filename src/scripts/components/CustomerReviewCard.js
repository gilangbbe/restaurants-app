import { LitElement, html, css } from 'lit';

class CustomerReviewCard extends LitElement {
  static properties = {
    customerReview: { type: Object },
  };

  static styles = css`
    * {
      margin: 0;
      font-family: 'Playwrite DE Grund';
    }

    .review-card {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 0.7em;
    }

    .review-name {
      font-weight: bolder;
    }

    .review-date {
      font-weight: lighter;
      font-size: 0.7em;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="review-card">
        <p class="review-name">
          ${this.customerReview.name} -
          <span class="review-date">${this.customerReview.date}</span>
        </p>
        <p class="review-text">${this.customerReview.review}</p>
      </div>
    `;
  }
}

customElements.define('review-card', CustomerReviewCard);
