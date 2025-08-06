import { getCoordsForPopup } from "./get-coords-for-popup-";
import { getPopup } from "./get-popup";
import { DEFAULT_POPUP_OFFSET } from "./popup.config";

interface PopupData {
  title: string;
}

export const showPopup = (data: PopupData, event: MouseEvent): void => {
  const popup = getPopup();
  if (!popup) return;

  const coords = getCoordsForPopup(event);
  if (!coords) return;

  popup.innerText = data.title;

  popup.style.display = "block";
  popup.style.top = coords.top - coords.offset.y + DEFAULT_POPUP_OFFSET + "px";
  popup.style.left =
    coords.left + coords.offset.x + DEFAULT_POPUP_OFFSET + "px";
};
