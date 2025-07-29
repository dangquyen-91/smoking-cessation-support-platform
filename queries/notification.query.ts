import BaseRequest from "@/app/config/BaseRequest";
import utils from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotification = () => {
    const userId = utils.getUserId();
    return useQuery({
        queryKey: ["get-all-notifications"],
        queryFn: async () => {
            return await BaseRequest.Get(`/api/notifications/user/${userId}`);
        },
    });
};
