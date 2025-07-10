import { createBullet } from "./create-bullet";

export function appendBullet(
  event,
  el,
  { fill = "black", stroke = "white", radius = 10, cssClass = "bullet" }
) {
  const pt = el.createSVGPoint(); // створюємо точку
  pt.x = event.clientX;
  pt.y = event.clientY;

  const svgCoords = pt.matrixTransform(el.getScreenCTM().inverse()); // конвертуємо
  // console.log("SVG coords:", svgCoords.x, svgCoords.y);
  createBullet({
    cx: svgCoords.x,
    cy: svgCoords.y,
    radius,
    fill,
    stroke,
    el,
    cssClass,
    data: { name: "JavaScript" },
  });
}
