import type { Radar } from "@/model/radar";
import { d } from "@/shared/utils/layout/d";
import { getElements } from "@/shared/utils/layout/get-elements";

export function showRadar(radar: Radar): void {
  hideRadars();
  const svgRadarContainer = d.id(`svg-${radar.id}`);
  if (svgRadarContainer) {
    svgRadarContainer.style.display = "block";
  }
}

function hideRadars(): void {
  getElements<SVGSVGElement>("[radar]").forEach(
    (radarNode: SVGSVGElement) => (radarNode.style.display = "none")
  );
}
