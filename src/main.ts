import { DEFAULT_BULLET_CONFIG } from "./components/bullet/default-bullet.config";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import {
  DEFAULT_RADAR_CONFIG,
  DEFAULT_SVG_CONTAINER_CONFIG,
} from "./config/radar.config";
import { getBullet } from "./helpers/bullet/get-bullet";
import { listenBullet } from "./helpers/bullet/listen-bullet";
import { getSvgContainer } from "./helpers/primitives/create-svg-container";
import { createRadar } from "./helpers/radar/create-radar";
import { drawSavedBullets } from "./helpers/radar/draw-saved-bullets";
import { getRadarNode } from "./helpers/radar/get-radar-node";
import { listenClearAllButton } from "./helpers/ui/listen-clear-all-button";
import { state, toggleState } from "./model/state";
import { saveBullet } from "./save/save";
import "./style.css";

listenCreateBulletToggle();
listenClearAllButton();

const radarNode = getRadarNode(DEFAULT_RADAR_CONFIG);
const svgContainer = getSvgContainer(DEFAULT_SVG_CONTAINER_CONFIG);

radarNode.appendChild(svgContainer);
createRadar({
  cx: DEFAULT_RADAR_CONFIG.width / 2,
  cy: DEFAULT_RADAR_CONFIG.height / 2,
  r: DEFAULT_RADAR_CONFIG.width / 2,
  circlesNum: 4,
  stroke: "white",
  fill: "none",
  el: svgContainer,
});

drawSavedBullets();

svgContainer.addEventListener("click", (event) => {
  if (state.creatingBulletMode) {
    const bullet = getBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
    svgContainer.appendChild(bullet);
    listenBullet(bullet);
    saveBullet(bullet);
    toggleState({ creatingBulletMode: false });
  }
});
