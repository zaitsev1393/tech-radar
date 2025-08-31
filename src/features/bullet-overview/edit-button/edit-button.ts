import { editBulletHandler } from "@/entities/bullet/ui/modal/edit-handler/edit-handler";
import { modalService } from "@/main";
import { state } from "@/model/state";
import { d } from "@/shared/utils/layout/d";
import { BulletModal } from "../bullet-modal.ts/bullet-modal";

export const listenEditBulletButton = (): void => {
  const openEditFormButton = d.id("openEditFormButton");

  openEditFormButton?.addEventListener("click", async (event) => {
    modalService.open({
      class: BulletModal,
      state: {
        name: state.currentBullet?.name || "",
        description: state.currentBullet?.description || "",
      },
      cb: editBulletHandler,
    });
  });
};
