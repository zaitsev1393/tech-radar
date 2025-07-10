const stateElements = {
  creatingBulletMode: "creatingBulletLabel",
};

export let state = {
  creatingBulletMode: false,
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
};
