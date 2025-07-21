import BaseRequest from "@/app/config/BaseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPackages = () => {
    return useQuery({
        queryKey: ["get-all-packages"],
        queryFn: async () => {
            return await BaseRequest.Get(`/packages/get-all`);
        },
    });
};

export const useCreatePackage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            return await BaseRequest.Post(
                `/packages/create-update-package`,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-packages"],
                exact: false,
            });
        },
    });
};
