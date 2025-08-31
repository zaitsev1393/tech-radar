import { createPopup } from "@/shared/ui/popup/create-popup";
import { auth, currentUser, isAuthenticated } from "./data-access/auth.service";
import { initializeInterceptors } from "./data-access/interceptors/main-interceptor";
import { getRadars } from "./data-access/radars.service";
import { listenToDocumentEvents } from "./entities/bullet/lib/listen-bullet";
import { drawBullets } from "./entities/bullet/ui/draw-bullets";
import { DEFAULT_RADAR_CONFIG } from "./entities/radar/model/radar.config";
import { createRadar } from "./entities/radar/ui/create-radar";
import { getRadarsContainer } from "./entities/radar/utils/get-radar-node";
import { listenDeleteButton } from "./features/bullet-overview/delete-bullet-button/listen-delete-button";
import { listenEditBulletButton } from "./features/bullet-overview/edit-button/edit-button";
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

initializeInterceptors();

createPopup();
listenCreateBulletToggle();
listenDeleteButton();
listenSignUpButton();
listenDeleteAllRadarsButton();
listenToDocumentEvents();
listenLogoutButton();
listenEditBulletButton();
await createModal();

compose()
  .append(createSorterTabs(Object.values(SorterGroupByOptions)))
  .to("sorter")
  .append(createSorterContainer())
  .to("sorter");

export const modalService = ModalService();

if (await auth()) {
  l("- Authenticated as: ", currentUser?.email);
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
} else {
  l("- Failed authenticating -");
}

updateUiAfterAuth();

async function updateUiAfterAuth() {
  const signUpButton = d.id("signUpButton");
  const profileSection = d.id("profileSection");
  if (!signUpButton) return;

  const isLoggedIn = !!currentUser;
  if (isLoggedIn) {
    signUpButton.style.display = "none";
    if (profileSection) {
      profileSection.style.display = "block";
    }
  } else {
    signUpButton.style.display = "block";
  }
}

export function refreshUi(): void {
  updateUiAfterAuth();
}
