import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance as AxiosType,
  AxiosError,
} from "axios";
import { StatusCodes } from "http-status-codes";
import { getAuth } from "firebase/auth";

type RequestConfig = AxiosRequestConfig;

class AxiosInstance {
  api: AxiosType;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.EDU_API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        if (typeof window !== "undefined") {
          try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
              const token = await user.getIdToken();
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (e) {
            console.error("Firebase auth is not initialized yet:", e);
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.status === StatusCodes.UNAUTHORIZED &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          if (typeof window !== "undefined") {
            try {
              const auth = getAuth();
              const user = auth.currentUser;
              if (user) {
                const newToken = await user.getIdToken(true);
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.api(originalRequest);
              }
            } catch (refreshError) {
              console.error("Firebase refresh token failed:", refreshError);
            }

            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          }
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const res = await this.api.get<T>(url, config);
    return res.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const res = await this.api.post<T>(url, data, config);
    return res.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const res = await this.api.put<T>(url, data, config);
    return res.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const res = await this.api.patch<T>(url, data, config);
    return res.data;
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const res = await this.api.delete<T>(url, config);
    return res.data;
  }

  async request<T>(
    method: string,
    url: string,
    config?: RequestConfig,
  ): Promise<AxiosResponse<T>> {
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
