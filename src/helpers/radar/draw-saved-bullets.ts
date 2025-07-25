import { state } from "../../model/state";
import { getBullet } from "../bullet/get-bullet";
import { listenBullet } from "../bullet/listen-bullet";

export const drawSavedBullets = (containerId: string = "radar") => {
  const savedRadarInfo = localStorage.getItem("radar");
  const svgContainer = state.svgContainer;
  if (savedRadarInfo) {
    const bullets = JSON.parse(savedRadarInfo).bullets;
    bullets.forEach((existingBullet) => {
      const bullet = getBullet(null, svgContainer, existingBullet);
      svgContainer.appendChild(bullet);
      listenBullet(bullet);
    });
  }
};
