import { d } from "@/helpers/selectors/d";

export const redrawRadar = () => {
  const currentRadar = d.id("radar");
  if (currentRadar) {
    currentRadar.innerHTML = "";
  }
};
