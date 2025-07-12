export const nodeToJsonBullet = (nodeBullet) => {
  const jsonBullet: any = {};
  for (const attr of nodeBullet.attributes) {
    jsonBullet[attr.name] = attr.value;
  }
  return jsonBullet;
};
