import { createBulletNode } from "./create-bullet";

export function getBullet(
  event: MouseEvent,
  el: SVGSVGElement,
  bulletData: any
): SVGCircleElement | null {
  if (!el) return null;

  const {
    fill = "black",
    stroke = "white",
    r = 10,
    cssClass = "bullet",
    cx,
    cy,
  } = bulletData;

  const dataId = bulletData["data-id"];
  const title = bulletData["data-title"];
  const description = bulletData["data-description"];
  const pt = el.createSVGPoint(); // створюємо точку

  if (event) {
    pt.x = event.clientX;
    pt.y = event.clientY;
  }

  const svgCoords = pt.matrixTransform(el.getScreenCTM()?.inverse()); // конвертуємо
  // console.log("SVG coords:", svgCoords.x, svgCoords.y);
  const bullet = createBulletNode({
    cx: cx || svgCoords.x,
    cy: cy || svgCoords.y,
    r,
    fill,
    stroke,
    el,
    cssClass,
    data: {
      title: title || "No title",
      description: description || "No description",
    },
  });

  return bullet;
}
