import { d } from "./d";
interface createSVGContainerArgs {
  id: number | null;
  width?: number | null;
  height?: number | null;
}
export const createSVGContainer = (
  { id, width, height }: createSVGContainerArgs = {
    id: null,
  }
): SVGSVGElement | null => {
  if (!id) return null;

  const svgId = `svg-${id}`;
  const svgContainer = d.id(svgId) as SVGSVGElement | null;

  if (svgContainer) return svgContainer;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("id", svgId);
  svg.setAttribute("radar", id.toString());
  svg.style.display = "none";
  return svg;
};
