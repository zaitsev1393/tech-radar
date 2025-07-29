import type { BulletRead } from "../model/bullet-read";
import { apiUrl } from "./auth.service";

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
}): Promise<BulletRead> {
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
