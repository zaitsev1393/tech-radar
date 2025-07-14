import type { Bullet } from "../../model/bullet";
import { state } from "../../model/state";

export const getBulletById = (id: string): Bullet | undefined => {
  return state.bullets.find((bullet) => bullet["data-id"] === id);
};
