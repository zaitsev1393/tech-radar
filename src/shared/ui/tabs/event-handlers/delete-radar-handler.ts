import { deleteRadar } from "@/data-access/radars.service";
import type { Radar } from "@/model/radar";
import { setState, state } from "@/model/state";
import { showRadar } from "../helpers/show-radar";
import { renderTabs } from "../render-tabs";

export const deleteRadarHandler = async (radar: Radar): Promise<void> => {
  try {
    await deleteRadar(radar.id);
    let currentRadar = state.currentRadar;
    if (radar.id === state.currentRadar?.id) {
      currentRadar = state.radars[0];
    }

    const radars = state.radars.filter(({ id }) => id !== radar.id);

    setState({
      radars,
      currentRadar,
    });

    renderTabs(radars);
    if (currentRadar) {
      showRadar(currentRadar);
    }
  } catch (e) {
    console.error("- error deleting radar: ", e);
  }
};
