const ls = localStorage;

export const saveBullets = () => {
  // const bullets = document.querySelectorAll(".bullet");
  // l(bullets);
};

export const saveBullet = (bullet) => {
  return new Promise((resolve) => {
    const jsonBullet: any = {};
    for (const attr of bullet.attributes) {
      jsonBullet[attr.name] = attr.value;
    }
    // l(jsonBullet);
    if (!ls.getItem("radar")) {
      ls.setItem("radar", JSON.stringify({ bullets: [] }));
    }

    const radar = JSON.parse(ls.getItem("radar") || "");

    if (radar) {
      let savedBullets = radar.bullets;
      // l(
      // "radar.bullets:",
      // radar.bullets.map((data) => data["data-id"])
      // );
      // l("jsonbullet: ", jsonBullet["data-id"]);
      const existingBulletIdx = radar.bullets.findIndex(
        (b) => b["data-id"] === jsonBullet["data-id"]
      );
      // l(existingBulletIdx);
      if (existingBulletIdx > -1) {
        savedBullets.splice(existingBulletIdx, 1, jsonBullet);
      } else {
        savedBullets = [...savedBullets, jsonBullet];
      }

      radar.bullets = savedBullets;
      localStorage.setItem("radar", JSON.stringify(radar));
    }

    // l("saved radar: ", ls.getItem("radar"));
    resolve();
  });
};
