import type { ModalTemplate } from "@/features/radars/ui/create-radar-form/input-form";

export const MODAL_ID = "radar-modal";

export interface ModalResponse {
  open: (
    modalTemplate: ModalTemplate,
    cb: (data: any) => Promise<void>
  ) => void;
  close: (data: any) => any;
}
