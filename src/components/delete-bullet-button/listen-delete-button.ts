import { removeDomBullet } from "../../helpers/bullet/remove-dom-bullet";
import { d } from "../../helpers/selectors/d";
import type { Bullet } from "../../model/bullet";
import { sectorsInfo } from "../../model/sectors";
import { state, toggleState } from "../../model/state";
import { BulletOverview } from "../bullet-overview/bullet-overview";
import { groupBullets } from "../groups/group-bullets";
import { renderGroups } from "../groups/render-groups";

const DELETE_BUTTON_ID = "deleteBulletButton";

const button = d.id(DELETE_BUTTON_ID);

export const listenDeleteButton = () => {
  if (button) {
    button.addEventListener("click", (event) => {
      deleteBullet(state.currentBullet);
    });
  }
};

function deleteBullet(bullet: Bullet): void {
  removeDomBullet(bullet);
  toggleState({
    bullets: state.bullets.filter((b) => b["data-id"] !== bullet["data-id"]),
  });
  // saveState();
  groupBullets(sectorsInfo, state.bullets);
  BulletOverview().hide();
  renderGroups(state);
}
