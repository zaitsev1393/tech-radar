import { createHorizontalLine } from "@/helpers/lines/create-horizontal-line";
import { createVerticalLine } from "@/helpers/lines/create-vertical-line";
import { createCircle } from "@/helpers/primitives/create-circle";

interface DrawRadarParams {
  title: string;
  r: number;
  circlesNum: number;
  cx: number;
  cy: number;
  el: HTMLElement;
  stroke: string;
  fill: string;
}

export const drawRadar = ({
  title,
  r,
  circlesNum,
  cx,
  cy,
  el,
  stroke,
  fill,
}: DrawRadarParams) => {
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
