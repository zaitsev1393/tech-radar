export const createPopup = (root: HTMLElement = document.body): HTMLElement => {
  const popup = document.createElement("div");
  const css = "p-2 bg-gray-800 text-white absolute hidden";
  const id = "radar-popup";

  popup.id = id;
  popup.classList.add(...css.split(" "));

  root.appendChild(popup);

  return popup;
};
