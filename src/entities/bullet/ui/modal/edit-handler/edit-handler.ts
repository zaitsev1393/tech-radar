import { patchBullet } from "@/data-access/bullets.service";
import { updateStateBullet } from "@/data-access/state.service";
import { BulletOverview } from "@/features/bullet-overview/bullet-overview";
import { state } from "@/model/state";

export const editBulletHandler = async (data: any) => {
  if (!data) return;

  const radar = state.currentRadar;
  const bullet = state.currentBullet;
  if (!radar || !bullet || !bullet.id) return;
  try {
    const patchedBullet = await patchBullet({
      radarId: radar.id,
      bulletId: bullet.id,
      body: data,
    });
    updateStateBullet(patchedBullet);
    BulletOverview().setBullet(patchedBullet);
  } catch (e) {
    console.error(e);
  }
};
