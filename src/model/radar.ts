import type { BulletRead } from "./bullet-read";
import type { User } from "./user";

export interface Radar {
  id: number;
  title: string;
  description: string | null;
  user?: User | null;
  userId: number | null;
  bullets?: BulletRead[];
}
