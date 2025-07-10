export const createSvgContainer = ({ root, id, width, height }) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("id", id);
  root.appendChild(svg);
  return svg;
};
