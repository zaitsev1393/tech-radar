import { setState } from "@/model/state";
import type { GroupByOptions } from "../group-by/group-by-options";

const listenSorterTab = (tabNode: HTMLElement): void => {
  tabNode.addEventListener("click", (_) => {
    const activeTabNode =
      document.getElementsByClassName("active-sorter-tab")[0];

    activeTabNode?.classList.remove("active-sorter-tab");
    tabNode.classList.add("active-sorter-tab");
    const groupBy = tabNode.getAttribute("group-by");
    if (groupBy) {
      setState({ groupBy: groupBy as GroupByOptions });
    }
  });
};

const createTabNode = (title: GroupByOptions): HTMLElement => {
  const tabNode = document.createElement("div");
  tabNode.classList.add("py-1", "px-2", "capitalize", "sorter-tab-node");
  tabNode.setAttribute("group-by", title);
  tabNode.innerText = title;

  listenSorterTab(tabNode);

  return tabNode;
};

export const createSorterTabs = (tabs: GroupByOptions[]): HTMLElement => {
  const tabsRow = document.createElement("div");
  tabsRow.classList.add("text-white", "px-4", "flex", "gap-4");
  const tabNodes = tabs.map(createTabNode);
  tabsRow.append(...tabNodes);
  return tabsRow;
};
