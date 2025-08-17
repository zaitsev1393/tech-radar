import { createNewRadar, getRadars } from "@/data-access/radars.service";
import { DEFAULT_RADAR_CONFIG } from "@/entities/radar/model/radar.config";
import { createRadar } from "@/entities/radar/ui/create-radar";
import { getRadarsContainer } from "@/entities/radar/utils/get-radar-node";
import { RadarModal } from "@/features/radars/ui/create-radar-form/create-radar-modal";
import { modalService } from "@/main";
import type { FormInput } from "@/shared/modal/model/modal";
import { renderTabs } from "../render-tabs";

export const addRadarHandler = async () => {
  modalService.open({
    class: RadarModal,
    cb: async (data: FormInput) => {
      if (!data) return;

      const radar = await createNewRadar({
        title: data?.title,
        description: "radar",
      });
      createRadar(getRadarsContainer(DEFAULT_RADAR_CONFIG), radar);
      const radarsResponse = await getRadars();
      const radars = await radarsResponse.json();
      renderTabs(radars);
      return;
    },
  });
};
