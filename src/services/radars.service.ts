import { apiUrl } from "./auth.service";

export function getRadars(): Promise<any> {
  return fetch(apiUrl + "/radars", {
    method: "GET",
    credentials: "include",
  });
}
