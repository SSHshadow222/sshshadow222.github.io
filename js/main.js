import './components/gustav.js';
import ColorManager from './color-manager.js';

const gustav = document.querySelector('custom-gustav');

await new Promise(resolve => {
  addEventListener('gustav-ready', resolve, { once: true });
});

gustav.addEventListener('click', () => {
  [ColorManager.primary, ColorManager.secondary] =
    [ColorManager.secondary, ColorManager.primary];
});
