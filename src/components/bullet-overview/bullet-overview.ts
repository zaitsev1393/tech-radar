import { d } from "../../helpers/selectors/d";

interface BulletOverviewAPI {
  open: (bullet: any) => void;
  hide: () => void;
  update: (bullet: any) => void;
}

export function BulletOverview(): BulletOverviewAPI {
  const el = d.id("bullet-overview");
  const titleNode = el?.querySelector(`[title]`);
  const descriptionNode = el?.querySelector(`[description]`);

  function open(bullet: any): void {
    if (!el) return;
    el.classList.remove("hidden");

    update(bullet);
  }

  function hide(): void {
    if (!el) return;
    el.classList.add("hidden");
  }

  function update(bullet): void {
    if (titleNode) {
      titleNode.innerHTML = bullet["data-title"];
    }
    if (descriptionNode) {
      descriptionNode.innerHTML = bullet["data-description"];
    }
  }

  return {
    open,
    hide,
    update,
  };
}
