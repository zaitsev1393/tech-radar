import { BulletOverview } from "@/features/bullet-overview/bullet-overview";
import type { BulletRead } from "@/model/bullet-read";
import { highlightBullet } from "../utils/highlight-bullet";

export const activateBullet = (bullet: BulletRead): void => {
  BulletOverview().open(bullet);
  highlightBullet(bullet);
};
