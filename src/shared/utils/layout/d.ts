export const d = {
  id: (selector: string) => {
    const el = document.getElementById(selector);
    if (el instanceof SVGSVGElement) {
      return el as SVGSVGElement;
    }
    return el as HTMLElement | null;
  },
  all: (selector: string) => document.querySelectorAll(selector),
  attr: (name: string) => document.querySelector(`[${name}]`),
  query: <T extends Element>(selector: string) =>
    document.querySelector<T>(selector),
};
