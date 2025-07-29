"use client";

import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMockSmokingStatus = (quitPlanId: string) => {
    return useQuery({
        queryKey: ["get-quit-plan-by-id", quitPlanId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/quit-plans/${quitPlanId}`);
        },
    });
};

export const useGetQuitPlanById = (quitPlanId: string) => {
    return useQuery({
        queryKey: ["get-quit-plan-by-id", quitPlanId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/quit-plans/${quitPlanId}`);
        },
    });
};

export const useGetQuitPlanProgress = (
    quitPlanId: string,
    year: number,
    month: number
) => {
    return useQuery({
        queryKey: ["get-quit-plan-progress", quitPlanId],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/quit-plans/${quitPlanId}/progress?year=${year}&month=${month}`
            );
        },
    });
};

export const useUpdateProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/api/quit-plans/${data.planId}/progress`,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-quit-plan-progress"],
            });
        },
    });
};

export const useGetQuitPlanByUserId = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-quit-plan-by-user-id", userId],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/quit-plans/get-by-user/${userId}`
            );
        },
    });
};

export const useCreateQuitPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/quit-plans`, data);
        },
    });
};
