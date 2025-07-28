import type { BulletRead } from "../model/bullet-read";
import { apiUrl } from "./auth.service";

export async function createNewBullet(bullet: BulletRead): Promise<BulletRead> {
  const response = await fetch(
    apiUrl + "/radars/" + bullet.radarId + "/bullet",
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
