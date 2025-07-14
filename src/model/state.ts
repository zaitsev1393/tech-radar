import type { GroupedBullets } from "../components/groups/group-bullets";
import bus from "../helpers/bus";
import type { RingsInfo } from "../helpers/rings/get-rings-info";
import { l } from "../logger/l";
import type { Bullet } from "./bullet";

interface GlobalStateModel {
  creatingBulletMode: boolean;
  svgContainer: SVGSVGElement | null;
  currentBullet: Bullet | null;
  bullets: Bullet[];
  groups: GroupedBullets;
  ringsInfo: RingsInfo;
}

const stateElements = {
  creatingBulletMode: "creatingBulletLabel",
};

export let state: GlobalStateModel = {
  creatingBulletMode: false,
  svgContainer: null,
  currentBullet: null,
  bullets: [],
  groups: {},
  ringsInfo: {},
};

(window as any).state = state;

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

  bus.notify({
    name: "STATE_CHANGED",
    payload: state,
  });

  l("- State -");
  l(state);
};
