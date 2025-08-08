import { patchBullet } from "../../../data-access/bullets.service";
import type { BulletWrite } from "../../../model/bullet-read";
import { sectorsInfo } from "../../../model/sectors";
import { setState, state } from "../../../model/state";
import { d } from "../../../shared/utils/layout/d";
import { groupBullets } from "../../sorter/ui/groups/group-bullets";
import { BulletOverview } from "../bullet-overview";

interface EditFormAPI {
  open: () => void;
  close: () => void;
  saveForm: () => void;
}

export function EditForm(): EditFormAPI {
  const editForm = d.id("editform");
  const editTitleInput = d.query<HTMLInputElement>("#editTitle");
  const editDescriptionInput = d.query<HTMLInputElement>("#editDescription");
  function open(): void {
    if (!editForm) return;
    editForm.classList.remove("hidden");

    if (!state.currentBullet) return;

    const { name, description } = state.currentBullet;

    if (editTitleInput) {
      editTitleInput.value = name || "";
    }
    if (editDescriptionInput) {
      editDescriptionInput.value = description || "";
    }
  }

  function close(): void {
    if (!editForm) return;
    editForm.classList.add("hidden");
    const openEditFormButton = d.id("openEditFormButton");
    openEditFormButton?.classList.remove("hidden");
  }

  async function saveForm(): Promise<void> {
    close();
    const name = editTitleInput?.value;
    const description = editDescriptionInput?.value;
    const currentBullet = state.currentBullet;

    if (!currentBullet?.id) return;

    const updatedBullet: BulletWrite = {
      ...currentBullet,
      id: currentBullet?.id?.toString(),
      name: name || "",
      description: description || "",
    };
    setState({ currentBullet: updatedBullet });
    try {
      const radarId = state.currentRadar?.id.toString();
      const bulletId = state.currentBullet?.id?.toString();

      if (!radarId || !bulletId) return;

      const bullet = await patchBullet({
        radarId,
        bulletId,
        body: updatedBullet,
      });

      BulletOverview().update(bullet);
      groupBullets(sectorsInfo, state.bullets);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    open,
    close,
    saveForm,
  };
}

const saveButton = d.id("saveFormButton");
saveButton?.addEventListener("click", (event) => {
  EditForm().saveForm();
});
