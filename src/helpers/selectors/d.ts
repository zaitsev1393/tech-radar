export const d = {
  id: (selector) => document.getElementById(selector),
  all: (selector) => document.querySelectorAll(selector),
  attr: (name) => document.querySelector(`[${name}]`),
  query: (selector) => document.querySelector(selector),
};
