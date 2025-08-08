export function getSVGCoords(
  event: MouseEvent,
  svg: SVGSVGElement
): DOMPoint | null {
  if (!event) return null;

  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;

  return pt.matrixTransform(svg.getScreenCTM()?.inverse());
}
