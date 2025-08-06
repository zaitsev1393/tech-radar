import { getPopup } from "./get-popup";

export function removePopup(): void {
  const popup = getPopup();

  if (!popup) return;

  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.display = "none";
}
