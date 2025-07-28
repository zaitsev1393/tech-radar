import { d } from "../../helpers/selectors/d";
import { deleteAllRadars } from "../../services/radars.service";

export const listenDeleteAllRadarsButton = () => {
  const deleteAllRadarsButton = d.id("deleteAllRadarsButton");
  if (deleteAllRadarsButton) {
    deleteAllRadarsButton.addEventListener("click", () => {
      deleteAllRadars();
    });
  }
};
