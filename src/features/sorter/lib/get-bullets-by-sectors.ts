import { sectorsInfo } from "@/model/sectors";
import { state } from "@/model/state";
import type { BulletRead } from "../../../model/bullet-read";
import type { SorterData } from "../ui/sorter/update-sorter-container";

export interface BulletsBySector {
  [key: string]: BulletRead[];
}

export function getBulletsForSectors(): SorterData {
  let groups = {};
  const bullets = state.bullets.filter(
    ({ radarId }) => state.currentRadar?.id === radarId
  );
  for (let bullet of bullets) {
    for (let sector of sectorsInfo.sectors) {
      let { cx, cy } = bullet;
      const x = cx;
      const y = cy;
      if (
        x > sector.borders.x[0] &&
        x <= sector.borders.x[1] &&
        y > sector.borders.y[0] &&
        y <= sector.borders.y[1]
      ) {
        const { name } = sector;
        if (name in groups) {
          groups[name] = [...groups[name], bullet];
        } else {
          groups[name] = [bullet];
        }
      }
    }
  }
  // setState({ groups });
  return groups;
}
