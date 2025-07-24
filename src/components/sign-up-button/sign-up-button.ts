import { d } from "../../helpers/selectors/d";
import { authGoogle } from "../../services/auth.service";

export const listenSignUpButton = (): void => {
  const signUpButton = d.id("signUpButton");

  if (signUpButton) {
    signUpButton.addEventListener("click", () => {
      console.log("click");
      authGoogle();
    });
  }
};
