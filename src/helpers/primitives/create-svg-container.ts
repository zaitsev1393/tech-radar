import { toggleState } from "../../model/state";
import { d } from "../selectors/d";

export const getSvgContainer = ({ id, width, height } = {}): SVGSVGElement => {
  const svgContainer = d.id(id);

  if (svgContainer) return svgContainer;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("id", id);
  svg.setAttribute("radar", "true");
  svg.style.display = "none";
  toggleState({ svgContainer: svg });
  return svg;
};
