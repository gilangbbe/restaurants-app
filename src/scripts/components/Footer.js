import { LitElement, html, css } from 'lit';

class FooterComponent extends LitElement {
  constructor() {
    super();
    this.title = 'Made with ❤ by Biru';
  }

  static styles = css`
    div {
      background-color: #282c34;
      color: white;
      text-align: center;
      padding: 20px;
      min-height: 4em;
    }
  `;

  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <p>&copy; 2024 Biru</p>
      </div>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
