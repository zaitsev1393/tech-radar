import { GroupByOptions } from "../components/group-by/group-by-options";
import type { GroupedBullets } from "../components/groups/group-bullets";
import bus from "../helpers/bus";
import type { RingsInfo } from "../helpers/rings/get-rings-info";
import { deepEqual } from "../shared/utils/helpers/deep-equal";
import { l } from "../shared/utils/logger/l";
import type { BulletRead } from "./bullet-read";
import type { Radar } from "./radar";

export interface GlobalStateModel {
  creatingBulletMode: boolean;
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
  currentBullet: null,
  currentBulletNode: null,
  currentRadar: null,
  radars: [],
  bullets: [],
  groups: {},
  ringsInfo: {},
  groupBy: GroupByOptions.Sectors,
};

(window as any).state = state;

export const setState = (newState: Partial<GlobalStateModel>) => {
  state = {
    ...state,
    ...newState,
  };

  if (deepEqual(state, newState)) {
    return;
  }

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
