import { l } from "../../logger/l";
import type { Bullet } from "../../model/bullet";
import { d } from "../selectors/d";

export const removeDomBullet = (bullet: Bullet): void => {
  const bulletNode = d.query(`[data-id='${bullet["data-id"]}']`);
  l("bullet to delet: ", bulletNode);
  if (bulletNode) {
    bulletNode.remove();
  }
};
