import { MODAL_ID } from "./model/modal";

export const createModal = (): void => {
  const modalContainer = document.createElement("div");
  const backdrop = document.createElement("div");
  const modal = document.createElement("div");

  modalContainer.id = MODAL_ID;
  modalContainer.classList.add("hidden");

  backdrop.style.position = "absolute";
  backdrop.style.inset = "0";
  backdrop.style.background = `rgba(0,0,0,0.2)`;
  backdrop.id = "modal-backdrop";
  backdrop.classList.add("flex", "justify-center", "items-center");

  modal.id = "modal-content";
  modal.style.background = "white";
  modal.classList.add("rounded-lg", "p-4");

  backdrop.appendChild(modal);
  modalContainer.appendChild(backdrop);
  document.body.appendChild(modalContainer);
};
