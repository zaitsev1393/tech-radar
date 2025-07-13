import { v4 as uuidv4 } from "uuid";
import { createBullet } from "./create-bullet";

export function getBullet(event, el, bulletData) {
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

  const svgCoords = pt.matrixTransform(el.getScreenCTM().inverse()); // конвертуємо
  // console.log("SVG coords:", svgCoords.x, svgCoords.y);
  const bullet = createBullet({
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
      id: dataId || uuidv4(),
    },
  });

  return bullet;
}
