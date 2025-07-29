import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { renderGroups } from "../../components/groups/render-groups";
import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { renderRingGroups } from "../../components/ring-groups/render-ring-groups";
import { state, toggleState } from "../../model/state";
import bus from "../bus";
import { getPopup } from "../popup/get-popup";
import { getPopupCoords } from "../popup/get-popup-coords";
import { d } from "../selectors/d";

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
    // updateDomBullet(state.currentBullet);
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
  document.addEventListener("mouseup", async () => {
    clearActiveBullet();
    if (bulletHovered) {
      // appendPopup(getPopup(), getPopupCoords(event), {
      //   title: state.currentBullet["data-title"] || "",
      // });
    }

    if (selectedBulletNode) {
      // updateDomBullet(selectedBulletNode);
      // await saveBullet(nodeToJsonBullet(selectedBulletNode));
      // getRingsInfo();
      selectedBulletNode = null;
    }

    mouseDownOnBulletNode = false;
  });

  document.addEventListener("mousemove", (event) => {
    const svgContainer = document.getElementById(
      `svg-${state.currentBullet.radarId}`
    );
    // if ((event?.target as HTMLElement).closest(".group-item")) {
    //   highlightBulletNode(event.target);
    // }

    if (mouseDownOnBulletNode) {
      removePopup(getPopup());

      if (!event.target || !svgContainer) return;
      const pt = svgContainer?.createSVGPoint(); // створюємо точку
      pt.x = event.clientX;
      pt.y = event.clientY;

      const svgCoords = pt.matrixTransform(
        svgContainer.getScreenCTM().inverse()
      );

      if (selectedBulletNode) {
        // l("selected bullet: ", selectedBulletNode);
        // setTimeout(() => {
        selectedBulletNode.setAttribute("cx", svgCoords.x);
        selectedBulletNode.setAttribute("cy", svgCoords.y);
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
