// lib/axios-client.ts
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance as AxiosType, AxiosError,
} from "axios";
import { StatusCodes } from "http-status-codes";
import { AuthResponse } from "@/types/auth.type";
import { requestRefreshCredentials } from "@/lib/actions/auth.action";

type RequestConfig = AxiosRequestConfig;

class AxiosInstance {

  api: AxiosType;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_COLAB_API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    });

    this.api.defaults.withCredentials = true
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true;

          const authResponse: AuthResponse | null = await requestRefreshCredentials()
          if (authResponse) {
            return this.api(originalRequest)
          }

          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const res = await this.api.get<T>(url, config);
    return res.data;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const res = await this.api.post<T>(url, data, config);
    return res.data;
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const res = await this.api.put<T>(url, data, config);
    return res.data;
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const res = await this.api.patch<T>(url, data, config);
    return res.data;
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const res = await this.api.delete<T>(url, config);
    return res.data;
  }

  async request<T>(method: string, url: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
    return this.api.request<T>({
      method,
      url,
      ...config,
    });
  }

  public setTimeout(timeout: number): void {
    this.api.defaults.timeout = timeout;
  }
}

const axiosInstance = new AxiosInstance();
export default axiosInstance;
