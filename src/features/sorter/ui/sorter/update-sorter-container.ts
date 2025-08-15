import type { BulletRead } from "@/model/bullet-read";
import type { Radar } from "@/model/radar";
import { d } from "@/shared/utils/layout/d";
import { getSorterData } from "../../lib/get-sorter-data";
import type { SorterGroupByOptions } from "../../model/sorter-group-by";
import { activateSorterTab } from "../sorter-tabs/helpers/activate-sorter-tab";
import { createColumn } from "./helpers/create-column";
import { SORTER_CONTAINER_ID } from "./model/sorter-container-id";

export interface SorterData {
  [key: string]: BulletRead[];
}

type SorterDataEntries = [string, BulletRead[]];

export const updateSorterContainer = (
  groupBy: SorterGroupByOptions,
  radar: Radar | null
): void => {
  if (!radar) return;

  const sorterContainer = d.id(SORTER_CONTAINER_ID);
  if (sorterContainer) {
    sorterContainer.innerHTML = "";
  } else {
    return;
  }

  const sorterData = getSorterData(groupBy);
  activateSorterTab(groupBy);

  Object.entries(sorterData)
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
