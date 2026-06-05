import { BASE_URL, VENDOR_API } from "@/constants/api";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

export interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        if (originalRequest.url?.includes(VENDOR_API.auth.refreshToken)) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            error.response.data.detail !== "Invalid credentials" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await api.post<{ accessToken: string }>(
                    VENDOR_API.auth.refreshToken,
                );

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("user");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
