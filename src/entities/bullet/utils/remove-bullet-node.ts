import { state } from "../../../model/state";

export const removeBulletNode = (): void => {
  const bullet = state.currentBulletNode;
  bullet?.remove();
};
