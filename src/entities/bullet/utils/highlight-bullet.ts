import type { BulletRead } from "@/model/bullet-read";
import { clearActiveBullet } from "./clear-active-bullet";
import { getBulletNode } from "./get-bullet-node";

export const highlightBullet = (bullet: BulletRead): void => {
  clearActiveBullet();
  const currentBullet = getBulletNode(bullet);

  if (currentBullet) {
    currentBullet.classList.add("active-bullet");
  }
};
