export const MODAL_ID = "radar-modal";

export interface ModalResponse {
  open: <T extends RadarModal>(
    modalTemplate: new (...args: any[]) => T,
    cb: (data: any) => Promise<void>
  ) => void;
  close: (data: any) => any;
}

export interface FormInput {
  [key: string]: string;
}

export interface ModalTemplate {
  listen: () => void;
  getFormTemplate: () => string;
}

export interface RadarFormData {
  getFormData: () => FormInput;
}

export interface RadarModal extends RadarFormData, ModalTemplate {}
