"use server";

import { ACCESS_TOKEN } from "@/constants/firebase.constant";
import { cookies } from "next/headers";

const EDU_API_BASE_URL = process.env.EDU_API_BASE_URL;

export async function actionFetch(
  endpoint: string,
  init?: RequestInit,
  withCredentials?: boolean,
): Promise<Response> {
  if (!EDU_API_BASE_URL) {
    throw new Error("API URL is not defined in environment variables");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN)?.value;

  const headers = new Headers({
    ...(init?.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  const config: RequestInit = {
    ...(withCredentials && { credentials: "include" }), // Only include credentials if withCredentials is true
    ...init,
    headers,
  };

  return fetch(`${EDU_API_BASE_URL}${endpoint}`, config);
}
