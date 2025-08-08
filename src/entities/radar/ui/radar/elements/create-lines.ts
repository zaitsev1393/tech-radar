interface CreateRadarLinesParams {
  r: number;
  el: SVGSVGElement;
  strokeColor?: string;
  strokeWidth: string;
}

export const createRadarLines = ({
  r,
  el,
  strokeColor = "white",
  strokeWidth = "1",
}: CreateRadarLinesParams) => {
  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  const radius = r.toString();

  verticalLine.setAttribute("x1", radius);
  verticalLine.setAttribute("y1", "0");
  verticalLine.setAttribute("x2", radius);
  verticalLine.setAttribute("y2", (r * 2).toString());

  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  horizontalLine.setAttribute("x1", "0");
  horizontalLine.setAttribute("y1", radius);
  horizontalLine.setAttribute("x2", (r * 2).toString());
  horizontalLine.setAttribute("y2", radius);

  verticalLine.setAttribute("stroke", strokeColor);
  verticalLine.setAttribute("strokeWidth", strokeWidth);
  horizontalLine.setAttribute("stroke", strokeColor);
  horizontalLine.setAttribute("strokeWidth", strokeWidth);

  el.appendChild(verticalLine);
  el.appendChild(horizontalLine);
};
