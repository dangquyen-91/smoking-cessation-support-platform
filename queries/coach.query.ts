import BaseRequest from "@/app/config/BaseRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetCoach = () => {
    return useQuery({
        queryKey: ["get-coaches"],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/consultations/coaches`);
        },
    });
};
