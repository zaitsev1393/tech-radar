import { d } from "../../helpers/selectors/d";
import { state } from "../../model/state";

export const renderRingGroups = () => {
  const ringsInfo = state.ringsInfo;
  const ringsContainer = d.id("ringsContainer");
  if (ringsContainer) {
    ringsContainer.innerHTML = null;
  }
  // l("rings info: ", ringsInfo);
  Object.entries(state.ringsInfo)
    .sort()
    .forEach(([name, nodes]) => {
      const column = document.createElement("div");
      column.classList.add(
        "mt-4",
        "basis-full",
        "md:basis-auto",
        "sm:basis-full"
      );
      const title = document.createElement("div");
      title.classList.add("underline");
      title.innerText = name;

      const list = document.createElement("div");
      nodes.forEach((node, i) => {
        const item = document.createElement("div");
        item.innerText = `${i + 1}. ${node["data-title"]}`;
        item.classList.add("group-item");
        item.dataset.id = node["data-id"];
        list.appendChild(item);
      });

      column.appendChild(title);
      column.append(list);

      ringsContainer?.appendChild(column);
    });
};
