import type { BulletRead } from "../../model/bullet-read";
import { d } from "../../shared/utils/layout/d";

interface BulletOverviewAPI {
  open: (bullet: BulletRead | null) => void;
  hide: () => void;
  setBullet: (bullet: BulletRead) => void;
}

export function BulletOverview(): BulletOverviewAPI {
  const el = d.id("bullet-overview");

  if (!el) {
    console.error("- No element with bullet-overview id, add one -");
  }

  const titleNode = el?.querySelector<HTMLElement>(`[title]`);
  const descriptionNode = el?.querySelector<HTMLElement>(`[description]`);

  function open(bullet: any): void {
    if (!el) return;
    el.classList.remove("hidden");

    setBullet(bullet);
  }

  function hide(): void {
    if (!el) return;
    el.classList.add("hidden");
  }

  function setBullet(bullet: BulletRead): void {
    const { name, description } = bullet;
    if (titleNode) {
      titleNode.innerHTML = name;
    }
    if (descriptionNode) {
      descriptionNode.innerText = description || "";
    }
  }

  return {
    open,
    hide,
    setBullet,
  };
}
