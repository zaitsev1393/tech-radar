import { toggleState } from "../../model/state";
import { d } from "../selectors/d";

export const getSvgContainer = ({ id, width, height } = {}) => {
  const svgContainer = d.id("svg");

  if (svgContainer) return svgContainer;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("id", id);

  toggleState({ svgContainer: svg });
  return svg;
};
