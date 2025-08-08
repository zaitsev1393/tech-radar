import { authGoogle } from "../../../../data-access/auth.service";
import { d } from "../../../utils/layout/d";

export const listenSignUpButton = (): void => {
  const signUpButton = d.id("signUpButton");

  if (signUpButton) {
    signUpButton.addEventListener("click", () => {
      authGoogle();
    });
  }
};
