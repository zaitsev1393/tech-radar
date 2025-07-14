import { RADAR_WIDTH } from "../../config/radar.config";
import { getSvgContainer } from "../primitives/create-svg-container";

const FONT_SIZE = 16;
const DEFAULT_OFFSET = 16;
const RADIUS = RADAR_WIDTH / 2;

const elWidth = (el: HTMLElement | SVGElement): number =>
  el.getBoundingClientRect().width;

const elHeight = (el: HTMLElement | SVGElement): number =>
  el.getBoundingClientRect().height;

const createLabel = (name: string, distance: number): void => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const svgContainer = getSvgContainer();

  text.textContent = name;
  // text.setAttribute("text-anchor", "end");
  text.setAttribute("font-size", `${FONT_SIZE}`);
  text.setAttribute("fill", "white");
  svgContainer.appendChild(text);

  text.setAttribute("x", `${distance - elWidth(text) - DEFAULT_OFFSET}`);
  text.setAttribute("y", `${RADIUS + elHeight(text)}`);
};

export const createRingLabels = () => {
  createLabel("Adopt", 400);
  createLabel("Trial", 300);
  createLabel("Assess", 200);
  createLabel("Hold", 100);
};
