import { removeDomBullet } from "../../helpers/bullet/remove-dom-bullet";
import { d } from "../../helpers/selectors/d";
import type { BulletRead } from "../../model/bullet-read";
import { sectorsInfo } from "../../model/sectors";
import { state, toggleState } from "../../model/state";
import { deleteBullet } from "../../services/bullets.service";
import { BulletOverview } from "../bullet-overview/bullet-overview";
import { groupBullets } from "../groups/group-bullets";
import { renderGroups } from "../groups/render-groups";

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
    removeDomBullet();
    toggleState({
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
