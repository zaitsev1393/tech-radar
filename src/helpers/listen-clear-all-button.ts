import { l } from "../logger/l";
import { redrawRadar } from "./draw-radar";

const clearAllButton = document.getElementById("clearAllButton");

export const listenClearAllButton = () => {
  clearAllButton?.addEventListener("click", () => {
    l("- Clearing local storage -");
    localStorage.clear();
    redrawRadar();
  });
};
