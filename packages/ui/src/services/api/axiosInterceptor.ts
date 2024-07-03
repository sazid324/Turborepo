import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { envConfig } from "@repo/ui/src/lib/config/env";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth.config";

interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
}

const refreshAccessToken = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !("refreshToken" in session)) {
    throw new Error("No refresh token available");
  }

  const refresh_token = session.refreshToken;

  if (refresh_token) {
    try {
      const response = await axios.post<IRefreshToken>(
        `${envConfig.NEXT_PUBLIC_BASE_BACKEND_URL}${apiUrls.AUTH.REFRESH_TOKEN}`,
        { refresh: refresh_token },
      );
      return response.data.accessToken;
    } catch (error) {
      throw new Error("Failed to refresh access token");
    }
  }

  throw new Error("No refresh token available");
};

const axiosInstance = axios.create({
  baseURL: `${envConfig.NEXT_PUBLIC_BASE_BACKEND_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    if (!session || !("accessToken" in session)) {
      throw new Error("No refresh token available");
    }

    const accessToken = session?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        originalRequest.headers.Authorization = await refreshAccessToken();
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    throw error;
  },
);

export default axiosInstance;
