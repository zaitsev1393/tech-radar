import { d } from "../../helpers/selectors/d";
import type { GlobalStateModel } from "../../model/state";

export const renderGroups = (state: GlobalStateModel): void => {
  const sectorsContainer = d.id("sectorsContainer");
  if (!sectorsContainer) return;
  sectorsContainer.innerHTML = "";
  Object.entries(state.groups)
    .sort()
    .forEach(([name, bullets]) => {
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
      bullets.forEach((bullet, i) => {
        const item = document.createElement("div");
        item.innerText = `${i + 1}. ${bullet.name}`;
        item.classList.add("group-item");
        item.setAttribute("id", bullet.id?.toString() || "");
        list.appendChild(item);
      });

      column.appendChild(title);
      column.append(list);

      sectorsContainer?.appendChild(column);
    });
};
