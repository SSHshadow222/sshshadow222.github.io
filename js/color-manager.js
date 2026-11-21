class ColorManager {
  #primary;
  #secondary;
  #root = document.documentElement;

  constructor() {
    this.primary = localStorage.getItem('primary-color')
      || this.#style.getPropertyValue('--primary-color');

    this.secondary = localStorage.getItem('secondary-color')
      || this.#style.getPropertyValue('--secondary-color');
  }

  get primary() { 
    return this.#primary;
  }

  set primary(color) {
    this.#root.style.setProperty('--primary-color', color);
    this.#primary = color;

    localStorage.setItem('primary-color', color);
  }

  get secondary() {
    return this.#secondary;
  }

  set secondary(color) {
    this.#root.style.setProperty('--secondary-color', color);
    this.#secondary = color;

    localStorage.setItem('secondary-color', color);
  }

  get #style() {
    return getComputedStyle(this.#root);
  }
}

export default new ColorManager();
