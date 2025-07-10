import { DEFAULT_POPUP_OFFSET } from "./popup.config";

export function appendPopup(popup, { left, top, data, offset }) {
  popup.innerText = data.title;
  popup.style.display = "block";
  popup.style.top = top - offset.y + DEFAULT_POPUP_OFFSET + "px";
  popup.style.left = left + offset.x + DEFAULT_POPUP_OFFSET + "px";
}
