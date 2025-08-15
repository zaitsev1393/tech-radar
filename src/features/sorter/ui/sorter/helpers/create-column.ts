import type { BulletRead } from "@/model/bullet-read";

export const createColumn = (
  name: string,
  bullets: BulletRead[]
): HTMLElement => {
  const column = document.createElement("div");
  column.classList.add(
    "text-white",
    "mt-4",
    "basis-full",
    "md:basis-auto",
    "sm:basis-full"
  );
  const title = document.createElement("div");
  title.classList.add("underline");
  title.innerText = name;

  const list = document.createElement("div");
  bullets.forEach((bullet, i) => {
    const item = document.createElement("div");
    item.innerText = `${i + 1}. ${bullet.name}`;
    item.classList.add("group-item");
    item.setAttribute("id", bullet.id?.toString() || "");
    list.appendChild(item);
  });

  column.appendChild(title);
  column.append(list);
  return column;
};
