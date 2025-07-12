import { d } from "../selectors/d";

export const removeBullets = () => {
  const bullets = d.all(".bullet");
  for (const bullet of bullets) {
    bullet.remove();
  }
};
