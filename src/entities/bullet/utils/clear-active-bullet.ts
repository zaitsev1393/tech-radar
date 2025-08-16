export const clearActiveBullet = (): void => {
  const activeBullet = document.getElementsByClassName("active-bullet")[0];
  if (activeBullet) {
    activeBullet.classList.toggle("active-bullet");
  }
};
