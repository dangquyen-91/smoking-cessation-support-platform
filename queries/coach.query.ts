"use client";

import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCoach = () => {
    return useQuery({
        queryKey: ["get-coaches"],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/consultations/coaches`);
        },
    });
};

export const useGetAllListCoachRequests = (status: any) => {
    return useQuery({
        queryKey: ["get-coach-requests", status],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/consultations/requests?status=${status}`
            );
        },
    });
};

export const useGetRevenue = () => {
    return useQuery({
        queryKey: ["get-revenue"],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/chatrooms/participant/1/statistics`
            );
        },
    });
};

export const useRequestWithdraw = () => {
    const queryClient = useQueryClient();
    const userId = utils.getUserId();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/withdraws/user/${userId}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-revenue"] });
            queryClient.invalidateQueries({ queryKey: ["get-coach-requests"] });
        },
    });
};
export const useGetWithdrawByPaging = () => {
    return useQuery({
        queryKey: ["get-list-withdraw-paging"],
        queryFn: async () => {
            const response = await BaseRequest.Get(`/withdraws/all`);
            return response;
        },
    });
};
