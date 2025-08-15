import type { BulletRead } from "@/model/bullet-read";
import type { Radar } from "@/model/radar";
import { d } from "@/shared/utils/layout/d";

interface SorterData {
  [key: string]: BulletRead[];
}

type SorterDataEntries = [string, BulletRead[]];

export const SORTER_CONTAINER_ID = "sorter-container";

const createColumn = (name: string, bullets: BulletRead[]): HTMLElement => {
  const column = document.createElement("div");
  column.classList.add("mt-4", "basis-full", "md:basis-auto", "sm:basis-full");
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
  return column;
};

export const updateSorterContainer = (
  sortedData: SorterData,
  radar: Radar
): void => {
  const sorterContainer = d.id(SORTER_CONTAINER_ID);
  if (sorterContainer) {
    sorterContainer.innerHTML = "";
  } else {
    return;
  }

  Object.entries(sortedData)
    .sort()
    .map(
      ([name, bullets]): SorterDataEntries => [
        name,
        bullets.filter((b) => b.radarId === radar.id),
      ]
    )
    .filter(([_, bullets]) => bullets.length > 0)
    .forEach(([name, bullets]) => {
      const column = createColumn(name, bullets);
      sorterContainer.appendChild(column);
    });
};
