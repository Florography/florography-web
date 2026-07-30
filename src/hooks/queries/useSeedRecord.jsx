import { useQuery } from "@tanstack/react-query"
import { getSeedRecord } from "../../api/seedrecordApi";

export const useSeedRecord = (userId) => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["seedRecord", userId, accessToken],
        queryFn: () => getSeedRecord(userId),
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}