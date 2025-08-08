interface CreateHorizontalLineProps {
  r: number;
  strokeColor?: string;
  strokeWidth?: string;
}

export const createHorizontalLine = ({
  r,
  strokeColor = "white",
  strokeWidth = "1",
}: CreateHorizontalLineProps) => {
  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  horizontalLine.setAttribute("x1", "0");
  horizontalLine.setAttribute("y1", r.toString());
  horizontalLine.setAttribute("x2", (r * 2).toString());
  horizontalLine.setAttribute("y2", r.toString());

  horizontalLine.setAttribute("stroke", strokeColor);
  horizontalLine.setAttribute("strokeWidth", strokeWidth);
  return horizontalLine;
};
