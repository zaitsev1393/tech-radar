export const isBulletInRing = (
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number
): boolean => {
  const dx = pointX - centerX;
  const dy = pointY - centerY;
  const distanceSquared = dx * dx + dy * dy;

  return (
    distanceSquared >= innerRadius * innerRadius &&
    distanceSquared <= outerRadius * outerRadius
  );
};
