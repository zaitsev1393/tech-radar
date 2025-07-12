import { d } from "../../helpers/selectors/d";
import { l } from "../../logger/l";
import { state, toggleState } from "../../model/state";
import { saveBullet } from "../../save/save";
import { BulletOverview } from "../bullet-overview/bullet-overview";

interface EditFormAPI {
  open: () => void;
  close: () => void;
  saveForm: () => void;
}

export function EditForm(): EditFormAPI {
  const editForm = d.id("editform");
  const editTitleInput = d.id("editTitle");
  const editDescriptionInput = d.id("editDescription");
  function open(): void {
    if (!editForm) return;
    editForm.classList.remove("hidden");
    const currentBullet = state.currentBullet;

    if (editTitleInput) {
      l(editTitleInput);
      editTitleInput.value = currentBullet["data-title"];
    }
    if (editDescriptionInput) {
      editDescriptionInput.value = currentBullet["data-description"];
    }
  }

  function close(): void {
    if (!editForm) return;
    editForm.classList.add("hidden");
    const openEditFormButton = d.id("openEditFormButton");
    openEditFormButton?.classList.remove("hidden");
  }

  async function saveForm(): void {
    close();
    const newTitle = editTitleInput?.value;
    const newDescription = editDescriptionInput?.value;
    let currentBullet = state.currentBullet;
    currentBullet = {
      ...currentBullet,
      "data-title": newTitle,
      "data-description": newDescription,
    };
    toggleState({ currentBullet });
    await saveBullet(currentBullet);
    BulletOverview().update(currentBullet);
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
