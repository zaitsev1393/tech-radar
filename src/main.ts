import { DEFAULT_BULLET_CONFIG } from "./components/bullet/default-bullet.config";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { appendBullet } from "./helpers/append-bullet";
import { drawRadar } from "./helpers/draw-radar";
import { state, toggleState } from "./model/state";
import { saveBullet } from "./save/save";
import "./style.css";

toggleState({ creatingBulletMode: false });

listenCreateBulletToggle();

const svgContainer = drawRadar();

const radar = localStorage.getItem("radar");
if (radar) {
  const bullets = JSON.parse(radar).bullets;
  bullets.forEach((bullet) => {
    appendBullet(null, svgContainer, bullet);
  });
}

svgContainer.addEventListener("click", (event) => {
  if (state.creatingBulletMode) {
    const bullet = appendBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
    saveBullet(bullet);
    toggleState({ creatingBulletMode: false });
  }
});
