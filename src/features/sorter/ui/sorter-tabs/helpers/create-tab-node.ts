import { SorterGroupByOptions } from "@/features/sorter/model/sorter-group-by";
import { listenSorterTab } from "./listen-sorter-tab";

export const createTabNode = (title: SorterGroupByOptions): HTMLElement => {
  const tabNode = document.createElement("div");
  tabNode.classList.add("sorter-tab");
  tabNode.setAttribute("group-by", title);
  tabNode.innerText = title;

  listenSorterTab(tabNode);

  return tabNode;
};
