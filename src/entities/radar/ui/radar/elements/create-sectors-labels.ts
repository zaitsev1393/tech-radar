import { Colors } from "@/config/styles/colors";
import { RADAR_HEIGHT, RADAR_WIDTH } from "@/entities/radar/model/radar.config";
import type { SectorsInfo } from "@/model/sectors";

const FONT_SIZE = 20;
const DEFAULT_OFFSET = 24;

const setStyles = (qudrant: SVGTextElement): void => {
  qudrant.setAttribute("font-size", FONT_SIZE.toString());
  qudrant.setAttribute("fill", Colors.Radar.Text);
};

export const createSectorLabels = (
  sectorsInfo: SectorsInfo,
  el: Element
): void => {
  const { sectors } = sectorsInfo;
  const names = sectors.map(({ name }) => name);

  const qudrantOne = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  setStyles(qudrantOne);
  qudrantOne.setAttribute("x", "0");
  qudrantOne.setAttribute("y", DEFAULT_OFFSET.toString());
  qudrantOne.textContent = names[0];
  el.appendChild(qudrantOne);

  const quadrantTwo = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  setStyles(quadrantTwo);
  quadrantTwo.setAttribute("text-anchor", "end");
  quadrantTwo.textContent = names[1];
  el.appendChild(quadrantTwo);
  quadrantTwo.setAttribute(
    "x",
    (RADAR_WIDTH - quadrantTwo.getBoundingClientRect().width).toString()
  );
  quadrantTwo.setAttribute("y", DEFAULT_OFFSET.toString());

  const quadrantThree = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  setStyles(quadrantThree);
  quadrantThree.textContent = names[2];
  el.appendChild(quadrantThree);
  quadrantThree.setAttribute("x", "0");
  quadrantThree.setAttribute("y", (RADAR_HEIGHT - DEFAULT_OFFSET).toString());

  const quadrantFour = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  setStyles(quadrantFour);
  quadrantFour.setAttribute("text-anchor", "end");
  quadrantFour.textContent = names[3];
  el.appendChild(quadrantFour);
  quadrantFour.setAttribute(
    "x",
    (RADAR_WIDTH - quadrantFour.getBoundingClientRect().width).toString()
  );
  quadrantFour.setAttribute("y", (RADAR_HEIGHT - DEFAULT_OFFSET).toString());
};
