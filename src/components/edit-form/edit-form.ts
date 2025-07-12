import { d } from "../../helpers/selectors/d";

interface EditFormAPI {
  open: () => void;
  close: () => void;
}

export function EditForm(): EditFormAPI {
  const editForm = d.id("editform");
  function open(): void {
    if (!editForm) return;
    editForm.classList.remove("hidden");
  }

  function close(): void {
    if (!editForm) return;
    editForm.classList.add("hidden");
    const openEditFormButton = d.id("openEditFormButton");
    openEditFormButton?.classList.remove("hidden");
  }

  function save(): void {
    close();
  }

  return {
    open,
    close,
  };
}

const saveButton = d.id("saveFormButton");
saveButton?.addEventListener("click", (event) => {
  EditForm().close();
});
