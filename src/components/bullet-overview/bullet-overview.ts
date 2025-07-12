import { d } from "../../helpers/selectors/d";

interface BulletOverviewAPI {
  show: () => void;
  hide: () => void;
}

export function BulletOverview(): BulletOverviewAPI {
  const el = d.id("bullet-overview");
  function show(): void {
    if (!el) return;
    el.classList.remove("hidden");
  }

  function hide(): void {
    if (!el) return;
    el.classList.add("hidden");
  }
}
