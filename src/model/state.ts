import { GroupByOptions } from "../components/group-by/group-by-options";
import type { GroupedBullets } from "../components/groups/group-bullets";
import bus from "../helpers/bus";
import type { RingsInfo } from "../helpers/rings/get-rings-info";
import { l } from "../logger/l";
import { saveState } from "../save/save";
import type { BulletRead } from "./bullet-read";
import type { Radar } from "./radar";

export interface GlobalStateModel {
  creatingBulletMode: boolean;
  currentSvgContainer: SVGSVGElement | null;
  currentBullet: BulletRead | null;
  currentBulletNode: Element | null;
  bullets: BulletRead[];
  groups: GroupedBullets;
  ringsInfo: RingsInfo;
  groupBy: GroupByOptions | null;
  currentRadar: Radar | null;
  radars: Radar[];
}

const stateElements = {
  creatingBulletMode: "creatingBulletLabel",
};

export let state: GlobalStateModel = {
  creatingBulletMode: false,
  currentSvgContainer: null,
  currentBullet: null,
  currentBulletNode: null,
  currentRadar: null,
  radars: [],
  bullets: [],
  groups: {},
  ringsInfo: {},
  groupBy: null,
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

  saveState();

  l("- State -");
  l(state);
};

const setSavedState = () => {
  let defaultState = { ...state };
  let _state = null;
  const radarItem = localStorage.getItem("radar");
  if (radarItem) {
    _state = JSON.parse(radarItem);
  } else {
    _state = defaultState;
  }
  // l("_state:", _state);
  toggleState(_state);
};

// setSavedState();
