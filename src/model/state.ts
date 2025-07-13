import { l } from "../logger/l";
import type { Bullet } from "./bullet";

interface GlobalStateModel {
  creatingBulletMode: boolean;
  currentBulletTitle: string;
  currentBulletDescription: string;
  svgContainer: SVGSVGElement | null;
  currentBullet: Bullet | null;
  bullets: Bullet[];
}

const stateElements = {
  creatingBulletMode: "creatingBulletLabel",
  // currentBulletTitle: "tech-overview-title",
  // currentBulletDescription: "tech-overview-description",
};

export let state: GlobalStateModel = {
  creatingBulletMode: false,
  currentBulletTitle: "",
  currentBulletDescription: "",
  svgContainer: null,
  currentBullet: null,
  bullets: [],
};

export const toggleState = (newState) => {
  state = {
    ...state,
    ...newState,
  };
  for (const key in state) {
    const el = document.getElementById(stateElements[key]);
    if (el) {
      el.innerText = state[key];
    }
  }
  l("- State -");
  l(state);
};
