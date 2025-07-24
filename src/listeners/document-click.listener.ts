import { BulletOverview } from "../components/bullet-overview/bullet-overview";
import { highlightBulletNode } from "../components/bullet/highlight-bullet-node";
import { getBulletById } from "../helpers/bullet/get-bullet-by-id";
import { updateDomBullet } from "../helpers/bullet/update-dom-bullet";
import { state, toggleState } from "../model/state";

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("group-item")) {
    toggleState({ currentBullet: getBulletById(target.dataset.id) });
    BulletOverview().open(state.currentBullet);
    updateDomBullet(state.currentBullet);
    highlightBulletNode(target);
  }
});
