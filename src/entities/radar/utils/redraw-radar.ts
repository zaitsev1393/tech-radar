import { d } from "@/shared/utils/layout/d";

export const redrawRadar = () => {
  const currentRadar = d.id("radar");
  if (currentRadar) {
    currentRadar.innerHTML = "";
  }
};
