import { modalService } from "@/main";
import type { FormInput, Modal } from "@/shared/modal/model/modal";
import { d } from "@/shared/utils/layout/d";

export class BulletModal implements Modal {
  private template = /*html*/ `
    <div
      id="editform"
      class="edit-form rounded-lg p-2 w-64 flex flex-col gap-2"
    >
      <div class="flex flex-col gap-1">
        <label for="name">Name</label>
        <input class='rad-input' id="name" type="text" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="description">Description</label>
        <textarea class='rad-textarea' id="description"></textarea>
      </div>
      <button
        id="saveFormButton"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Save
      </button>
    </div>
  `;

  listen(): void {
    const saveButton = d.id("saveFormButton");
    if (!saveButton) return;

    saveButton.addEventListener("click", () => {
      modalService.close(this.getFormData());
    });

    const nameInput = d.id("name");
    if (nameInput) {
      nameInput.focus();
    }
  }

  getFormData(): FormInput {
    const nameEl = d.id("name") as HTMLInputElement;
    const descriptionEl = d.id("description") as HTMLInputElement;

    let name = "",
      description = "";
    if (nameEl) {
      name = nameEl.value;
    }
    if (descriptionEl) {
      description = descriptionEl.value;
    }

    return {
      name,
      description,
    };
  }

  getFormTemplate(): string {
    return this.template;
  }
}
