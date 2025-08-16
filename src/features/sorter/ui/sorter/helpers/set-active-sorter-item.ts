export const setActiveSorterItem = (item: HTMLElement): void => {
  const activeItem = document.querySelector(".group-item.active");
  if (activeItem) {
    activeItem.classList.toggle("active");
  }
  item.classList.add("active");
};
