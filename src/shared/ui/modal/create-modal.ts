import { modalService } from "@/main";
import { loadIcon } from "../../icons/icons.service";
import { MODAL_BACKDROP_ID, MODAL_ID } from "./model/modal";

export const createModal = async (): Promise<void> => {
  const modalContainer = document.createElement("div");
  const backdrop = document.createElement("div");
  const modal = document.createElement("div");
  const closeButton = await loadIcon("close");
  const modalContent = document.createElement("div");

  modalContainer.id = MODAL_ID;
  modalContainer.classList.add("hidden");

  backdrop.style.position = "absolute";
  backdrop.style.inset = "0";
  backdrop.style.zIndex = "0";
  backdrop.style.background = `rgba(0,0,0,0.2)`;
  backdrop.id = "modal-backdrop";
  backdrop.classList.add("flex", "justify-center", "items-center");

  modal.id = "modal";
  modal.style.background = "white";
  modal.classList.add("rounded-lg", "p-4", "relative");

  modalContent.id = "modal-content";

  closeButton.classList.add("absolute", "cursor-pointer");
  closeButton.style.top = "10px";
  closeButton.style.right = "20px";
  closeButton.style.zIndex = "100";

  closeButton.addEventListener("click", () => {
    modalService.close(null);
  });

  backdrop?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.id === MODAL_BACKDROP_ID) {
      modalService.close(null);
    }
  });

  modal.appendChild(closeButton);
  modal.appendChild(modalContent);
  backdrop.appendChild(modal);
  modalContainer.appendChild(backdrop);
  document.body.appendChild(modalContainer);
};
