import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { listenDeleteAllRadarsButton } from "./components/delete-all-radars-button/listen-delete-all-radars";
import { listenDeleteButton } from "./components/delete-bullet-button/listen-delete-button";
import { EditForm } from "./components/edit-form/edit-form";
import { listenGroupByOptions } from "./components/group-by/group-by-options";
import { groupBullets } from "./components/groups/group-bullets";
import { createRadar } from "./components/radar/radar";
import { listenSignUpButton } from "./components/sign-up-button/sign-up-button";
import { renderTabs } from "./components/tabs/render-tabs";
import { DEFAULT_RADAR_CONFIG } from "./config/radar.config";
import { drawBullets } from "./helpers/bullet/draw-bullets";
import { listenToDocumentEvents } from "./helpers/bullet/listen-bullet";
import { getRadarNode } from "./helpers/radar/get-radar-node";
import { getRingsInfo } from "./helpers/rings/get-rings-info";
import { d } from "./helpers/selectors/d";
import { listenClearAllButton } from "./helpers/ui/listen-clear-all-button";
import type { Radar } from "./model/radar";
import { sectorsInfo } from "./model/sectors";
import { setState, state } from "./model/state";
import { isAuthenticated } from "./services/auth.service";
import { getRadars } from "./services/radars.service";
import { l } from "./shared/logger/l";
import "./style.css";

listenCreateBulletToggle();
listenClearAllButton();
listenDeleteButton();
listenGroupByOptions();
listenSignUpButton();
listenDeleteAllRadarsButton();
listenToDocumentEvents();

let bullets = [];
const savedRadar = localStorage.getItem("radar");
if (savedRadar) {
  bullets = JSON.parse(savedRadar)["bullets"];
}

setState({
  bullets,
});

// const radarContainerNode = getRadarNode(DEFAULT_RADAR_CONFIG);
// const svgContainer = getSvgContainer(DEFAULT_SVG_CONTAINER_CONFIG);

// radarContainerNode.appendChild(svgContainer);

// drawRadar({
//   cx: DEFAULT_RADAR_CONFIG.width / 2,
//   cy: DEFAULT_RADAR_CONFIG.height / 2,
//   r: DEFAULT_RADAR_CONFIG.width / 2,
//   circlesNum: 4,
//   stroke: "white",
//   fill: "none",
//   el: svgContainer,
// });

// createSectorLabels(sectorsInfo, svgContainer);
// createRingLabels();

// drawSavedBullets();

// svgContainer.addEventListener("click", (event) => {
//   if (state.creatingBulletMode) {
//     const bullet = getBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
//     svgContainer.appendChild(bullet);
//     listenBullet(bullet);
//     saveBullet(nodeToJsonBullet(bullet));
//     setState({ creatingBulletMode: false });
//   }
// });

const openEditFormButton = d.id("openEditFormButton");
openEditFormButton?.addEventListener("click", (event) => {
  EditForm().open();
  openEditFormButton.classList.add("hidden");
});

if (document.URL.includes("auth/success")) {
  updateUiAfterAuth();
}

updateUiAfterAuth();

async function updateUiAfterAuth() {
  const signUpButton = d.id("signUpButton");
  const profileSection = d.id("profileSection");
  if (!signUpButton) return;

  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    signUpButton.style.display = "none";
    if (profileSection) {
      profileSection.style.display = "block";
    }
  } else {
    signUpButton.style.display = "block";
  }
}

if (await isAuthenticated()) {
  try {
    const radarsResponse = await getRadars();
    const radars = await radarsResponse.json();
    l("radars: ", radars);
    radars.forEach((radar: Radar) => {
      createRadar(getRadarNode(DEFAULT_RADAR_CONFIG), radar);
    });
    const svgRadarContainers = document.querySelectorAll("[radar]");
    if (svgRadarContainers[0]) {
      svgRadarContainers[0].style.display = "block";
    }
    renderTabs(radars);
    setState({
      radars,
      currentRadar: radars[0],
      bullets: radars.map(({ bullets }: Radar) => bullets).flat(),
    });
    groupBullets(sectorsInfo, state.bullets);
    getRingsInfo(state);
    drawBullets(radars);
  } catch (e) {
    console.error(e);
  }
}
