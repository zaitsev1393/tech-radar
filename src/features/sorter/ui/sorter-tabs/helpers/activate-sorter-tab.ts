import type { SorterGroupByOptions } from "@/features/sorter/model/sorter-group-by";
import { setState } from "@/model/state";

export const activateSorterTab = (
  groupBy: SorterGroupByOptions | null
): void => {
  const activeTabNode = document.getElementsByClassName("active-sorter-tab")[0];
  const tabNode = document.querySelector(`[group-by='${groupBy}'`);
  activeTabNode?.classList.remove("active-sorter-tab");

  if (tabNode) tabNode.classList.add("active-sorter-tab");

  if (groupBy) {
    setState({ groupBy: groupBy as SorterGroupByOptions });
  }
};
