import BaseRequest from "@/app/config/BaseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllBlog = (status: any) => {
    return useQuery({
        queryKey: ["get-all-blog", status],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/blog?status=${status}`);
        },
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/api/blog`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-blog"] });
        },
    });
};

export const usePublishBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: any) => {
            return await BaseRequest.Post(`/api/blog/${id}/publish`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-blog"] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: any) => {
            return await BaseRequest.Delete(`/api/blog/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-blog"] });
        },
    });
};
