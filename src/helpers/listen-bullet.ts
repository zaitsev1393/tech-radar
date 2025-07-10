import { appendPopup } from "../components/popup/append-popup";
import { removePopup } from "../components/popup/remove-popup";
import { l } from "../logger/l";

let mouseDownOnBullet = false;
let bulletHovered = false;
let selectedBullet = null;

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

const getBulletData = (bullet) => {
  return {
    title: bullet.dataset.name,
    description: bullet.dataset.description || "",
  };
};

export function listenBullet(bullet, popup?) {
  popup = popup || document.getElementById("radar-popup");
  const svgContainer = document.getElementById("svg");
  bullet.addEventListener("mouseenter", (event) => {
    // console.log("🟢 entered");
    bulletHovered = true;
    const rect = event.target.getBoundingClientRect();
    const { name } = event.target.dataset;
    appendPopup(popup, {
      ...getPopupCoords(event),
      data: { title: name, description: "" },
    });
  });

  bullet.addEventListener("mouseleave", (event) => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup(popup);
  });

  bullet.addEventListener("click", (event) => {
    l("bullet clicked: ", event);
  });

  bullet.addEventListener("mousedown", (event) => {
    mouseDownOnBullet = true;
    selectedBullet = event.target;
  });

  document.addEventListener("mouseup", (event) => {
    l("mouse up on document");
    if (bulletHovered) {
      appendPopup(popup, {
        ...getPopupCoords(event),
        data: { title: getBulletData(selectedBullet).title },
      });
    }
    mouseDownOnBullet = false;
  });

  document.addEventListener("mousemove", (event) => {
    if (mouseDownOnBullet) {
      removePopup(popup);

      if (!event.target || !svgContainer) return;
      const pt = svgContainer?.createSVGPoint(); // створюємо точку
      pt.x = event.clientX;
      pt.y = event.clientY;

      const svgCoords = pt.matrixTransform(
        svgContainer.getScreenCTM().inverse()
      );

      if (selectedBullet) {
        setTimeout(() => {
          selectedBullet.setAttribute("cx", svgCoords.x);
          selectedBullet.setAttribute("cy", svgCoords.y);
        }, 50);
      }
    }
  });
}
