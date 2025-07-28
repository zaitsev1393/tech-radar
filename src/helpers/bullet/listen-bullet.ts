import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { renderGroups } from "../../components/groups/render-groups";
import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { renderRingGroups } from "../../components/ring-groups/render-ring-groups";
import { state } from "../../model/state";
import bus from "../bus";
import { getPopup } from "../popup/get-popup";
import { getPopupCoords } from "../popup/get-popup-coords";
import { getRingsInfo } from "../rings/get-rings-info";
import { d } from "../selectors/d";
import { getBulletNode } from "./get-bullet-node";
import { updateDomBullet } from "./update-dom-bullet";

let mouseDownOnBullet = false;
let bulletHovered = false;
let selectedBullet: SVGElement | null = null;

export function listenBullet(bullet: Element) {
  (bullet as HTMLElement).addEventListener(
    "mouseenter",
    (event: MouseEvent) => {
      // console.log("🟢 entered");
      bulletHovered = true;
      const coords = getPopupCoords(event);
      appendPopup(getPopup(), coords, {
        title: "title",
        description: "desc",
      });
    }
  );

  bullet.addEventListener("mouseleave", (event) => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup(getPopup());
  });

  bullet.addEventListener("click", (event) => {
    const bulletNode = getBulletNode(state.currentBullet);
    bulletNode?.classList.add("bullet-active");
    BulletOverview().open(state.currentBullet);
    updateDomBullet(state.currentBullet);
  });

  bullet.addEventListener("mousedown", (event) => {
    const activeBullet = d.query(".bullet-active");
    if (activeBullet) {
      activeBullet.classList.remove("bullet-active");
    }
    mouseDownOnBullet = true;
    selectedBullet = event.target;
  });
}

export const listenToDocumentEvents = () => {
  document.addEventListener("mouseup", async (event) => {
    if (bulletHovered) {
      appendPopup(getPopup(), getPopupCoords(event), {
        title: state.currentBullet["data-title"] || "",
      });
    }

    if (selectedBullet) {
      updateDomBullet(selectedBullet);
      // await saveBullet(nodeToJsonBullet(selectedBullet));
      getRingsInfo();
      selectedBullet = null;
      console.log("to save");
    }

    mouseDownOnBullet = false;
  });

  document.addEventListener("mousemove", (event) => {
    const svgContainer = document.getElementById("svg");
    // if ((event?.target as HTMLElement).closest(".group-item")) {
    //   highlightBulletNode(event.target);
    // }

    if (mouseDownOnBullet) {
      removePopup(getPopup());

      if (!event.target || !svgContainer) return;
      const pt = svgContainer?.createSVGPoint(); // створюємо точку
      pt.x = event.clientX;
      pt.y = event.clientY;

      const svgCoords = pt.matrixTransform(
        svgContainer.getScreenCTM().inverse()
      );

      if (selectedBullet) {
        // l("selected bullet: ", selectedBullet);
        // setTimeout(() => {
        selectedBullet.setAttribute("cx", svgCoords.x);
        selectedBullet.setAttribute("cy", svgCoords.y);
        // }, 50);
      }
    }
  });
};

const listenBulletSub = bus.subscribe((event) => {
  if (event.name === "STATE_CHANGED") {
    renderGroups(event.payload);
    renderRingGroups();
  }
});
