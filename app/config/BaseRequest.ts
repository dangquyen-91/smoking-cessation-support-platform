// lib/api/baseRequest.ts
import axiosInstance from "./axiosInstance";

const BaseRequest = {
    Get: async <T = any>(url: string): Promise<T> => {
        const response = await axiosInstance.get<T>(url);
        return response.data;
    },
    Post: async <T = any>(
        url: string,
        data?: any
    ): Promise<[any, T | null]> => {
        try {
            const res: any = await axiosInstance.post(url, data);
            if (res?.success) return [null, res.data];
            return [res?.message || "Unknown error", null];
        } catch (err: any) {
            return [err?.data?.message || err.message, null];
        }
    },

    Put: async <T = any>(url: string, data?: any): Promise<[any, T | null]> => {
        try {
            const res: any = await axiosInstance.put(url, data);
            if (res?.success) return [null, res.data];
            return [res?.message || "Unknown error", null];
        } catch (err: any) {
            return [err?.data?.message || err.message, null];
        }
    },

    Delete: async <T = any>(url: string): Promise<[any, T | null]> => {
        try {
            const res: any = await axiosInstance.delete(url);
            if (res?.success) return [null, res.data];
            return [res?.message || "Unknown error", null];
        } catch (err: any) {
            return [err?.data?.message || err.message, null];
        }
    },
};

export default BaseRequest;
