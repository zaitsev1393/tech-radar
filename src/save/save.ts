import { groupBullets } from "../components/groups/group-bullets";
import { sectorsInfo } from "../model/sectors";
import { state, toggleState } from "../model/state";

const ls = localStorage;

export const saveBullets = () => {
  // const bullets = document.querySelectorAll(".bullet");
  // l(bullets);
};

export const saveState = () => {
  // l("saving state: ", state);
  localStorage.setItem("radar", JSON.stringify(state));
};

export const saveBullet = (jsonBullet) => {
  return new Promise((resolve) => {
    // l(jsonBullet);
    if (!ls.getItem("radar")) {
      ls.setItem("radar", JSON.stringify({ bullets: [] }));
    }

    const radar = JSON.parse(ls.getItem("radar") || "");
    let savedBullets = [];
    if (radar) {
      savedBullets = radar.bullets;
      const existingBulletIdx = radar.bullets.findIndex(
        (b) => b["data-id"] === jsonBullet["data-id"]
      );
      if (existingBulletIdx > -1) {
        savedBullets.splice(existingBulletIdx, 1, jsonBullet);
      } else {
        savedBullets = [...savedBullets, jsonBullet];
      }

      radar.bullets = savedBullets;
      localStorage.setItem("radar", JSON.stringify(radar));
    }

    toggleState({ bullets: savedBullets });
    groupBullets(sectorsInfo, state.bullets);
    // l("saved radar: ", ls.getItem("radar"));
    resolve();
  });
};
