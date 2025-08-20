import bus from "@/shared/bus/bus";
import type { BulletRead, BulletWrite } from "../model/bullet-read";
import { setState, state } from "../model/state";
import { apiUrl } from "./auth.service";

export enum BulletActions {
  Create = "bulletCreated",
  Delete = "bulletDeleted",
  Update = "bulletUpdated",
}

interface PatchBulletRequest {
  radarId: number;
  bulletId: number;
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

  setState({
    currentBullet: newBullet,
    bullets: [...state.bullets, newBullet],
  });

  bus.notify({ name: BulletActions.Create });

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

  setState({
    currentBullet: bullet,
    bullets,
  });

  bus.notify({ name: BulletActions.Update });

  return bullet;
}

export async function deleteBullet({
  radarId,
  bulletId,
}: DeleteBulletRequest): Promise<Response> {
  try {
    const response = await fetch(
      apiUrl + "/radars/" + radarId + "/bullets/" + bulletId,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setState({
        currentBullet: null,
        bullets: state.bullets.filter((e) => e.id !== Number(bulletId)),
      });
    }

    bus.notify({ name: BulletActions.Delete });

    return response;
  } catch (e: any) {
    throw new Error(e);
  }
}
