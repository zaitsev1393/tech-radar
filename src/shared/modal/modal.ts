import type { ModalTemplate } from "@/features/radars/ui/create-radar-form/input-form";
import { d } from "../utils/layout/d";
import { MODAL_ID, type ModalResponse } from "./model/modal";

export function Modal(): ModalResponse {
  const modal = d.id(MODAL_ID);
  let callback: ((data: any) => any) | null = null;
  const open = (templateClass: ModalTemplate, cb: any) => {
    if (!modal) return;

    callback = cb;

    const modalContent = modal.querySelector("#modal-content");
    if (!modalContent) return;
    const template = templateClass.getFormTemplate();
    modalContent.innerHTML = template;

    templateClass.listen();

    modal.classList.remove("hidden");
  };

  const close = (data: any): void => {
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
