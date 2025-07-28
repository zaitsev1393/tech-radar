import type { PopupCoords } from "../../helpers/popup/get-popup-coords";
import { DEFAULT_POPUP_OFFSET } from "./popup.config";

interface PopupConfig {
  title: string;
  description?: string;
}

export function appendPopup(
  popup: HTMLElement | null,
  coords: PopupCoords | null,
  { title }: PopupConfig
): void {
  if (!popup || !coords) return;

  popup.innerText = title;
  popup.style.display = "block";
  popup.style.top = coords.top - coords.offset.y + DEFAULT_POPUP_OFFSET + "px";
  popup.style.left =
    coords.left + coords.offset.x + DEFAULT_POPUP_OFFSET + "px";
}
