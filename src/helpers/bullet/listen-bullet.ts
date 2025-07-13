import { BulletOverview } from "../../components/bullet-overview/bullet-overview";
import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { state } from "../../model/state";
import { saveBullet } from "../../save/save";
import { nodeToJsonBullet } from "../mappers/node-to-jsonbullet";
import { d } from "../selectors/d";
import { getBulletNode, updateDomBullet } from "./update-dom-bullet";

let mouseDownOnBullet = false;
let bulletHovered = false;
let selectedBullet = null;

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

export function listenBullet(bullet) {
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
    selectedBullet = null;
  }

  mouseDownOnBullet = false;
});

document.addEventListener("mousemove", (event) => {
  const svgContainer = document.getElementById("svg");
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
