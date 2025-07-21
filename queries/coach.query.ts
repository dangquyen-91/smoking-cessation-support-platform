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

export const useGetAllListCoachRequests = (status: any) => {
    return useQuery({
        queryKey: ["get-coach-requests", status],
        queryFn: async () => {
            return await BaseRequest.Get(
                `/api/consultations/requests?status=${status}`
            );
        },
    });
};
