class Gustav extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('/content/gustav.txt');
    const text = await response.text();

    this.innerHTML = `
      <pre id="gustav">${text}</pre>
    `;

    dispatchEvent(new Event('gustav-ready'));
  }
}

customElements.define('custom-gustav', Gustav);
