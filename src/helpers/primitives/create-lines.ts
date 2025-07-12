export const createRadarLines = ({
  r,
  el,
  strokeColor = "white",
  strokeWidth = "1",
}) => {
  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  verticalLine.setAttribute("x1", r);
  verticalLine.setAttribute("y1", 0);
  verticalLine.setAttribute("x2", r);
  verticalLine.setAttribute("y2", r * 2);

  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  horizontalLine.setAttribute("x1", 0);
  horizontalLine.setAttribute("y1", r);
  horizontalLine.setAttribute("x2", r * 2);
  horizontalLine.setAttribute("y2", r);

  verticalLine.setAttribute("stroke", strokeColor);
  verticalLine.setAttribute("strokeWidth", strokeWidth);
  horizontalLine.setAttribute("stroke", strokeColor);
  horizontalLine.setAttribute("strokeWidth", strokeWidth);
  el.appendChild(verticalLine);
  el.appendChild(horizontalLine);
};
