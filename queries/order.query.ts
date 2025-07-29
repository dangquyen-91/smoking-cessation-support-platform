import BaseRequest from "@/app/config/BaseRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(`/order/create-order`, data);
        },
    });
};
