"use client";

import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTrainerRequest = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/trainer-requests/create-trainer-request`,
                data
            );
        },
    });
};

export const useGetMyTrainerRequest = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-my-trainer-request"],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/trainer-requests/get-by-user/${userId}`
            );
        },
    });
};

export const useTrainerRequestGetByPaging = (status: any) => {
    return useQuery({
        queryKey: ["get-trainer-requests", status],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/trainer-requests/get-by-paging?status=${status}`
            );
        },
    });
};

export const useAcceptTrainerRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: any) => {
            return await BaseRequest.Get(
                `/trainer-requests/accept-trainer-request/${payload.requestId}/${payload.status}`
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-trainer-requests"],
                exact: false,
            });
        },
    });
};
