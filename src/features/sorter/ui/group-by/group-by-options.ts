import { setState, state } from "../../../../model/state";
import { d } from "../../../../shared/utils/layout/d";

type GroupByOptionNode = HTMLElement;

export enum GroupByOptions {
  Sectors = "sectors",
  Rings = "rings",
}

const optionsNodes = {
  [GroupByOptions.Sectors]: "sectorsContainer",
  [GroupByOptions.Rings]: "ringsContainer",
};

export const listenGroupByOptions = () => {
  const groupByContainer = d.id("groupByContainer");
  activateContainer();
  if (groupByContainer) {
    const sectorsOption = groupByContainer.querySelector("[sectorsOption]");
    const ringsOption = groupByContainer.querySelector("[ringsOption]");
    if (state.groupBy === GroupByOptions.Sectors) {
      sectorsOption?.classList.add("underline");
    }
    if (state.groupBy === GroupByOptions.Rings) {
      ringsOption?.classList.add("underline");
    }
    groupByContainer?.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).hasAttribute("groupbyoption")) {
        activateOption(event.target);
      }
    });
  }
};

const activateContainer = () => {
  const activeContainer = d.query("[group].active");
  if (activeContainer) {
    activeContainer.classList.add("hidden");
    activeContainer.classList.remove("active");
  }
  const { groupBy } = state;
  if (!groupBy) return;
  const container = d.id(optionsNodes[groupBy]);
  if (container) {
    container.classList.add("active");
    container.classList.remove("hidden");
  }
};

const nodeToOption = (option: HTMLElement): GroupByOptions => {
  if (option.hasAttribute("sectorsoption")) return GroupByOptions.Sectors;
  if (option.hasAttribute("ringsoption")) return GroupByOptions.Rings;
  return GroupByOptions.Sectors;
};

const activateOption = (option: GroupByOptionNode) => {
  const currentActiveOption = document.querySelector(
    "[groupbyoption].underline"
  );
  if (currentActiveOption) {
    currentActiveOption.classList.remove("underline");
  }
  option.classList.add("underline");
  setState({ groupBy: nodeToOption(option) });
  activateContainer();
};
