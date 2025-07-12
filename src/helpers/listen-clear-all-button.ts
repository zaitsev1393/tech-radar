import { l } from "../logger/l";
import { removeBullets } from "./remove-bullets";

const clearAllButton = document.getElementById("clearAllButton");

export const listenClearAllButton = () => {
  clearAllButton?.addEventListener("click", () => {
    l("- Clearing local storage -");
    localStorage.clear();
    removeBullets();
  });
};
