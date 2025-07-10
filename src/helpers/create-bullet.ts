import { createCircle } from "./create-circle";
import { listenBullet } from "./listen-bullet";

export const createBullet = (args) => {
  const bullet = createCircle(args);
  listenBullet(bullet);
};
