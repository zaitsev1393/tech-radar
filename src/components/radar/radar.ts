import {
  DEFAULT_RADAR_CONFIG,
  DEFAULT_SVG_CONTAINER_CONFIG,
} from "../../config/radar.config";
import { getSvgContainer } from "../../helpers/primitives/create-svg-container";
import { createTextLabel } from "../../helpers/primitives/create-text-label";
import { drawRadar } from "../../helpers/radar/create-radar";
import { createRingLabels } from "../../helpers/radar/create-ring-labels";
import { createSectorLabels } from "../../helpers/radar/create-sectors-labels";
import type { Radar } from "../../model/radar";
import { sectorsInfo } from "../../model/sectors";

export function createRadar(root: HTMLElement, radar: Radar): void {
  const svgId = `svg-${radar.id}`;
  const svgContainer: SVGSVGElement = getSvgContainer({
    ...DEFAULT_SVG_CONTAINER_CONFIG,
    id: svgId,
  });

  root.appendChild(svgContainer);

  drawRadar({
    title: radar.title,
    cx: DEFAULT_RADAR_CONFIG.width / 2,
    cy: DEFAULT_RADAR_CONFIG.height / 2,
    r: DEFAULT_RADAR_CONFIG.width / 2,
    circlesNum: 4,
    stroke: "white",
    fill: "none",
    el: svgContainer,
  });

  createTextLabel({
    root: svgContainer,
    x: 50,
    y: 50,
    text: radar.title,
    config: { "font-size": 16, color: "white" },
  });

  createSectorLabels(sectorsInfo, svgContainer);
  createRingLabels(svgId);
}
