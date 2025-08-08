import { RADAR_WIDTH } from "@/entities/radar/model/radar.config";
import { createSVGContainer } from "@/shared/utils/layout/create-svg-container";

const FONT_SIZE = 16;
export const DEFAULT_OFFSET = 16;
export const DEFAULT_ELEVATION = 4;
const RADIUS = RADAR_WIDTH / 2;

export const elWidth = (el: HTMLElement | SVGElement): number =>
  el.getBoundingClientRect().width;

export const elHeight = (el: HTMLElement | SVGElement): number =>
  el.getBoundingClientRect().height;

const createLabel = (root: Element, name: string, distance: number): void => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.textContent = name;
  text.setAttribute("text-anchor", "end");
  text.setAttribute("font-size", `${FONT_SIZE}`);
  text.setAttribute("fill", "white");
  root.appendChild(text);

  text.setAttribute("x", `${distance - elWidth(text) - DEFAULT_OFFSET}`);
  text.setAttribute("y", `${RADIUS + elHeight(text) - DEFAULT_ELEVATION}`);
};

export const createRingLabels = (id: number): void => {
  const svgContainer = createSVGContainer({ id });
  if (!svgContainer) return;
  createLabel(svgContainer, "Adopt", 400);
  createLabel(svgContainer, "Trial", 300);
  createLabel(svgContainer, "Assess", 200);
  createLabel(svgContainer, "Hold", 100);
};
