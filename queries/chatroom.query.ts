"use client";

import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateChatroom = () => {
    return useMutation({
        mutationKey: ["create-achievement"],
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/chatrooms`, data);
        },
    });
};

export const useGetChatRoomById = (id: any) => {
    return useQuery({
        queryKey: ["get-chatroom-by-id", id],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/chatrooms/${id}`);
        },
    });
};

export const useSendMessageToChatRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["send-message-to-chatroom"],
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/api/chatrooms/${data.chatRoomId}/messages`,
                data.messageData
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-chatroom-by-id"],
                exact: false,
            });
        },
    });
};

export const useGetChatRoomByCreatedUser = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-chatroom-by-created-user", userId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/chatrooms/created-by/${userId}`);
        },
    });
};

export const useGetChatRoomByParticipant = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-chatroom-by-participant", userId],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/chatrooms/participant/${userId}`
            );
        },
    });
};
