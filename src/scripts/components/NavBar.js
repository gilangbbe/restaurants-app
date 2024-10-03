import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import anime from 'animejs';

class NavBar extends LitWithoutShadowDom {
  static properties = {
    isOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.isOpen = false;
  }

  toggleDrawer(event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;

    const drawer = this.querySelector('.drawer');
    const overlay = this.querySelector('.overlay');

    if (this.isOpen) {
      anime({
        targets: drawer,
        maxHeight: [0, 300],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
      });

      anime({
        targets: overlay,
        opacity: [0, 1],
        duration: 300,
        easing: 'linear',
      });
    } else {
      anime({
        targets: drawer,
        maxHeight: [300, 0],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
      });

      anime({
        targets: overlay,
        opacity: [1, 0],
        duration: 300,
        easing: 'linear',
      });
    }
  }

  render() {
    return html`
      <div class="navbar-container">
        <div class="navbar">
          <button
            class="${this.isOpen ? 'open' : ''}"
            aria-label="Toggle Navigation"
            @click="${this.toggleDrawer}"
          >
            <svg viewBox="-50 -40 100 80" width="50" height="40">
              <defs>
                <path
                  id="line"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="15"
                  stroke-linecap="round"
                  d="M -40 0 h 80"
                />
              </defs>
              <g>
                <g class="translate" transform="translate(0 -30)">
                  <g class="rotate" transform="rotate(-45)">
                    <use transform="rotate(45)" href="#line" />
                  </g>
                </g>

                <g class="rotate" transform="rotate(45)">
                  <use transform="rotate(-45)" href="#line" />
                </g>

                <g class="translate" transform="translate(0 30)">
                  <g class="rotate" transform="rotate(-45)">
                    <use transform="rotate(45)" href="#line" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <p>Hunger <span>Apps</span></p>
          <div class="navigation">
            <a href="/">Home</a>
            <a href="#/favorite">Favorite</a>
            <a href="https://www.linkedin.com/in/gilangbbe/">About Us</a>
          </div>
        </div>
        <div
          class="overlay ${this.isOpen ? 'open' : ''}"
          @click="${this.toggleDrawer}"
        ></div>
        <div class="drawer ${this.isOpen ? 'open' : ''}">
          <a href="/">Home</a>
          <a href="#/favorite">Favorite</a>
          <a href="https://www.linkedin.com/in/gilangbbe/">About Us</a>
        </div>
      </div>
    `;
  }
}

customElements.define('navbar-head', NavBar);
