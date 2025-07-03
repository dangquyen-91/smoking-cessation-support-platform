// lib/api/axiosInstance.ts
import axios from "axios";
import { getCookie } from "cookies-next";

const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://scsp.autopass.blog/"
        : "https://scsp.autopass.blog/";

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("AT"); // Từ cookies-next
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            if (typeof window !== "undefined") {
                // Client side redirect
                document.cookie = "AT=; Max-Age=0";
                window.location.href = "/login";
            }
        }
        return Promise.reject(error.response || error);
    }
);

export default axiosInstance;
