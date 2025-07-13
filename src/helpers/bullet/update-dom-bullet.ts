import { l } from "../../logger/l";
import type { Bullet } from "../../model/bullet";
import { state } from "../../model/state";

export const updateDomBullet = (bullet: Bullet) => {
  const query = `[data-id='${bullet["data-id"]}']`;
  const currentDomBulletNode = state.svgContainer.querySelector(query);
  if (currentDomBulletNode) {
    l("updateDomBullet bullet:", bullet);
    currentDomBulletNode.setAttribute("data-title", bullet["data-title"]);
    currentDomBulletNode.setAttribute(
      "data-description",
      bullet["data-description"]
    );
  }
};
