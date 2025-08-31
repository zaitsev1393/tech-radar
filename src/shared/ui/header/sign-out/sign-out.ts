import { logout } from "@/data-access/auth.service";
import { refreshUi } from "@/main";

export const listenLogoutButton = () => {
  const logoutButton = document.querySelector("#logoutButton");

  if (!logoutButton) return;

  logoutButton.addEventListener("click", async () => {
    await logout();
    refreshUi();
  });
};
