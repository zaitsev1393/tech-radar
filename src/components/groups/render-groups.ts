import { d } from "../../helpers/selectors/d";

export const renderGroups = (state) => {
  const groupsContainer = d.id("groupsContainer");
  groupsContainer.innerHTML = null;
  Object.entries(state.groups)
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
        const item = document.createElement("span");
        item.innerText = `${i + 1}. ${node["data-title"]}`;
        item.classList.add("group-item");
        item.dataset.id = node["data-id"];
        list.appendChild(item);
      });

      column.appendChild(title);
      column.append(list);

      groupsContainer?.appendChild(column);
    });
};
