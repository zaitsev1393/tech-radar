export const createVerticalLine = ({
  r,
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

  verticalLine.setAttribute("stroke", strokeColor);
  verticalLine.setAttribute("strokeWidth", strokeWidth);

  return verticalLine;
};
