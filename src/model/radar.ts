import type { BulletRead } from "./bullet-read";

export interface Radar {
  id: number;
  title: string;
  description?: string;
  userId: number;
  bullets: BulletRead[];
}
