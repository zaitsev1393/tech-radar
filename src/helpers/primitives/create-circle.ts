export interface CircleProps {
  r: number;
  stroke: string;
  cx: number;
  cy: number;
  fill?: string;
  cssClass?: string;
}

export const createCircle = (props: CircleProps) => {
  const { r, stroke, cx, cy, fill, cssClass = "" } = props;
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", cx.toString());
  circle.setAttribute("cy", cy.toString());
  circle.setAttribute("r", r.toString());
  circle.setAttribute("fill", fill || "none");
  circle.setAttribute("stroke", stroke);
  circle.setAttribute("class", cssClass);

  return circle;
};
