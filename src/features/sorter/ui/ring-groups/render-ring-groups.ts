import type { BulletRead } from "@/model/bullet-read";
import { type GlobalStateModel } from "../../../../model/state";
import { d } from "../../../../shared/utils/layout/d";

export const renderRingGroups = (state: GlobalStateModel): void => {
  const ringsInfo = state.ringsInfo;
  const ringsContainer = d.id("ringsContainer");
  if (ringsContainer) {
    ringsContainer.innerHTML = "";
  }

  const currentRadar = state?.currentRadar;

  // l("rings info: ", ringsInfo);
  Object.entries(ringsInfo)
    .sort()
    .map(
      ([name, bullets]) =>
        [name, bullets.filter((b) => b.radarId === currentRadar?.id)] as [
          string,
          BulletRead[]
        ]
    )
    .filter(([name, bullets]) => bullets.length > 0)
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
        item.setAttribute("id", bullet?.id?.toString() || "");
        list.appendChild(item);
      });

      column.appendChild(title);
      column.append(list);

      ringsContainer?.appendChild(column);
    });
};
