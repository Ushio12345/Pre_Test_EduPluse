import type { AuthResponse } from "@/types/auth.type";

export const requestRefreshCredentials = async (): Promise<AuthResponse | null> => {
  try {
    // Gọi API refresh token thực tế ở đây
    // const res = await axios.post('/auth/refresh');
    // return res.data;
    console.log("Refreshing credentials...");
    return null; // Trả về null sẽ trigger redirect tới /login
  } catch (error) {
    return null;
  }
};
