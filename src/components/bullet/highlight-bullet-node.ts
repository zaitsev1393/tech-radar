import { getActiveBullet } from "../../helpers/bullet/get-active-bullet";
import { nodeToJsonBullet } from "../../helpers/mappers/node-to-jsonbullet";
import { d } from "../../helpers/selectors/d";
import { toggleState } from "../../model/state";

export const highlightBulletNode = (groupItem: HTMLElement): void => {
  clearBulletNodeHighlight();
  const bulletNode = d.query(`.bullet[data-id='${groupItem.dataset.id}']`);
  toggleState({
    currentBullet: nodeToJsonBullet(bulletNode),
  });
  if (bulletNode) {
    bulletNode.classList.add("bullet-active");
  }
};

function clearBulletNodeHighlight(): void {
  const activeBullet = getActiveBullet();
  if (activeBullet) {
    activeBullet.classList.remove("bullet-active");
  }
}
