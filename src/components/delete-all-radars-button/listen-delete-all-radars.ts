import { deleteAllRadars } from "../../data-access/radars.service";
import { d } from "../../helpers/selectors/d";

export const listenDeleteAllRadarsButton = () => {
  const deleteAllRadarsButton = d.id("deleteAllRadarsButton");
  if (deleteAllRadarsButton) {
    deleteAllRadarsButton.addEventListener("click", () => {
      deleteAllRadars();
    });
  }
};
