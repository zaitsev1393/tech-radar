import { createCircle } from "./create-circle";
import { createRadarLines } from "./create-lines";

export const createRadar = ({ r, circlesNum, cx, cy, el, stroke }) => {
  for (let i = 1; i <= circlesNum; i++) {
    createCircle({
      cx,
      cy,
      r: (r / circlesNum) * i,
      stroke,
      el,
    });
  }
  createRadarLines({
    el,
    stroke,
    r,
  });
};
