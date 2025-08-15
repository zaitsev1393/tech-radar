import { SORTER_CONTAINER_ID } from "./model/sorter-container-id";

export const createSorterContainer = (): HTMLElement => {
  const sorterContainer = document.createElement("div");
  sorterContainer.id = SORTER_CONTAINER_ID;
  return sorterContainer;
};
