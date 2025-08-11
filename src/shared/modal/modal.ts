import { d } from "../utils/layout/d";
import {
  MODAL_BACKDROP_ID,
  MODAL_ID,
  type FormInput,
  type ModalResponse,
  type RadarModal,
} from "./model/modal";

export function ModalService(): ModalResponse {
  const modal = d.id(MODAL_ID);
  const modalBackdrop = d.id(MODAL_BACKDROP_ID);

  let callback: ((data: FormInput | null) => Promise<void>) | null = null;

  const open = <T extends RadarModal>(
    modalClass: new (...args: any[]) => T,
    cb: (data: FormInput | null) => Promise<void>
  ): void => {
    if (!modal) return;

    const modalEntity = new modalClass();

    callback = cb;

    const modalContent = modal.querySelector<HTMLElement>("#modal-content");
    if (!modalContent) return;
    const template = modalEntity.getFormTemplate();
    modalContent.innerHTML = template;

    modalEntity.listen();

    modal.classList.remove("hidden");
  };

  const close = (data: FormInput | null): void => {
    if (!modal) return;

    if (callback) {
      callback(data);
    }

    modal.classList.add("hidden");
  };

  modalBackdrop?.addEventListener("click", (_) => {
    close(null);
  });

  return {
    open,
    close,
  };
}
