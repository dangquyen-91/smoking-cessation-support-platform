import BaseRequest from "@/app/config/BaseRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateWithdraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (model: any) => {
            const response = await BaseRequest.Put(
                `/withdraws/update-status`,
                model
            );
            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["get-list-withdraw-paging"],
            });
        },
    });
};
