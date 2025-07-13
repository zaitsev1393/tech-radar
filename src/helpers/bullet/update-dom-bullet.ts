import type { Bullet } from "../../model/bullet";
import { state } from "../../model/state";

export const getBulletNode = (bullet: Bullet) => {
  const query = `[data-id='${bullet["data-id"]}']`;
  return state.svgContainer.querySelector(query);
};

export const updateDomBullet = (bullet: Bullet) => {
  const bulletNode = getBulletNode(bullet);

  if (bulletNode) {
    bulletNode.setAttribute("data-title", bullet["data-title"]);
    bulletNode.setAttribute("data-description", bullet["data-description"]);
  }
};
