import type { User } from "../model/user";

const API_BASE = "http://localhost:3000";
export const apiUrl = API_BASE + "/api/v1";

const token = null;

export let currentUser: User | null = null;

export const authGoogle = async () => {
  try {
    // const token = await fetch(apiUrl + "/auth/google");
    window.location.href = "http://localhost:3000/auth/google";
    console.log("Successfully authed with google", token);
  } catch (e) {
    console.error("error auth google:", e);
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch(apiUrl + "/profile", {
      credentials: "include",
    });

    if (!response.ok) return false;

    const profile = await response.json();
    // localStorage.setItem("profile", JSON.stringify(profile));
    currentUser = profile;
    return true;
  } catch (e) {
    return false;
  }
};
