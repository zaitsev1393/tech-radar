import { removeBulletNode } from "@/entities/bullet/utils/remove-bullet-node";
import { deleteBullet } from "../../../data-access/bullets.service";
import type { BulletRead } from "../../../model/bullet-read";
import { sectorsInfo } from "../../../model/sectors";
import { setState, state } from "../../../model/state";
import { d } from "../../../shared/utils/layout/d";
import { groupBullets } from "../../sorter/ui/groups/group-bullets";
import { renderGroups } from "../../sorter/ui/groups/render-groups";
import { BulletOverview } from "../bullet-overview";

const DELETE_BUTTON_ID = "deleteBulletButton";

const button = d.id(DELETE_BUTTON_ID);

export const listenDeleteButton = () => {
  if (button) {
    button.addEventListener("click", (event) => {
      _deleteBullet(state.currentBullet);
    });
  }
};

async function _deleteBullet(bullet: BulletRead): Promise<void> {
  if (!bullet.radarId || !bullet.id) return;
  try {
    await deleteBullet({
      radarId: bullet.radarId.toString(),
      bulletId: bullet.id.toString(),
    });
    removeBulletNode();
    setState({
      bullets: state.bullets.filter((b) => b.id !== bullet.id),
      currentBullet: null,
    });
    groupBullets(sectorsInfo, state.bullets);
    BulletOverview().hide();
    renderGroups(state);
  } catch (e) {
    console.error(e);
  }
}
