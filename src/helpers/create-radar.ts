import { createCircle } from "./create-circle";
import { createRadarLines } from "./create-lines";

export const createRadar = ({ radius, circlesNum, cx, cy, el, stroke }) => {
  for (let i = 1; i <= circlesNum; i++) {
    createCircle({
      cx,
      cy,
      radius: (radius / circlesNum) * i,
      stroke,
      el,
    });
  }
  createRadarLines({
    el,
    stroke,
    radius,
  });
};
