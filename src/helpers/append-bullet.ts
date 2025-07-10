import { l } from "../logger/l";
import { createBullet } from "./create-bullet";
import { listenBullet } from "./listen-bullet";

export function appendBullet(event, el, bulletData) {
  const {
    fill = "black",
    stroke = "white",
    r = 10,
    cssClass = "bullet",
    cx,
    cy,
  } = bulletData;
  const dataId = bulletData["data-id"];
  l("bulletData: ", bulletData);
  const pt = el.createSVGPoint(); // створюємо точку
  l(cx, cy);
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
      title: "JavaScript",
      id: dataId || Math.floor(Math.random() * 100000),
    },
  });

  listenBullet(bullet);

  return bullet;
}
