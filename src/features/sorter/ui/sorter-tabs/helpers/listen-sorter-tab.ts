import type { SorterGroupByOptions } from "@/features/sorter/model/sorter-group-by";
import { state } from "@/model/state";
import { updateSorterContainer } from "../../sorter/update-sorter-container";
import { activateSorterTab } from "./activate-sorter-tab";

export const listenSorterTab = (tabNode: HTMLElement): void => {
  tabNode.addEventListener("click", (_) => {
    const groupBy = tabNode.getAttribute("group-by") as SorterGroupByOptions;
    if (!groupBy) return;

    activateSorterTab(groupBy);
    updateSorterContainer(groupBy, state.currentRadar);
  });
};
