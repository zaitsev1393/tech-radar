import { patchRadar } from "@/data-access/radars.service";
import { RadarModal } from "@/features/radars/ui/create-radar-form/create-radar-modal";
import { modalService } from "@/main";
import type { Radar } from "@/model/radar";
import { setState, state } from "@/model/state";
import type { FormInput } from "@/shared/modal/model/modal";
import { renderTabs } from "../render-tabs";

export const editRadarHandler = async (radar: Radar): Promise<void> => {
  return modalService.open({
    class: RadarModal,
    state: { radarTitle: radar.title },
    cb: async (data: FormInput) => {
      if (!data) return;

      try {
        const response = await patchRadar(String(radar.id), data);
        const patchedRadar = await response.json();
        const radarIdx = state.radars.findIndex(
          ({ id }) => id === patchedRadar.id
        );
        if (radarIdx > -1) {
          const newRadars = [
            ...state.radars.filter(({ id }) => id !== patchedRadar.id),
            patchedRadar,
          ];
          setState({ radars: newRadars });
          renderTabs(newRadars);
        }
      } catch (e) {
        console.error("- error patching radar: ", e);
      }
    },
  });
};
