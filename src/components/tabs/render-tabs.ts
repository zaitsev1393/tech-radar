import { d } from "../../helpers/selectors/d";
import { clearElement } from "../../helpers/utils/clear-element";
import type { Radar } from "../../model/radar";
import { toggleState } from "../../model/state";

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
      toggleState({ currentRadar: radar });
    });
  });
}
