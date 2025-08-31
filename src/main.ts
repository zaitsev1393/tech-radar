import { createPopup } from "@/shared/ui/popup/create-popup";
import { currentUser, isAuthenticated } from "./data-access/auth.service";
import { initializeInterceptors } from "./data-access/interceptors/main-interceptor";
import { getRadars } from "./data-access/radars.service";
import { listenToDocumentEvents } from "./entities/bullet/lib/listen-bullet";
import { drawBullets } from "./entities/bullet/ui/draw-bullets";
import { editBulletHandler } from "./entities/bullet/ui/modal/edit-handler/edit-handler";
import { DEFAULT_RADAR_CONFIG } from "./entities/radar/model/radar.config";
import { createRadar } from "./entities/radar/ui/create-radar";
import { getRadarsContainer } from "./entities/radar/utils/get-radar-node";
import { BulletModal } from "./features/bullet-overview/bullet-modal.ts/bullet-modal";
import { listenDeleteButton } from "./features/bullet-overview/delete-bullet-button/listen-delete-button";
import { listenCreateBulletToggle } from "./features/radars/ui/create-bullet-toggle";
import { renderTabs } from "./features/radars/ui/tabs/render-tabs";
import { SorterGroupByOptions } from "./features/sorter/model/sorter-group-by";
import { createSorterTabs } from "./features/sorter/ui/sorter-tabs/create-tabs";
import { createSorterContainer } from "./features/sorter/ui/sorter/create-sorter";
import { updateSorterContainer } from "./features/sorter/ui/sorter/update-sorter-container";
import type { Radar } from "./model/radar";
import { setState, state } from "./model/state";
import { listenDeleteAllRadarsButton } from "./shared/testing/delete-all-radars-button/listen-delete-all-radars";
import { listenLogoutButton } from "./shared/ui/header/sign-out/sign-out";
import { listenSignUpButton } from "./shared/ui/header/sign-up-button/sign-up-button";
import { createModal } from "./shared/ui/modal/create-modal";
import { ModalService } from "./shared/ui/modal/modal";
import { compose } from "./shared/utils/layout/compose";
import { d } from "./shared/utils/layout/d";
import { l } from "./shared/utils/logger/l";
import "./style.scss";

if (document.URL.includes("auth/success")) {
  await isAuthenticated();
}

initializeInterceptors([UIUpdateInterceptor]);

createPopup();
listenCreateBulletToggle();
listenDeleteButton();
listenSignUpButton();
listenDeleteAllRadarsButton();
listenToDocumentEvents();
listenLogoutButton();
await createModal();

compose()
  .append(createSorterTabs(Object.values(SorterGroupByOptions)))
  .to("sorter")
  .append(createSorterContainer())
  .to("sorter");

export const modalService = ModalService();

let bullets = [];
const savedRadar = localStorage.getItem("radar");
if (savedRadar) {
  bullets = JSON.parse(savedRadar)["bullets"];
}

setState({
  bullets,
});

const openEditFormButton = d.id("openEditFormButton");
openEditFormButton?.addEventListener("click", async (event) => {
  modalService.open({
    class: BulletModal,
    state: {
      name: state.currentBullet?.name || "",
      description: state.currentBullet?.description || "",
    },
    cb: editBulletHandler,
  });
  // openEditFormButton.classList.add("hidden");
});

updateUiAfterAuth();

async function updateUiAfterAuth() {
  l("updateUiAfterAuth");
  const signUpButton = d.id("signUpButton");
  const profileSection = d.id("profileSection");
  if (!signUpButton) return;

  const isLoggedIn = !!currentUser;
  l("isLoggedIn: ", isLoggedIn);
  if (isLoggedIn) {
    signUpButton.style.display = "none";
    if (profileSection) {
      profileSection.style.display = "block";
    }
  } else {
    signUpButton.style.display = "block";
  }
}

function UIUpdateInterceptor(): void {
  console.log("- Updating ui -");
  updateUiAfterAuth();
}

if (await isAuthenticated()) {
  try {
    const radarsResponse = await getRadars();
    const radars = await radarsResponse.json();
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

    updateSorterContainer(SorterGroupByOptions.Sectors, state.currentRadar);
    drawBullets(radars);
  } catch (e) {
    console.error(e);
  }
}

export function refreshUi(): void {
  updateUiAfterAuth();
}
