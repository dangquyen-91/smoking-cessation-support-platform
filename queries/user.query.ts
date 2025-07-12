import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserByRole = (role: string) => {
    if (role === "all") {
        return useQuery({
            queryKey: ["get-all-user"],
            queryFn: async () => {
                return await BaseRequest.Get(`/api/users/all`);
            },
        });
    } else {
        return useQuery({
            queryKey: ["get-user-coaches", role],
            queryFn: async () => {
                return await BaseRequest.Get(`/api/users/coaches`);
            },
        });
    }
};

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/users/register`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-user"] });
        },
    });
};

export const useUpdateStatusUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Put(`/api/users/${data.id}/status`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-user"] });
        },
    });
};

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/users/login`, data);
        },
    });
};

export const useGetUserById = (id: string) => {
    return useQuery({
        queryKey: ["get-user-by-id", id],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/users/${id}`);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Put(`/api/users/${data.id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-user-by-id"],
                exact: false,
            });
        },
    });
};
export const useGetMySocialPosts = (userId: string) => {
    return useQuery({
        queryKey: ["get-my-social-posts", userId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/social-posts/user/${userId}`);
        },
    });
};

export const useGetUserSavingData = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-user-saving-data", userId],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/users/${userId}/get-user-saving-data`
            );
        },
    });
};

export const useGetUserProgress = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-user-progress", userId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/users/${userId}/get-progress`);
        },
    });
};
