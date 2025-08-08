import { removePopup } from "@/shared/ui/popup/remove-popup";
import { showPopup } from "@/shared/ui/popup/show-popup";
import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { groupBullets } from "../../components/groups/group-bullets";
import { renderGroups } from "../../components/groups/render-groups";
import { renderRingGroups } from "../../components/ring-groups/render-ring-groups";
import { patchBullet } from "../../data-access/bullets.service";
import { sectorsInfo } from "../../model/sectors";
import { setState, state, type GlobalStateModel } from "../../model/state";
import { l } from "../../shared/utils/logger/l";
import bus from "../bus";
import { getRingsInfo } from "../rings/get-rings-info";
import { d } from "../selectors/d";
import { getSVGCoords } from "./get-bullet";
import { getBulletNode } from "./get-bullet-node";

interface BulletNodePosition {
  cx: number | null;
  cy: number | null;
}

let mouseDownOnBulletNode = false;
let bulletHovered = false;
let selectedBulletNode: Element | null = null;
let bulletStartPosition: BulletNodePosition = {
  cx: null,
  cy: null,
};

export function listenBullet(bullet: Element) {
  const bulletNode = bullet as HTMLElement;

  bulletNode.addEventListener("mouseenter", (event: MouseEvent) => {
    // console.log("🟢 entered");
    const target = event.target as HTMLElement;
    if (!target) return;

    const title = target.getAttribute("name");
    bulletHovered = true;

    if (title) {
      showPopup({ title }, event);
    }
  });

  bulletNode.addEventListener("mouseleave", () => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup();
  });

  bulletNode.addEventListener("click", () => {
    bullet.classList.add("bullet-active");
    BulletOverview().open(state.currentBullet);
  });

  bulletNode.addEventListener("mousedown", (event: MouseEvent) => {
    // const target = event.target as HTMLElement;
    const currentBulletNode = bulletNode;
    bulletStartPosition = getBulletNodePosition(bulletNode);
    const currentBullet = state.bullets.find(
      ({ id }) => Number(bulletNode.getAttribute("id")) === id
    );
    selectedBulletNode = currentBulletNode;
    setState({
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
    mouseDownOnBulletNode = false;
    if (bulletHovered) {
      showPopup({ title: state.currentBullet.name }, event);
    }

    if (selectedBulletNode) {
      l("document.addEventListener('mouseup') if selectedBulletNode");
      const { cx, cy } = getBulletNodePosition(selectedBulletNode);
      selectedBulletNode = null;

      const { cx: startCx, cy: startCy } = bulletStartPosition;
      if (cx === startCx && cy === startCy) {
        bulletStartPosition = { cx: 0, cy: 0 };
        return;
      }

      // updateDomBullet(selectedBulletNode);
      const svgContainer = document.getElementById(
        `svg-${state.currentBullet?.radarId}`
      );

      if (!svgContainer) return;
      const coords = getSVGCoords(event, svgContainer);
      const currentBullet = state.currentBullet;
      const radarId = currentBullet?.radarId?.toString();
      const bulletId = currentBullet?.id?.toString();

      if (!radarId || !bulletId || !coords?.x || !coords.y) return;

      const newBullet = await patchBullet({
        radarId,
        bulletId,
        body: {
          name: currentBullet?.name || "",
          description: currentBullet?.description,
          cx: coords?.x,
          cy: coords?.y,
        },
      });
      groupBullets(sectorsInfo, state.bullets);
      getRingsInfo(state);
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (!state.currentBullet) return;
    const svgContainer = document.getElementById(
      `svg-${state.currentBullet.radarId}`
    );

    if (mouseDownOnBulletNode) {
      removePopup();
      const svgCoords = getSVGCoords(event, svgContainer);

      if (!svgCoords) return;
      if (selectedBulletNode) {
        selectedBulletNode.setAttribute("cx", svgCoords.x.toString());
        selectedBulletNode.setAttribute("cy", svgCoords.y.toString());
      }
    }
  });
};

const listenBulletSub = bus.subscribe((event) => {
  if (event.name === "STATE_CHANGED") {
    const { payload: state } = event;
    renderGroups(state);
    renderRingGroups(state);
    updateCurrentBulletNode(state);
  }
});

function updateCurrentBulletNode(state: GlobalStateModel): void {
  const bullet = state.currentBullet;
  if (!bullet) return;
  const bulletNode = getBulletNode(bullet);
  if (!bulletNode) return;

  bulletNode?.setAttribute("name", bullet.name);
  bulletNode?.setAttribute("description", bullet?.description || "");
}

function clearActiveBullet(): void {
  const activeBullet = d.query(".bullet-active");
  if (activeBullet) {
    activeBullet.classList.remove("bullet-active");
  }
}

function getBulletNodePosition(bulletNode: Element): BulletNodePosition {
  const defaultPosition = { cx: 0, cy: 0 };
  const cx = Number(bulletNode.getAttribute("cx"));
  const cy = Number(bulletNode.getAttribute("cy"));
  if (isNaN(cx) || isNaN(cy)) {
    return defaultPosition;
  }

  return { cx, cy };
}
