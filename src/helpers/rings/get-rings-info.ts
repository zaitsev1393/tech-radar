import { RADAR_WIDTH } from "../../config/radar.config";
import type { Bullet } from "../../model/bullet";
import { state, toggleState } from "../../model/state";
import { isBulletInRing } from "./is-bullet-in-ring";

const RADIUS = RADAR_WIDTH / 2;
const RINGS = [
  {
    name: "Hold",
    innerRadius: 0,
    outerRadius: 100,
  },
  {
    name: "Trial",
    innerRadius: 100,
    outerRadius: 200,
  },
  {
    name: "Assess",
    innerRadius: 200,
    outerRadius: 300,
  },
  {
    name: "Hold",
    innerRadius: 300,
    outerRadius: 400,
  },
];

export type RingsInfo = {
  [key: string]: Bullet[];
};

export const getRingsInfo = (): RingsInfo => {
  const bullets = state.bullets;
  const ringsInfo: any = {};
  bullets.forEach((bullet) => {
    RINGS.forEach((ring, i) => {
      if (
        isBulletInRing(
          parseInt(bullet.cx),
          parseInt(bullet.cy),
          RADIUS,
          RADIUS,
          ring.innerRadius,
          ring.outerRadius
        )
      ) {
        const name = ring.name;
        if (name in ringsInfo) {
          ringsInfo[name].push(bullet);
        } else {
          ringsInfo[name] = [bullet];
        }
      }
    });
  });
  toggleState({ ringsInfo });
  return ringsInfo;
};
