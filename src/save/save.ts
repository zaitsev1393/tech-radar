import { l } from "../logger/l";
import { toggleState } from "../model/state";

const ls = localStorage;

export const saveBullets = () => {
  // const bullets = document.querySelectorAll(".bullet");
  // l(bullets);
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
      // l(
      // "radar.bullets:",
      // radar.bullets.map((data) => data["data-id"])
      // );
      l("jsonbullet: ", jsonBullet["data-id"]);
      const existingBulletIdx = radar.bullets.findIndex(
        (b) => b["data-id"] === jsonBullet["data-id"]
      );
      l(existingBulletIdx);
      if (existingBulletIdx > -1) {
        savedBullets.splice(existingBulletIdx, 1, jsonBullet);
      } else {
        savedBullets = [...savedBullets, jsonBullet];
      }

      radar.bullets = savedBullets;
      localStorage.setItem("radar", JSON.stringify(radar));
    }

    toggleState({ bullets: savedBullets });

    // l("saved radar: ", ls.getItem("radar"));
    resolve();
  });
};
