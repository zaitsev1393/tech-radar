const stateElements = {
  creatingBulletMode: "creatingBulletLabel",
  currentBulletTitle: "tech-overview-title",
  currentBulletDescription: "tech-overview-description",
};

export let state = {
  creatingBulletMode: false,
  currentBulletTitle: "",
  currentBulletDescription: "",
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
