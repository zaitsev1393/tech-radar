import type { Bullet } from "../../model/bullet";
import type { SectorsInfo } from "../../model/sectors";
import { toggleState } from "../../model/state";

export interface GroupedBullets {
  [key: string]: Bullet[];
}

export function groupBullets(
  sectorsInfo: SectorsInfo,
  bullets: Bullet[]
): GroupedBullets {
  let groups = {};
  for (let bullet of bullets) {
    for (let sector of sectorsInfo.sectors) {
      let { cx, cy } = bullet;
      const x = parseInt(cx);
      const y = parseInt(cy);
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
  toggleState({ groups });
  return groups;
}
