import { DEFAULT_BULLET_CONFIG } from "./components/bullet/default-bullet.config";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { EditForm } from "./components/edit-form/edit-form";
import { groupBullets } from "./components/groups/group-bullets";
import {
  DEFAULT_RADAR_CONFIG,
  DEFAULT_SVG_CONTAINER_CONFIG,
} from "./config/radar.config";
import { getBullet } from "./helpers/bullet/get-bullet";
import { listenBullet } from "./helpers/bullet/listen-bullet";
import { nodeToJsonBullet } from "./helpers/mappers/node-to-jsonbullet";
import { getSvgContainer } from "./helpers/primitives/create-svg-container";
import { createRadar } from "./helpers/radar/create-radar";
import { createSectorLabels } from "./helpers/radar/create-sectors-labels";
import { drawSavedBullets } from "./helpers/radar/draw-saved-bullets";
import { getRadarNode } from "./helpers/radar/get-radar-node";
import { d } from "./helpers/selectors/d";
import { listenClearAllButton } from "./helpers/ui/listen-clear-all-button";
import { sectorsInfo } from "./model/sectors";
import { state, toggleState } from "./model/state";
import { saveBullet } from "./save/save";
import "./style.css";

listenCreateBulletToggle();
listenClearAllButton();
let bullets = [];
const savedRadar = localStorage.getItem("radar");
if (savedRadar) {
  bullets = JSON.parse(savedRadar)["bullets"];
}

toggleState({
  bullets,
});

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
createSectorLabels(sectorsInfo, svgContainer);

svgContainer.addEventListener("click", (event) => {
  if (state.creatingBulletMode) {
    const bullet = getBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
    svgContainer.appendChild(bullet);
    listenBullet(bullet);
    saveBullet(nodeToJsonBullet(bullet));
    toggleState({ creatingBulletMode: false });
  }
});

const openEditFormButton = d.id("openEditFormButton");
openEditFormButton?.addEventListener("click", (event) => {
  EditForm().open();
  openEditFormButton.classList.add("hidden");
});

groupBullets(sectorsInfo, state.bullets);

// const circles = d.all(".radar-circle");
// for (const circle of circles) {
//   circle.addEventListener("mouseenter", (event) => {
//     event.target.style.fill = "var(--mid)";
//   });
//   circle.addEventListener("mouseleave", (event) => {
//     event.target.style.fill = "var(--bg)";
//   });
// }
