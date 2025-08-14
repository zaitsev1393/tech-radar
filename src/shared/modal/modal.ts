import { d } from "../utils/layout/d";
import {
  MODAL_BACKDROP_ID,
  MODAL_ID,
  type FormInput,
  type Modal,
  type ModalResponse,
  type OpenModalConfig,
} from "./model/modal";

export function ModalService(): ModalResponse {
  const modal = d.id(MODAL_ID);
  const modalBackdrop = d.id(MODAL_BACKDROP_ID);

  let callback: ((data: FormInput | null) => Promise<void>) | null = null;

  const open = <T extends Modal>(config: OpenModalConfig<T>): void => {
    if (!modal) return;

    const { state, cb } = config;

    const modalEntity = new config.class();

    callback = cb;

    const modalContent = modal.querySelector<HTMLElement>("#modal-content");
    if (!modalContent) return;
    const template = modalEntity.getFormTemplate();
    modalContent.innerHTML = template;

    if (state) {
      for (const key in state) {
        const el = d.id(key);
        if (el && el instanceof HTMLInputElement) {
          el.value = state[key];
        }
      }
    }

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

  return {
    open,
    close,
  };
}
