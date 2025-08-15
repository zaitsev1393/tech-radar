import { SorterGroupByOptions } from "../model/sorter-group-by";
import type { SorterData } from "../ui/sorter/update-sorter-container";
import { getBulltetsForRings } from "./get-bullets-by-rings";
import { getBulletsForSectors } from "./get-bullets-by-sectors";

export const getSorterData = (
  groupBy: SorterGroupByOptions | null
): SorterData => {
  if (!groupBy) return getBulletsForSectors();

  switch (groupBy) {
    case SorterGroupByOptions.Sectors:
      return getBulletsForSectors();
    case SorterGroupByOptions.Rings:
      return getBulltetsForRings();
    default:
      return getBulletsForSectors();
  }
};
