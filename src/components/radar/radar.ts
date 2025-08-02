import {
  DEFAULT_RADAR_CONFIG,
  DEFAULT_SVG_CONTAINER_CONFIG,
} from "../../config/radar.config";
import { createBulletNode } from "../../helpers/bullet/create-bullet";
import { getSVGCoords } from "../../helpers/bullet/get-bullet";
import { listenBullet } from "../../helpers/bullet/listen-bullet";
import { getSvgContainer } from "../../helpers/primitives/create-svg-container";
import { createTextLabel } from "../../helpers/primitives/create-text-label";
import { drawRadar } from "../../helpers/radar/create-radar";
import { createRingLabels } from "../../helpers/radar/create-ring-labels";
import { createSectorLabels } from "../../helpers/radar/create-sectors-labels";
import type { BulletRead } from "../../model/bullet-read";
import type { Radar } from "../../model/radar";
import { sectorsInfo } from "../../model/sectors";
import { state, toggleState } from "../../model/state";
import { createNewBullet } from "../../services/bullets.service";
import { BulletOverview } from "../bullet-overview/bullet-overview";
import { groupBullets } from "../groups/group-bullets";

export function createRadar(root: HTMLElement, radar: Radar): void {
  const svgContainer: Element | null = getSvgContainer({
    ...DEFAULT_SVG_CONTAINER_CONFIG,
    id: radar.id,
  });

  if (!svgContainer) return;

  root.appendChild(svgContainer);

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

  createTextLabel({
    root: svgContainer,
    x: 0,
    y: 50,
    text: radar.title,
    config: { "font-size": 16, color: "white" },
  });

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
        groupBullets(sectorsInfo, state.bullets);
        toggleState({ creatingBulletMode: false, currentBullet: newBullet });
        BulletOverview().open(newBullet);
      }
    }
  );
}
