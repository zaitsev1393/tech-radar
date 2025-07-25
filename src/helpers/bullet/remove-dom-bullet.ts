import type { Bullet } from "../../model/bullet";
import { d } from "../selectors/d";

export const removeDomBullet = (bullet: Bullet): void => {
  const bulletNode = d.query(`[data-id='${bullet["data-id"]}']`);
  if (bulletNode) {
    bulletNode.remove();
  }
};
