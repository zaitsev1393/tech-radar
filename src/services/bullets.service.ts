import type { BulletRead, BulletWrite } from "../model/bullet-read";
import { state, toggleState } from "../model/state";
import { apiUrl } from "./auth.service";

interface PatchBulletRequest {
  radarId: string;
  bulletId: string;
  body: BulletWrite;
}

interface DeleteBulletRequest {
  radarId: string;
  bulletId: string;
}

export async function createNewBullet(bullet: BulletRead): Promise<BulletRead> {
  const response = await fetch(
    apiUrl + "/radars/" + bullet.radarId + "/bullets",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bullet),
    }
  );
  const newBullet = await response.json();
  toggleState({
    currentBullet: newBullet,
    bullets: [...state.bullets, newBullet],
  });
  return newBullet;
}

export async function patchBullet({
  radarId,
  bulletId,
  body,
}: PatchBulletRequest): Promise<BulletRead> {
  const response = await fetch(
    apiUrl + "/radars/" + radarId + "/bullets/" + bulletId,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const bullet = await response.json();
  const bullets = state.bullets;
  const bulletIdx = bullets.findIndex(({ id }) => id === bullet.id);
  if (bulletIdx > -1) {
    bullets.splice(bulletIdx, 1, bullet);
  }
  toggleState({
    currentBullet: bullet,
    bullets,
  });
  return bullet;
}

export async function deleteBullet({
  radarId,
  bulletId,
}: DeleteBulletRequest): Promise<Response> {
  try {
    return await fetch(apiUrl + "/radars/" + radarId + "/bullets/" + bulletId, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (e: any) {
    throw new Error(e);
  }
}
