import {
  createNewRadar,
  getRadars,
  patchRadar,
} from "@/data-access/radars.service";
import { DEFAULT_RADAR_CONFIG } from "@/entities/radar/model/radar.config";
import { createRadar } from "@/entities/radar/ui/create-radar";
import { getRadarsContainer } from "@/entities/radar/utils/get-radar-node";
import { CreateRadarModal } from "@/features/radars/ui/create-radar-form/create-radar-modal";
import { modalService } from "@/main";
import type { FormInput } from "@/shared/modal/model/modal";
import type { Radar } from "../../../model/radar";
import { setState, state } from "../../../model/state";
import { clearElement } from "../../utils/layout/clear-element";
import { d } from "../../utils/layout/d";
import { getElements } from "../../utils/layout/get-elements";

export function renderTabs(radars: Radar[]): void {
  const tabsEl = d.id("tabs");

  if (!tabsEl) return;

  clearElement(tabsEl);

  radars.forEach((radar: Radar) => {
    const tab = document.createElement("div");
    const text = document.createElement("div");
    const edit = document.createElement("div");

    text.innerText = radar.title;
    edit.innerText = "E";
    edit.classList.add("edit-tab");
    tab.appendChild(text);
    tab.appendChild(edit);
    tab.classList.add("tab");

    tabsEl.appendChild(tab);

    tab.addEventListener("click", (event: MouseEvent) => {
      const target: HTMLElement | null = event?.target as HTMLElement;
      const tabs: NodeListOf<Element> = document.querySelectorAll(".tab");

      if (target.classList.contains("edit-tab")) {
        console.log("editing");
        modalService.open({
          class: CreateRadarModal,
          state: { radarTitle: radar.title },
          cb: async (data: FormInput) => {
            if (!data) return;

            try {
              const response = await patchRadar(String(radar.id), data);
              const patchedRadar = await response.json();
              const radarIdx = state.radars.findIndex(
                ({ id }) => id === patchedRadar.id
              );
              if (radarIdx > -1) {
                const newRadars = [
                  ...state.radars.filter(({ id }) => id !== patchedRadar.id),
                  patchedRadar,
                ];
                setState({ radars: newRadars });
                renderTabs(newRadars);
              }
            } catch (e) {
              console.error("- error patching radar: ", e);
            }
          },
        });
        return;
      }

      tabs.forEach((tab) => tab.classList.remove("active"));

      if (target) {
        target.classList.add("active");
      }

      hideRadars();
      showRadar(radar);

      setState({ currentRadar: radar });
    });
  });

  const addRadarButton = document.createElement("div");
  addRadarButton.innerText = "+";
  addRadarButton.classList.add("add-new-radar");
  addRadarButton.addEventListener("click", async (_) => {
    modalService.open({
      class: CreateRadarModal,
      cb: async (data: FormInput) => {
        if (!data) return;

        const radar = await createNewRadar({
          title: data?.title,
          description: "radar",
        });
        createRadar(getRadarsContainer(DEFAULT_RADAR_CONFIG), radar);
        const radarsResponse = await getRadars();
        const radars = await radarsResponse.json();
        renderTabs(radars);
        return;
      },
    });
  });
  tabsEl.appendChild(addRadarButton);
}

function hideRadars(): void {
  getElements<SVGSVGElement>("[radar]").forEach(
    (radarNode: SVGSVGElement) => (radarNode.style.display = "none")
  );
}

function showRadar(radar: Radar): void {
  const svgRadarContainer = d.id(`svg-${radar.id}`);
  if (svgRadarContainer) {
    svgRadarContainer.style.display = "block";
  }
}
