import { createPopup } from "@/shared/ui/popup/create-popup";
import { isAuthenticated } from "./data-access/auth.service";
import { getRadars } from "./data-access/radars.service";
import { listenToDocumentEvents } from "./entities/bullet/lib/listen-bullet";
import { drawBullets } from "./entities/bullet/ui/draw-bullets";
import { DEFAULT_RADAR_CONFIG } from "./entities/radar/model/radar.config";
import { createRadar } from "./entities/radar/ui/create-radar";
import { getRadarsContainer } from "./entities/radar/utils/get-radar-node";
import { listenDeleteButton } from "./features/bullet-overview/delete-bullet-button/listen-delete-button";
import { EditForm } from "./features/bullet-overview/edit-form/edit-form";
import { listenCreateBulletToggle } from "./features/radars/ui/create-bullet-toggle";
import { InputForm } from "./features/radars/ui/create-radar-form/input-form";
import { getRingsInfo } from "./features/sorter/lib/get-rings-info";
import { listenGroupByOptions } from "./features/sorter/ui/group-by/group-by-options";
import { groupBullets } from "./features/sorter/ui/groups/group-bullets";
import type { Radar } from "./model/radar";
import { sectorsInfo } from "./model/sectors";
import { setState, state } from "./model/state";
import { createModal } from "./shared/modal/create-modal";
import { Modal } from "./shared/modal/modal";
import { listenDeleteAllRadarsButton } from "./shared/testing/delete-all-radars-button/listen-delete-all-radars";
import { listenSignUpButton } from "./shared/ui/header/sign-up-button/sign-up-button";
import { renderTabs } from "./shared/ui/tabs/render-tabs";
import { d } from "./shared/utils/layout/d";
import { l } from "./shared/utils/logger/l";
import "./style.css";

createPopup();
listenCreateBulletToggle();
listenDeleteButton();
listenGroupByOptions();
listenSignUpButton();
listenDeleteAllRadarsButton();
listenToDocumentEvents();
createModal();

export const modalService = Modal();

(window as any).modalService = modalService;

const form = new InputForm();

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
