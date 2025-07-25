import type { Bullet } from "../../model/bullet";
import { state } from "../../model/state";

export const getBulletNode = (bullet: Bullet) => {
  const query = `[data-id='${bullet["data-id"]}']`;
  return state.svgContainer.querySelector(query);
};
