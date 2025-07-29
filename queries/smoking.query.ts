import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateUpdateSmokingStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/api/smoking-status/${data.userId}`,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-mock-smoking-status"],
            });
        },
    });
};

export const useGetMockSmokingStatus = (userId: string) => {
    return useQuery({
        queryKey: ["get-mock-smoking-status", userId],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/smoking-status/${userId}`);
        },
    });
};

export const useGetCurrentSmokingStatus = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-current-smoking-status", userId],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/smoking-status/${userId}/current`
            );
        },
    });
};
