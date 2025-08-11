import { d } from "../utils/layout/d";
import {
  MODAL_ID,
  type FormInput,
  type ModalResponse,
  type RadarModal,
} from "./model/modal";

export function ModalService(): ModalResponse {
  const modal = d.id(MODAL_ID);

  let callback: ((data: FormInput) => Promise<void>) | null = null;

  const open = <T extends RadarModal>(
    modalClass: new (...args: any[]) => T,
    cb: (data: FormInput) => Promise<void>
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

  const close = (data: FormInput): void => {
    if (!modal) return;

    if (callback) {
      callback(data);
    }

    modal.classList.add("hidden");
  };

  return {
    open,
    close,
  };
}
