interface ComposeOptions {
  append: (el: HTMLElement) => ComposeOptions;
  to: (id: string) => ComposeOptions;
}

export const compose = (): ComposeOptions => {
  let currentEl: HTMLElement | null;
  const options = {
    append: (el: HTMLElement) => {
      currentEl = el;
      return options;
    },
    to: (id: string) => {
      const targetEl = document.getElementById(id);
      if (targetEl && currentEl) {
        targetEl.appendChild(currentEl);
      }
      currentEl = null;
      return options;
    },
  };

  return options;
};
