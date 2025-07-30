import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { renderGroups } from "../../components/groups/render-groups";
import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { renderRingGroups } from "../../components/ring-groups/render-ring-groups";
import { l } from "../../logger/l";
import { state, toggleState } from "../../model/state";
import { patchBullet } from "../../services/bullets.service";
import bus from "../bus";
import { getPopup } from "../popup/get-popup";
import { getPopupCoords } from "../popup/get-popup-coords";
import { d } from "../selectors/d";
import { getSVGCoords } from "./get-bullet";

let mouseDownOnBulletNode = false;
let bulletHovered = false;
let selectedBulletNode: Element | null = null;

export function listenBullet(bullet: Element) {
  const bulletNode = bullet as HTMLElement;

  bulletNode.addEventListener("mouseenter", (event: MouseEvent) => {
    // console.log("🟢 entered");
    const target = event.target as HTMLElement;
    if (!target) return;

    const title = target.getAttribute("name");
    const description = target.getAttribute("description") || "";

    bulletHovered = true;

    if (title) {
      const coords = getPopupCoords(event);
      appendPopup(getPopup(), coords, {
        title,
        description,
      });
    }
  });

  bulletNode.addEventListener("mouseleave", () => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup(getPopup());
  });

  bulletNode.addEventListener("click", () => {
    bullet.classList.add("bullet-active");
    BulletOverview().open(state.currentBullet);
  });

  bulletNode.addEventListener("mousedown", (event: MouseEvent) => {
    // const target = event.target as HTMLElement;
    const currentBulletNode = bulletNode;
    const currentBullet = state.bullets.find(
      ({ id }) => Number(bulletNode.getAttribute("id")) === id
    );
    selectedBulletNode = currentBulletNode;
    toggleState({
      currentBulletNode,
      currentBullet,
    });
    clearActiveBullet();
    mouseDownOnBulletNode = true;
  });
}

export const listenToDocumentEvents = () => {
  document.addEventListener("mouseup", async (event) => {
    clearActiveBullet();
    if (bulletHovered) {
      // appendPopup(getPopup(), getPopupCoords(event), {
      //   title: state.currentBullet["data-title"] || "",
      // });
    }

    if (selectedBulletNode) {
      selectedBulletNode = null;
      // updateDomBullet(selectedBulletNode);
      // await saveBullet(nodeToJsonBullet(selectedBulletNode));
      // getRingsInfo();
      const svgContainer = document.getElementById(
        `svg-${state.currentBullet.radarId}`
      );
      const coords = getSVGCoords(event, svgContainer);
      const { name, description, id, radarId } = state.currentBullet;
      const newBullet = await patchBullet({
        radarId,
        bulletId: id,
        body: {
          name,
          description,
          cx: coords?.x,
          cy: coords?.y,
        },
      });
      l("newbullet: ", newBullet);
    }

    mouseDownOnBulletNode = false;
  });

  document.addEventListener("mousemove", (event) => {
    if (!state.currentBullet) return;
    const svgContainer = document.getElementById(
      `svg-${state.currentBullet.radarId}`
    );
    // if ((event?.target as HTMLElement).closest(".group-item")) {
    //   highlightBulletNode(event.target);
    // }

    if (mouseDownOnBulletNode) {
      removePopup(getPopup());

      const svgCoords = getSVGCoords(event, svgContainer);

      if (!svgCoords) return;
      if (selectedBulletNode) {
        // l("selected bullet: ", selectedBulletNode);
        // setTimeout(() => {
        selectedBulletNode.setAttribute("cx", svgCoords.x.toString());
        selectedBulletNode.setAttribute("cy", svgCoords.y.toString());
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

function clearActiveBullet(): void {
  const activeBullet = d.query(".bullet-active");
  if (activeBullet) {
    activeBullet.classList.remove("bullet-active");
  }
}
