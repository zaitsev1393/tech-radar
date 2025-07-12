import { RADAR_HEIGHT, RADAR_WIDTH } from "../config/radar.config";
import { createRadar } from "./create-radar";
import { createSvgContainer } from "./create-svg-container";
import { d } from "./selectors/d";

export function drawRadar({
  width = RADAR_WIDTH,
  height = RADAR_HEIGHT,
  circlesNum = 4,
  stroke = "white",
  containerId = "svg",
} = {}) {
  const radarContainer = document.getElementById("radar");

  if (!radarContainer) throw new Error("Radar container not found");

  radarContainer.style.maxWidth = `${width}px`;
  radarContainer.style.maxHeight = `${height}px`;

  let svgContainer = createSvgContainer({
    root: radarContainer,
    id: containerId,
    width,
    height,
  });

  createRadar({
    cx: width / 2,
    cy: height / 2,
    r: width / 2,
    circlesNum,
    stroke,
    el: svgContainer,
  });

  return svgContainer;
}

export const redrawRadar = () => {
  const currentRadar = d.id("radar");
  if (currentRadar) {
    currentRadar.innerHTML = "";
    drawRadar();
  }
};
