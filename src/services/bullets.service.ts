import type { BulletRead, BulletWrite } from "../model/bullet-read";
import { apiUrl } from "./auth.service";

interface PatchBulletRequest {
  radarId: string;
  bulletId: string;
  body: BulletWrite;
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
  return response.json();
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
  return response.json();
}
