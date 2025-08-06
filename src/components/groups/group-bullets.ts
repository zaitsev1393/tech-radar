import type { BulletRead } from "../../model/bullet-read";
import { type SectorsInfo } from "../../model/sectors";
import { setState } from "../../model/state";

export interface GroupedBullets {
  [key: string]: BulletRead[];
}

export function groupBullets(
  sectorsInfo: SectorsInfo,
  bullets: BulletRead[]
): GroupedBullets {
  let groups = {};
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
  setState({ groups });
  return groups;
}
