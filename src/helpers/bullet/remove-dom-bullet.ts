import { state } from "../../model/state";

export const removeDomBullet = (): void => {
  const bullet = state.currentBulletNode;
  bullet?.remove();
};
