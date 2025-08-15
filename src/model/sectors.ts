import { RADAR_WIDTH } from "../entities/radar/model/radar.config";

export interface Sector {
  name: string;
  quadrant: number;
  borders: {
    x: [number, number];
    y: [number, number];
  };
}

export interface SectorsInfo {
  sectors: Sector[];
}

const radius = RADAR_WIDTH;

export const sectorsInfo: SectorsInfo = {
  sectors: [
    {
      name: "Techniques",
      quadrant: 0,
      borders: {
        x: [0, radius / 2],
        y: [0, radius / 2],
      },
    },
    {
      name: "Tools",
      quadrant: 0,
      borders: {
        x: [radius / 2, radius],
        y: [0, radius / 2],
      },
    },
    {
      name: "Platforms",
      quadrant: 0,
      borders: {
        x: [0, radius / 2],
        y: [radius / 2, radius],
      },
    },
    {
      name: "Languages & Frameworks",
      quadrant: 0,
      borders: {
        x: [radius / 2, radius],
        y: [radius / 2, radius],
      },
    },
  ],
};
