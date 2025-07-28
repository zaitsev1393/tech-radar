import { DEFAULT_OFFSET, elHeight, elWidth } from "../radar/create-ring-labels";

interface CreateTextLabelConfig {
  "font-size": number;
  color: string;
}

interface CreateTextLabelArgs {
  root: HTMLElement;
  text: string;
  x: number;
  y: number;
  config: CreateTextLabelConfig;
}

export const createTextLabel = ({
  root,
  text,
  x,
  y,
  config,
}: CreateTextLabelArgs): void => {
  const textLabelEl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  textLabelEl.textContent = text;
  // text.setAttribute("text-anchor", "end");
  textLabelEl.setAttribute("font-size", `${config["font-size"]}`);
  textLabelEl.setAttribute("fill", "white");
  root.appendChild(textLabelEl);

  textLabelEl.setAttribute("x", `${x - elWidth(textLabelEl) - DEFAULT_OFFSET}`);
  textLabelEl.setAttribute("y", `${y + elHeight(textLabelEl)}`);
};
