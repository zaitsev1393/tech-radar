import { d } from "../../helpers/selectors/d";
import type { BulletRead } from "../../model/bullet-read";

interface BulletOverviewAPI {
  open: (bullet: BulletRead | null) => void;
  hide: () => void;
  update: (bullet: any) => void;
}

export function BulletOverview(): BulletOverviewAPI {
  const el = d.id("bullet-overview");
  const titleNode = el?.querySelector(`[title]`) as HTMLElement;
  const descriptionNode = el?.querySelector(`[description]`) as HTMLElement;

  function open(bullet: any): void {
    if (!el) return;
    el.classList.remove("hidden");

    update(bullet);
  }

  function hide(): void {
    if (!el) return;
    el.classList.add("hidden");
  }

  function update(bullet: BulletRead): void {
    const { name: title, description } = bullet;
    if (titleNode) {
      titleNode.innerHTML = title;
    }
    if (descriptionNode && description) {
      descriptionNode.innerText = description;
    }
  }

  return {
    open,
    hide,
    update,
  };
}
