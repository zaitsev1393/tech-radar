import type { Radar } from "../../../model/radar";
import { setState } from "../../../model/state";
import { clearElement } from "../../utils/layout/clear-element";
import { d } from "../../utils/layout/d";
import { addRadarHandler } from "./event-handlers/add-radar-handler";
import { deleteRadarHandler } from "./event-handlers/delete-radar-handler";
import { editRadarHandler } from "./event-handlers/edit-radar-handler";
import { showRadar } from "./helpers/show-radar";

export function renderTabs(radars: Radar[]): void {
  const tabsEl = d.id("tabs");

  if (!tabsEl) return;

  clearElement(tabsEl);

  radars.forEach((radar: Radar) => {
    const tab = document.createElement("div");
    const text = document.createElement("div");
    const edit = document.createElement("div");
    const deleteButton = document.createElement("div");

    text.innerText = radar.title;

    edit.innerText = "E";
    edit.classList.add("edit-radar");

    deleteButton.innerText = "D";
    deleteButton.classList.add("delete-radar");

    tab.appendChild(text);
    tab.appendChild(edit);
    tab.appendChild(deleteButton);
    tab.classList.add("tab");

    tabsEl.appendChild(tab);

    tab.addEventListener("click", async (event: MouseEvent) => {
      const target: HTMLElement | null = event?.target as HTMLElement;
      const tabs: NodeListOf<Element> = document.querySelectorAll(".tab");

      if (target.classList.contains("delete-radar")) {
        await deleteRadarHandler(radar);
        return;
      }

      if (target.classList.contains("edit-radar")) {
        await editRadarHandler(radar);
        return;
      }

      tabs.forEach((tab) => tab.classList.remove("active"));

      if (target) {
        target.classList.add("active");
      }

      showRadar(radar);

      setState({ currentRadar: radar });
    });
  });

  const addRadarButton = document.createElement("div");
  addRadarButton.innerText = "+";
  addRadarButton.classList.add("add-new-radar");
  addRadarButton.addEventListener("click", () => addRadarHandler());

  tabsEl.appendChild(addRadarButton);
}
