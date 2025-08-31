import type { User } from "../model/user";

const API_BASE = "http://localhost:3000";
const authBaseurl = "/auth";
export const apiUrl = API_BASE + "/api/v1";

const token = null;

export let currentUser: User | null = null;

export const authGoogle = async () => {
  try {
    // const token = await fetch(apiUrl + "/auth/google");
    window.location.href = `${API_BASE}/auth/google`;
    console.log("Successfully authed with google", token);
  } catch (e) {
    console.error("error auth google:", e);
  }
};

export const auth = async (): Promise<boolean> => {
  try {
    const response = await fetch(apiUrl + "/profile", {
      credentials: "include",
    });

    if (!response.ok) return false;

    const profile = await response.json();
    currentUser = profile;
    return true;
  } catch (e) {
    return false;
  }
};

export const isAuthenticated = (): boolean => !!currentUser;

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(API_BASE + authBaseurl + "/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      currentUser = null;
    }
  } catch (e) {
    console.error("- Error logging out -: ", e);
  }
};
