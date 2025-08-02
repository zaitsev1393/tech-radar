export const d = {
  id: (selector: string) => document.getElementById(selector),
  all: (selector: string) => document.querySelectorAll(selector),
  attr: (name: string) => document.querySelector(`[${name}]`),
  query: <T extends Element>(selector: string) =>
    document.querySelector<T>(selector),
};
