export interface PopupCoords {
  top: number;
  left: number;
  offset: {
    x: number;
    y: number;
  };
}

export const getPopupCoords = (event: MouseEvent): PopupCoords | null => {
  if (!event || !event.target) return null;

  const rect = (event.target as HTMLElement).getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    offset: {
      x: rect.width,
      y: rect.height,
    },
  };
};
