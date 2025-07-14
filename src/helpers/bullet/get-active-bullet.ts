import { d } from "../selectors/d";

export const getActiveBullet = () => {
  return d.query(".bullet-active");
};
