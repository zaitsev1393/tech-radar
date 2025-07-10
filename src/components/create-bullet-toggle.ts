import { l } from "../logger/l";
import { toggleState } from "../model/state";

export const listenCreateBulletToggle = () => {
  const createBulletToggle = document.getElementById("createBulletToggle");
  createBulletToggle.addEventListener("click", (event) => {
    l("Create bullet toggle clicked");
    toggleState({ creatingBulletMode: true });
  });
};
