export const loadIcon = async (name: string): Promise<string> => {
  const resp = await fetch(`./assets/icons/svg/${name}.svg`);
  const icon = await resp.text();
  return icon;
};
