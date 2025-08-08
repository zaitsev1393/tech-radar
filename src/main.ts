import { createPopup } from "@/shared/ui/popup/create-popup";
import { listenCreateBulletToggle } from "./components/create-bullet-toggle";
import { listenDeleteAllRadarsButton } from "./components/delete-all-radars-button/listen-delete-all-radars";
import { listenDeleteButton } from "./components/delete-bullet-button/listen-delete-button";
import { EditForm } from "./components/edit-form/edit-form";
import { listenGroupByOptions } from "./components/group-by/group-by-options";
import { groupBullets } from "./components/groups/group-bullets";
import { listenSignUpButton } from "./components/sign-up-button/sign-up-button";
import { renderTabs } from "./components/tabs/render-tabs";
import { isAuthenticated } from "./data-access/auth.service";
import { getRadars } from "./data-access/radars.service";
import { DEFAULT_RADAR_CONFIG } from "./entities/radar/model/radar.config";
import { createRadar } from "./entities/radar/ui/create-radar";
import { getRadarsContainer } from "./entities/radar/utils/get-radar-node";
import { drawBullets } from "./helpers/bullet/draw-bullets";
import { listenToDocumentEvents } from "./helpers/bullet/listen-bullet";
import { getRingsInfo } from "./helpers/rings/get-rings-info";
import { d } from "./helpers/selectors/d";
import { listenClearAllButton } from "./helpers/ui/listen-clear-all-button";
import type { Radar } from "./model/radar";
import { sectorsInfo } from "./model/sectors";
import { setState, state } from "./model/state";
import { l } from "./shared/utils/logger/l";
import "./style.css";

createPopup();
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
      createRadar(getRadarsContainer(DEFAULT_RADAR_CONFIG), radar);
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
