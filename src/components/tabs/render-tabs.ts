import { DEFAULT_RADAR_CONFIG } from "../../config/radar.config";
import { getRadarNode } from "../../helpers/radar/get-radar-node";
import { d } from "../../helpers/selectors/d";
import { getElements } from "../../helpers/selectors/get-elements";
import { clearElement } from "../../helpers/utils/clear-element";
import type { Radar } from "../../model/radar";
import { setState } from "../../model/state";
import { createNewRadar, getRadars } from "../../services/radars.service";
import { createRadar } from "../radar/radar";

export function renderTabs(radars: Radar[]): void {
  const tabsEl = d.id("tabs");

  if (!tabsEl) return;

  clearElement(tabsEl);

  radars.forEach((radar: Radar) => {
    const tab = document.createElement("div");

    tab.innerText = radar.title;
    tab.classList.add("tab");

    tabsEl.appendChild(tab);

    tab.addEventListener("click", (event: MouseEvent) => {
      const target: HTMLElement | null = event?.target as HTMLElement;
      const tabs: NodeListOf<Element> = document.querySelectorAll(".tab");

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
    const radar = await createNewRadar({
      title: `Radar ${Math.floor(Math.random() * 1000)}`,
      description: "radar",
    });
    createRadar(getRadarNode(DEFAULT_RADAR_CONFIG), radar);
    const radarsResponse = await getRadars();
    const radars = await radarsResponse.json();
    renderTabs(radars);
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
