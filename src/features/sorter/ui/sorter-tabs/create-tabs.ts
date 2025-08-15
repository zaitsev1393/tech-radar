import { state } from "@/model/state";
import type { SorterGroupByOptions } from "../../model/sorter-group-by";
import { activateSorterTab } from "./helpers/activate-sorter-tab";
import { createTabNode } from "./helpers/create-tab-node";

export const createSorterTabs = (tabs: SorterGroupByOptions[]): HTMLElement => {
  const tabsRow = document.createElement("div");
  tabsRow.classList.add("text-white", "flex", "gap-4");

  const tabNodes = tabs.map(createTabNode);

  activateSorterTab(state.groupBy);

  tabsRow.append(...tabNodes);

  return tabsRow;
};
