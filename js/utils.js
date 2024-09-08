/**
 * Simulates a typewriter effect, gradually displaying the provided text in the specified element.
 *
 * @param {string} text The text to be displayed.
 * @param {HTMLElement} element The HTML element where the text will be inserted.
 * @param {function} callback An optional callback function to be executed once the text is fully displayed.
 * @param {number} startIndex An optional starting index for the text. Defaults to 0.
 * @param {number} duration An optional duration in milliseconds for the entire typewriting effect. Defaults to 500.
 */
export function typewriteTextInElement(text, element, callback = () => {}, startIndex = 0, duration = 500) {
  let characterWritten = startIndex;
  
  const interval = setInterval(() => {
    element.textContent = text.substring(0, characterWritten++);

    if (characterWritten == text.length + 1) {
      clearInterval(interval);
      callback();
    }
  }, duration / text.length);
}