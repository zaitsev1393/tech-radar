import type { BulletRead } from "./bullet-read";
import type { Radar } from "./radar";

export interface User {
  id: number;
  email: string;
  name: string | null;
  googleId: string | null;
  picture: string | null;
  createdAt: Date;
  radars?: Radar[];
  bullets?: BulletRead[];
}
