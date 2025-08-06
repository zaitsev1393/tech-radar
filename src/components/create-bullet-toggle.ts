import { setState } from "../model/state";
import { l } from "../shared/utils/logger/l";

export const listenCreateBulletToggle = (): void => {
  const createBulletToggle = document.getElementById("createBulletToggle");
  if (!createBulletToggle) return;

  createBulletToggle.addEventListener("click", () => {
    l("- Create bullet mode switched ON - ");
    setState({ creatingBulletMode: true });
  });
};
