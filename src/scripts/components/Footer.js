import { LitElement, html, css } from 'lit';

class FooterComponent extends LitElement {
  constructor() {
    super();
    this.title = 'Made with ❤ by Biru';
  }

  static styles = css`
    footer {
      background-color: #282c34;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 5%;
    }
    a {
      color: #61dafb;
      text-decoration: none;
      margin: 0 10px;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <footer>
        <h3>${this.title}</h3>
        <p>&copy; ${new Date().getFullYear()} Biru</p>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
