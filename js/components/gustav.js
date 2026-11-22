import ColorManager from '../color-manager.js';

class Gustav extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('/content/gustav.txt');
    const text = await response.text();

    this.innerHTML = `
      <pre id="gustav" class="clickable">${text}</pre>
    `;

    this.addEventListener('click', this.handleClick);
  }

  handleClick() {
    [ColorManager.primary, ColorManager.secondary] =
      [ColorManager.secondary, ColorManager.primary];
  }
}

customElements.define('custom-gustav', Gustav);
