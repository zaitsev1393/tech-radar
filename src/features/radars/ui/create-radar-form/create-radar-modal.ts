import { modalService } from "@/main";
import type { FormInput, Modal } from "@/shared/modal/model/modal";
import { d } from "@/shared/utils/layout/d";

export class CreateModal implements Modal {
  private template = /*template*/ `
    <div
      id="editform"
      class="edit-form relative border border-white rounded-lg p-2 w-64 flex flex-col gap-2"
    >
      <div class="text-gray-800 flex flex-col gap-1">
        <label for="radarTitle">Title</label>
        <input class="border" id="radarTitle" type="text" />
        <div id='nameRequiredError' class='hidden text-red-500 pt-1'>Name is required</div> 
      </div>
      <button
        id="createRadarButton"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Save
      </button>
    </div>
  `;

  getFormData(): FormInput {
    const input = d.id("radarTitle") as HTMLInputElement;
    return {
      title: input.value,
    };
  }

  listen() {
    const button = d.id("createRadarButton");
    const input = d.id("radarTitle") as HTMLInputElement;
    if (!button || !input) return;

    const nameRequiredError = d.id("nameRequiredError");

    button.addEventListener("click", (_) => {
      const radarName = input.value;

      if (!radarName) {
        if (!nameRequiredError) return;
        nameRequiredError.classList.remove("hidden");
        return;
      } else {
        modalService.close(this.getFormData());
      }
    });
  }

  getFormTemplate() {
    return this.template;
  }
}
