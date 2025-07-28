import type { Radar } from "../model/radar";
import { apiUrl } from "./auth.service";

export function getRadars(): Promise<any> {
  return fetch(apiUrl + "/radars", {
    method: "GET",
    credentials: "include",
  });
}
export async function createNewRadar({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Radar> {
  const response = await fetch(apiUrl + "/radars", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
  return response.json();
}
