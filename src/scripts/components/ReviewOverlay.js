import { LitElement, html, css } from 'lit';
import RestaurantsSource from '../data/restaurants-source';
import triggerError from '../utils/triggerError';

class ReviewOverlay extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Playwrite DE Grund';
    }

    .dancing-font {
      font-family: 'Dancing Script';
      margin: 0;
      margin-bottom: 0.5em;
    }

    .container {
      max-width: 100%;
      margin: 20px auto;
      position: relative;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }

    input[type='text'] {
      width: 100%;
      padding: 15px 60px 15px 20px;
      font-size: 16px;
      border-radius: 15px;
      border: 1px solid #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease;
    }

    input[type='text']:focus {
      outline: none;
      border-color: #4a90e2;
    }

    button,
    .loading-spinner {
      right: 10px;
      border: none;
      background-color: #000;
      padding: 10px;
      color: white;
      border-radius: 15px;
      cursor: pointer;
      font-size: 1.2em;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #357abd;
    }

    .loading-spinner {
      width: 30px;
      height: 30px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #4a90e2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  static properties = {
    id: { type: String },
    name: { type: String },
    review: { type: String },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.name = '';
    this.review = '';
    this.loading = false;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const nameInput = this.shadowRoot.querySelector('#nameInput').value.trim();
    const reviewInput = this.shadowRoot
      .querySelector('#reviewInput')
      .value.trim();

    if (nameInput && reviewInput) {
      this.loading = true;
      const data = {
        id: this.id,
        name: nameInput,
        review: reviewInput,
      };

      try {
        const response = await RestaurantsSource.addReview({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.error) {
          this.name = '';
          this.review = '';
          this.shadowRoot.querySelector('#nameInput').value = '';
          this.shadowRoot.querySelector('#reviewInput').value = '';

          this.dispatchEvent(
            new CustomEvent('review-submitted', {
              detail: { success: true },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          console.error('Failed to submit the review');
        }
      } catch (error) {
        triggerError(error.message);
      } finally {
        this.loading = false;
      }
    }
  }

  render() {
    return html`
      <div class="container">
        <p class="dancing-font" style="font-size: 1.5em;">Add Review</p>
        <form @submit=${this.handleSubmit}>
          <div class="input-wrapper">
            <input
              type="text"
              id="nameInput"
              placeholder="Enter your name..."
              .value=${this.name}
            />
          </div>
          <div class="input-wrapper">
            <input
              type="text"
              id="reviewInput"
              placeholder="Enter your review..."
              .value=${this.review}
            />
          </div>
          ${this.loading
            ? html`<div class="loading-spinner"></div>`
            : html`<button id="reviewButton" type="submit">➤ Send</button>`}
        </form>
      </div>
    `;
  }
}

customElements.define('review-overlay', ReviewOverlay);
