import type { Radar } from "../../model/radar";
import { createBulletNode } from "./create-bullet";

export function drawBullets(radars: Radar[]): void {
  radars.forEach(({ id, bullets }: Radar) => {
    if (!bullets) return;
    const svgContainer = document.querySelector(`[radar='${id}']`);
    bullets.forEach((bullet) => {
      const bulletNode = createBulletNode(bullet);
      svgContainer?.appendChild(bulletNode);
    });
  });
}
