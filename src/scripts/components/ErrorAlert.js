import { LitElement, html, css } from 'lit';

class ErrorAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
    }

    .alert {
      background-color: #f44336; /* Red */
      color: white;
      padding: 15px;
      margin: 10px;
      border-radius: 5px;
      font-size: 16px;
      display: none; /* Initially hidden */
      min-width: 300px;
      text-align: center;
    }

    .alert.show {
      display: block; /* Show when there's an error */
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    @keyframes fadein {
      from {
        top: -50px;
        opacity: 0;
      }
      to {
        top: 0;
        opacity: 1;
      }
    }

    @keyframes fadeout {
      from {
        top: 0;
        opacity: 1;
      }
      to {
        top: -50px;
        opacity: 0;
      }
    }
  `;

  static properties = {
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.errorMessage = '';
  }

  render() {
    return html` <div class="alert">${this.errorMessage}</div> `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('error-occurred', this.handleErrorEvent.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'error-occurred',
      this.handleErrorEvent.bind(this)
    );
  }

  handleErrorEvent(event) {
    this.errorMessage = event.detail.message;
    this.showAlert();
  }

  showAlert() {
    const alertBox = this.shadowRoot.querySelector('.alert');
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 3000); // Hide after 3 seconds
  }
}

customElements.define('error-alert', ErrorAlert);
