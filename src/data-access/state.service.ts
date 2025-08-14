import type { BulletRead } from "@/model/bullet-read";
import { setState, state } from "@/model/state";

export function updateStateBullet(bullet: BulletRead): void {
  const bullets = [
    ...state.bullets.filter(({ id }) => id === bullet.id),
    bullet,
  ];

  setState({
    currentBullet: bullet,
    bullets,
  });
}
