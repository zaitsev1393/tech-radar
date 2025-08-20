export const MODAL_ID = "radar-modal";
export const MODAL_BACKDROP_ID = "modal-backdrop";

export interface OpenModalConfig<T> {
  class: new (...args: any[]) => T;
  state?: FormInput;
  cb: (data: any) => Promise<void>;
}

export interface ModalResponse {
  open: <T extends Modal>(config: OpenModalConfig<T>) => void;
  close: (data: any) => any;
}

export interface FormInput {
  [key: string]: string;
}

export interface ModalTemplate {
  listen: () => void;
  getFormTemplate: () => string;
}

export interface FormData {
  getFormData: () => FormInput;
}

export interface Modal extends FormData, ModalTemplate {}
