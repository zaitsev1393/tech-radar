export const createHorizontalLine = ({
  r,
  strokeColor = "white",
  strokeWidth = "1",
}) => {
  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  horizontalLine.setAttribute("x1", 0);
  horizontalLine.setAttribute("y1", r);
  horizontalLine.setAttribute("x2", r * 2);
  horizontalLine.setAttribute("y2", r);

  horizontalLine.setAttribute("stroke", strokeColor);
  horizontalLine.setAttribute("strokeWidth", strokeWidth);
  return horizontalLine;
};
