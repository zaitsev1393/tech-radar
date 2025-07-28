import { d } from "../../helpers/selectors/d";
import { clearElement } from "../../helpers/utils/clear-element";
import type { Radar } from "../../model/radar";
import { toggleState } from "../../model/state";
import { createNewRadar, getRadars } from "../../services/radars.service";

export function renderTabs(radars: Radar[]): void {
  const tabsEl = d.id("tabs");

  if (!tabsEl) return;

  clearElement(tabsEl);

  radars.forEach((radar) => {
    const tab = document.createElement("div");

    tab.innerText = radar.title;
    tab.classList.add("tab");

    tabsEl.appendChild(tab);
    tab.addEventListener("click", (event) => {
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => tab.classList.remove("active"));
      if (event.target) {
        (event.target as HTMLElement).classList.add("active");
      }

      const svgRadarContainers = document.querySelectorAll("[radar]");
      svgRadarContainers.forEach((svg) => (svg.style.display = "none"));

      const svgRadarContainer = d.id(`svg-${radar.id}`);
      if (svgRadarContainer) {
        svgRadarContainer.style.display = "block";
      }

      toggleState({ currentRadar: radar });
    });
  });

  const addRadarButton = document.createElement("div");
  addRadarButton.innerText = "+";
  addRadarButton.classList.add("add-new-radar");
  addRadarButton.addEventListener("click", async (event) => {
    await createNewRadar({ title: "new", description: "radar" });
    const radarsResponse = await getRadars();
    const radars = await radarsResponse.json();
    renderTabs(radars);
  });
  tabsEl.appendChild(addRadarButton);
}
