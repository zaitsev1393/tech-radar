import { RADAR_HEIGHT, RADAR_WIDTH } from "../../config/radar.config";
import type { SectorsInfo } from "../../model/sectors";

export const createSectorLabels = (
  sectorsInfo: SectorsInfo,
  el: SVGSVGElement
): void => {
  const { sectors } = sectorsInfo;
  const names = sectors.map(({ name }) => name);

  const qudrantOne = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  const FONT_SIZE = 20;
  const DEFAULT_OFFSET = 24;
  qudrantOne.setAttribute("x", 0);
  qudrantOne.setAttribute("y", DEFAULT_OFFSET);
  qudrantOne.setAttribute("font-size", FONT_SIZE);
  qudrantOne.setAttribute("fill", "white");
  qudrantOne.textContent = names[0];
  el.appendChild(qudrantOne);

  const quadrantTwo = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  quadrantTwo.setAttribute("font-size", FONT_SIZE);
  quadrantTwo.setAttribute("fill", "white");
  quadrantTwo.textContent = names[1];
  el.appendChild(quadrantTwo);
  quadrantTwo.setAttribute(
    "x",
    RADAR_WIDTH - quadrantTwo.getBoundingClientRect().width - DEFAULT_OFFSET
  );
  quadrantTwo.setAttribute("y", DEFAULT_OFFSET);

  const quadrantThree = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  quadrantThree.setAttribute("font-size", FONT_SIZE);
  quadrantThree.setAttribute("fill", "white");
  quadrantThree.textContent = names[2];
  el.appendChild(quadrantThree);
  quadrantThree.setAttribute("x", 0);
  quadrantThree.setAttribute("y", RADAR_HEIGHT - DEFAULT_OFFSET);

  const quadrantFour = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  quadrantFour.setAttribute("font-size", FONT_SIZE);
  quadrantFour.setAttribute("fill", "white");
  quadrantFour.textContent = names[3];
  el.appendChild(quadrantFour);
  quadrantFour.setAttribute(
    "x",
    RADAR_WIDTH - quadrantFour.getBoundingClientRect().width - DEFAULT_OFFSET
  );
  quadrantFour.setAttribute("y", RADAR_HEIGHT - DEFAULT_OFFSET);
};
