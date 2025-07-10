import { DEFAULT_BULLET_CONFIG } from "./components/bullet/default-bullet.config";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { appendBullet } from "./helpers/append-bullet";
import { drawRadar } from "./helpers/draw-radar";
import { state, toggleState } from "./model/state";
import "./style.css";

toggleState({ creatingBulletMode: false });

listenCreateBulletToggle();

const svgContainer = drawRadar();

svgContainer.addEventListener("click", (event) => {
  if (state.creatingBulletMode) {
    appendBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
    toggleState({ creatingBulletMode: false });
  }
});
