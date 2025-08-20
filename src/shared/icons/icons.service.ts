interface IconConfig {
  size: number;
  // color: string;
}

const DEFAULT_ICON_CONFIG = {
  size: 16,
  // color: Colors.Radar.Text,
};

export const loadIcon = async (
  name: string,
  config: IconConfig = DEFAULT_ICON_CONFIG
): Promise<SVGElement> => {
  config = { ...DEFAULT_ICON_CONFIG, ...config };
  const resp = await fetch(`./assets/icons/svg/${name}.svg`);
  const icon = document
    .createRange()
    .createContextualFragment(await resp.text()).firstChild as SVGAElement;
  if (config) {
    const { size } = config;
    const side = `${size}px`;
    icon.style.width = side;
    icon.style.height = side;

    // icon.style.color = color;
  }
  return icon;
};
