import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { renderGroups } from "../../components/groups/render-groups";
import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { renderRingGroups } from "../../components/ring-groups/render-ring-groups";
import { state } from "../../model/state";
import { saveBullet } from "../../save/save";
import bus from "../bus";
import { nodeToJsonBullet } from "../mappers/node-to-jsonbullet";
import { getRingsInfo } from "../rings/get-rings-info";
import { d } from "../selectors/d";
import { getBulletNode } from "./get-bullet-node";
import { updateDomBullet } from "./update-dom-bullet";

let mouseDownOnBullet = false;
let bulletHovered = false;
let selectedBullet: SVGElement | null = null;

const popup = document.getElementById("radar-popup");

const getPopupCoords = (event) => {
  const rect = event.target.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    offset: {
      x: rect.width,
      y: rect.height,
    },
  };
};

export function listenBullet(bullet: SVGElement) {
  bullet.addEventListener("mouseenter", (event) => {
    // console.log("🟢 entered");

    state.currentBullet = state.bullets.find(
      (b) => b["data-id"] === bullet.dataset.id
    );
    bulletHovered = true;
    appendPopup(popup, {
      ...getPopupCoords(event),
      data: {
        title: state.currentBullet["data-title"],
        description: state.currentBullet["data-description"],
      },
    });
  });

  bullet.addEventListener("mouseleave", (event) => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup(popup);
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

document.addEventListener("mouseup", async (event) => {
  if (bulletHovered) {
    appendPopup(popup, {
      ...getPopupCoords(event),
      data: { title: state.currentBullet["data-title"] },
    });
  }

  if (selectedBullet) {
    updateDomBullet(selectedBullet);
    await saveBullet(nodeToJsonBullet(selectedBullet));
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
    removePopup(popup);

    if (!event.target || !svgContainer) return;
    const pt = svgContainer?.createSVGPoint(); // створюємо точку
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgCoords = pt.matrixTransform(svgContainer.getScreenCTM().inverse());

    if (selectedBullet) {
      // l("selected bullet: ", selectedBullet);
      // setTimeout(() => {
      selectedBullet.setAttribute("cx", svgCoords.x);
      selectedBullet.setAttribute("cy", svgCoords.y);
      // }, 50);
    }
  }
});

const listenBulletSub = bus.subscribe((event) => {
  if (event.name === "STATE_CHANGED") {
    renderGroups(event.payload);
    renderRingGroups();
  }
});
