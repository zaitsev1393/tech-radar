import { createSectorLabels } from "@/entities/radar/ui/radar/elements/create-sectors-labels";
import { createNewBullet } from "../../../data-access/bullets.service";
import { createBulletNode } from "../../../helpers/bullet/create-bullet";
import { getSVGCoords } from "../../../helpers/bullet/get-bullet";
import { listenBullet } from "../../../helpers/bullet/listen-bullet";
import { createSVGContainer } from "../../../helpers/primitives/create-svg-container";
import type { BulletRead } from "../../../model/bullet-read";
import type { Radar } from "../../../model/radar";
import { sectorsInfo } from "../../../model/sectors";
import { setState, state } from "../../../model/state";
import {
  DEFAULT_RADAR_CONFIG,
  DEFAULT_SVG_CONTAINER_CONFIG,
} from "../model/radar.config";
import { drawRadar } from "./radar/draw-radar";
import { createRingLabels } from "./radar/elements/create-ring-labels";

export function createRadar(anchorElement: HTMLElement, radar: Radar): void {
  const svgContainer: Element | null = createSVGContainer({
    ...DEFAULT_SVG_CONTAINER_CONFIG,
    id: radar.id,
  });

  if (!svgContainer) return;

  anchorElement.appendChild(svgContainer);

  drawRadar({
    title: radar.title,
    cx: DEFAULT_RADAR_CONFIG.width / 2,
    cy: DEFAULT_RADAR_CONFIG.height / 2,
    r: DEFAULT_RADAR_CONFIG.width / 2,
    circlesNum: 4,
    stroke: "white",
    fill: "none",
    el: svgContainer,
  });

  // createTextLabel({
  //   root: svgContainer,
  //   x: 0,
  //   y: 50,
  //   text: radar.title,
  //   config: { "font-size": 16, color: "white" },
  // });

  createSectorLabels(sectorsInfo, svgContainer);
  createRingLabels(radar.id);

  (svgContainer as HTMLElement).addEventListener(
    "click",
    async (event: MouseEvent) => {
      let radarId = null;
      if (event.target) {
        radarId = (event.target as HTMLElement)
          .closest("svg")
          ?.getAttribute("radar");
      }
      if (!radarId) return;

      console.log("- Radar clicked ID: ", radarId);
      if (state.creatingBulletMode) {
        const { x: cx, y: cy } = getSVGCoords(event, svgContainer);
        const bullet: BulletRead = {
          id: 0,
          name: "No title",
          description: "No description",
          cx,
          cy,
          userId: 0,
          radarId: parseInt(radarId),
        };
        const newBullet = await createNewBullet(bullet);
        const bulletNode = createBulletNode(newBullet);
        listenBullet(bulletNode);
        svgContainer.appendChild(bulletNode);
        // const bullet = null;
        // const bullet = getBullet(event, svgContainer, DEFAULT_BULLET_CONFIG);
        // svgContainer.appendChild(bullet);
        // listenBullet(bullet);
        setState({ creatingBulletMode: false, currentBullet: newBullet });
      }
    }
  );
}
