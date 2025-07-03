import BaseRequest from "@/app/config/BaseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllSocialPost = () => {
    return useQuery({
        queryKey: ["get-all-social-post"],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/social-posts`);
        },
    });
};

export const useCreateSocialPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/social-posts/${data.id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-social-post"],
            });
        },
    });
};

export const useDeleteSocialPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: any) => {
            return await BaseRequest.Delete(`/api/social-posts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-social-post"],
            });
        },
    });
};
