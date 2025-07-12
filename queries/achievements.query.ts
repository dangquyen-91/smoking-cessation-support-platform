"use client";
import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllAchievements = () => {
    return useQuery({
        queryKey: ["get-all-achievements"],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/achievements`);
        },
    });
};

export const useGetUserAchievements = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-user-achievements", userId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/achievements/user/${userId}`);
        },
    });
};

export const useCreateUserAchievement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-user-achievement"],
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/api/achievements/create-user-achievement/${data.userId}/${data.achievementId}`
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-user-achievements"],
            });
            queryClient.invalidateQueries({
                queryKey: ["get-all-achievements"],
            });
        },
    });
};

export const useCreateAchievement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-achievement"],
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/achievements`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-achievements"],
            });
        },
    });
};

export const useDeleteAchievement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-achievement"],
        mutationFn: async (id: any) => {
            return await BaseRequest.Delete(`/api/achievements/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-achievements"],
            });
        },
    });
};
