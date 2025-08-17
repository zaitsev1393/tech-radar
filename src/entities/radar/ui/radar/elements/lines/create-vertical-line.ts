import { Colors } from "@/config/styles/colors";

interface CreateVerticalLineProps {
  r: number;
  strokeColor?: string;
  strokeWidth?: string;
}

export const createVerticalLine = ({
  r,
  strokeColor = Colors.Radar.Line,
  strokeWidth = "1",
}: CreateVerticalLineProps) => {
  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  verticalLine.setAttribute("x1", r.toString());
  verticalLine.setAttribute("y1", "0");
  verticalLine.setAttribute("x2", r.toString());
  verticalLine.setAttribute("y2", (r * 2).toString());

  verticalLine.setAttribute("stroke", strokeColor);
  verticalLine.setAttribute("strokeWidth", strokeWidth);

  return verticalLine;
};
