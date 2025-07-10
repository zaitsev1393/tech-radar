import { RADAR_HEIGHT, RADAR_WIDTH } from "../config/radar.config";
import { createRadar } from "./create-radar";
import { createSvgContainer } from "./create-svg-container";

export function drawRadar({
  width = RADAR_WIDTH,
  height = RADAR_HEIGHT,
  circlesNum = 4,
  stroke = "white",
  containerId = "svg",
} = {}) {
  const radarContainer = document.getElementById("radar");

  if (!radarContainer) throw new Error("Radar container not found");

  radarContainer.style.width = `${width}px`;
  radarContainer.style.height = `${height}px`;

  let svgContainer = createSvgContainer({
    root: radarContainer,
    id: containerId,
    width: width,
    height: height,
  });

  createRadar({
    cx: width / 2,
    cy: height / 2,
    radius: width / 2,
    circlesNum,
    stroke,
    el: svgContainer,
  });
  return svgContainer;
}
