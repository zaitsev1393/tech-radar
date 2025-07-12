import { createHorizontalLine } from "../lines/create-horizontal-line";
import { createVerticalLine } from "../lines/create-vertical-line";
import { createCircle } from "../primitives/create-circle";

export const createRadar = ({ r, circlesNum, cx, cy, el, stroke, fill }) => {
  for (let i = 1; i <= circlesNum; i++) {
    const circle = createCircle({
      cx,
      cy,
      r: (r / circlesNum) * i,
      stroke,
      fill,
    });
    el.appendChild(circle);
  }

  const LINE_CONFIG = { stroke, r };
  const lines = [
    createVerticalLine(LINE_CONFIG),
    createHorizontalLine(LINE_CONFIG),
  ];
  lines.forEach((line) => el.appendChild(line));
};
