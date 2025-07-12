import { appendPopup } from "../../components/popup/append-popup";
import { removePopup } from "../../components/popup/remove-popup";
import { state, toggleState } from "../../model/state";
import { saveBullet } from "../../save/save";

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

const getBulletData = (bullet) => {
  return {
    title: bullet.dataset.title,
    description: bullet.dataset.description || "",
  };
};

export function listenBullet(bullet) {
  bullet.addEventListener("mouseenter", (event) => {
    // console.log("🟢 entered");
    bulletHovered = true;
    const { title } = event.target.dataset;
    appendPopup(popup, {
      ...getPopupCoords(event),
      data: { title, description: "" },
    });
  });

  bullet.addEventListener("mouseleave", (event) => {
    // console.log("🔴 left");
    bulletHovered = false;
    removePopup(popup);
  });

  bullet.addEventListener("click", (event) => {
    toggleState({
      currentBulletTitle: getBulletData(event.target).title,
      currentBulletDescription: getBulletData(event.target).description,
    });
  });

  bullet.addEventListener("mousedown", (event) => {
    mouseDownOnBullet = true;
    selectedBullet = event.target;
  });
}

document.addEventListener("mouseup", async (event) => {
  if (bulletHovered) {
    appendPopup(popup, {
      ...getPopupCoords(event),
      data: { title: state.currentBulletTitle },
    });
  }

  if (selectedBullet) {
    await saveBullet(selectedBullet);
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
      setTimeout(() => {
        selectedBullet.setAttribute("cx", svgCoords.x);
        selectedBullet.setAttribute("cy", svgCoords.y);
      }, 50);
    }
  }
});
