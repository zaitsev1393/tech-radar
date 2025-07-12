import { RADAR_HEIGHT, RADAR_WIDTH } from "../../config/radar.config";

export const getRadarNode = ({
  id = "radar",
  width = RADAR_WIDTH,
  height = RADAR_HEIGHT,
} = {}) => {
  const radarContainer = document.getElementById(id);

  if (!radarContainer) throw new Error("Radar container not found");

  radarContainer.style.maxWidth = `${width}px`;
  radarContainer.style.maxHeight = `${height}px`;
  return radarContainer;
};
