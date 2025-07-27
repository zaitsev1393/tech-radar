/**
 * Removes all child nodes and content from the specified HTML element.
 *
 * @param el - The HTMLElement to be cleared. If `el` is falsy, the function does nothing.
 */
export const clearElement = (el: HTMLElement): void => {
  if (!el) return;
  el.innerHTML = "";
};
