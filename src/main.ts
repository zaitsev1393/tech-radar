import { DEFAULT_BULLET_CONFIG } from "./components/bullet/default-bullet.config";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { appendPopup } from "./components/popup/append-popup";
import { removePopup } from "./components/popup/remove-popup";
import { createCircle } from "./helpers/create-circle";
import { drawRadar } from "./helpers/draw-radar";
import { l } from "./logger/l";
import { state, toggleState } from "./model/state";
import "./style.css";

// Console setup
console.clear();

const popup = document.getElementById("radar-popup");

toggleState({ creatingBulletMode: false });
listenCreateBulletToggle();

const svgContainer = drawRadar();

const createBullet = (args) => {
  const bullet = createCircle(args);
  listenBullet(bullet);
};

svgContainer.addEventListener("click", (event) => {
  if (state.creatingBulletMode) {
    appendBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
    toggleState({ creatingBulletMode: false });
  }
});

function appendBullet(
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
    el: svgContainer,
    cssClass,
    data: { name: "JavaScript" },
  });
}

function listenBullet(bullet) {
  bullet.addEventListener("mouseenter", (event) => {
    // console.log("🟢 entered");
    const rect = event.target.getBoundingClientRect();
    const { name } = event.target.dataset;
    appendPopup(popup, {
      top: rect.top,
      left: rect.left,
      offset: {
        x: rect.width,
        y: rect.height,
      },
      data: { title: name, description: "" },
    });
  });

  bullet.addEventListener("mouseleave", (event) => {
    // console.log("🔴 left");
    removePopup(popup);
  });

  bullet.addEventListener("click", (event) => {
    l("bullet clicked: ", event);
  });
}
