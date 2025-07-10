export const createCircle = ({
  r,
  el,
  stroke,
  cx,
  cy,
  fill,
  cssClass = "",
  data = {},
}) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", fill || "none");
  circle.setAttribute("stroke", stroke);
  circle.setAttribute("class", cssClass);
  if (Object.keys(data).length) {
    for (const key in data) {
      circle.setAttribute(`data-${key}`, data[key]);
    }
  }
  el.appendChild(circle);
  return circle;
};
