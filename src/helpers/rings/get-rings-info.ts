import { RADAR_WIDTH } from "../../components/radar/radar.config";
import type { BulletRead } from "../../model/bullet-read";
import { setState, type GlobalStateModel } from "../../model/state";
import { isBulletInRing } from "./is-bullet-in-ring";

const RADIUS = RADAR_WIDTH / 2;
const RINGS = [
  {
    name: "Adopt",
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
  [key: string]: BulletRead[];
};

export const getRingsInfo = (state: GlobalStateModel): RingsInfo => {
  const bullets = state.bullets;
  const ringsInfo: any = {};
  bullets.forEach((bullet) => {
    RINGS.forEach((ring, i) => {
      if (
        isBulletInRing(
          bullet.cx,
          bullet.cy,
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
  setState({ ringsInfo });
  return ringsInfo;
};
