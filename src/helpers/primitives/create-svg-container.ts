import { toggleState } from "../../model/state";
import { d } from "../selectors/d";
interface GetSvgContainerArgs {
  id: number | null;
  width?: number | null;
  height?: number | null;
}
export const getSvgContainer = (
  { id, width, height }: GetSvgContainerArgs = {
    id: null,
  }
): Element | null => {
  if (!width || !height || !id) return null;

  const svgId = `svg-${id}`;
  const svgContainer: HTMLElement | null = d.id(svgId);

  if (svgContainer) return svgContainer;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("id", svgId);
  svg.setAttribute("radar", id.toString());
  svg.style.display = "none";
  toggleState({ svgContainer: svg });
  return svg;
};
