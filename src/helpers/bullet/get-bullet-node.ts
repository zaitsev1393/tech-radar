import type { BulletRead } from "../../model/bullet-read";
import { d } from "../selectors/d";

export const getBulletNode = (bullet: BulletRead): HTMLElement | null => {
  const query = `[id='${bullet.id}']`;
  return d.query(query);
};
