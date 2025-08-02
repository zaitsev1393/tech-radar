import type { Radar } from "./radar";
import type { User } from "./user";

export interface BulletRead {
  id?: number;
  name: string;
  description: string | null;
  cx: number;
  cy: number;
  radar?: Radar | null;
  radarId: number | null;
  user?: User | null;
  userId: number | null;
}

export interface BulletWrite {
  id: string;
  name?: string;
  description?: string | null;
  cx: number;
  cy: number;
  radar?: Radar | null;
  radarId: number | null;
  user?: User | null;
  userId: number | null;
}
