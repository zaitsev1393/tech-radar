import { createHorizontalLine } from "../lines/create-horizontal-line";
import { createVerticalLine } from "../lines/create-vertical-line";
import { createCircle } from "../primitives/create-circle";

export const drawRadar = ({
  title,
  r,
  circlesNum,
  cx,
  cy,
  el,
  stroke,
  fill,
}) => {
  for (let i = circlesNum; i >= 1; i--) {
    const circle = createCircle({
      cx,
      cy,
      r: (r / circlesNum) * i,
      stroke,
      fill,
      cssClass: `radar-circle radar-circle-${i}`,
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
