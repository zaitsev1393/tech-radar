import { clearActiveBullet } from "@/entities/bullet/utils/clear-active-bullet";
import { highlightBullet } from "@/entities/bullet/utils/highlight-bullet";
import { BulletOverview } from "@/features/bullet-overview/bullet-overview";
import type { BulletRead } from "@/model/bullet-read";
import { setState, state } from "@/model/state";
import { setActiveSorterItem } from "./set-active-sorter-item";

export const createColumn = (
  name: string,
  bullets: BulletRead[]
): HTMLElement => {
  const column = document.createElement("div");
  column.classList.add("sorter-column");
  const title = document.createElement("div");
  title.classList.add("underline");
  title.innerText = name;

  const list = document.createElement("div");
  bullets.forEach((bullet, i) => {
    const item = document.createElement("div");
    item.innerText = `${i + 1}. ${bullet.name}`;
    item.classList.add("group-item");
    item.setAttribute("id", bullet.id?.toString() || "");

    item.addEventListener("mouseenter", () => {
      BulletOverview().open(bullet);
      highlightBullet(bullet);
    });

    item.addEventListener("mouseleave", () => {
      const currentBullet = state.currentBullet;
      if (currentBullet?.id !== bullet.id) {
        clearActiveBullet();
        BulletOverview().hide();
      }

      if (currentBullet) {
        highlightBullet(currentBullet);
        BulletOverview().open(currentBullet);
      }
    });

    item.addEventListener("mousedown", () => {
      BulletOverview().open(bullet);
      setState({ currentBullet: bullet });
      setActiveSorterItem(item);
    });

    list.appendChild(item);
  });

  column.appendChild(title);
  column.append(list);
  return column;
};
