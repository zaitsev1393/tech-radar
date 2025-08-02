export const getElements = <T extends Element>(selector: string): any =>
  document.querySelectorAll<T>(selector) || [];
