import BaseRequest from "@/app/config/BaseRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPackages = () => {
    return useQuery({
        queryKey: ["get-all-packages"],
        queryFn: async () => {
            return BaseRequest.Get(`/packages/get-all`);
        },
    });
};
