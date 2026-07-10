import { useQuery } from "@tanstack/react-query"
import { getSeedRecord } from "../../api/seedRecordApi";

export const useSeedRecord = (userId) => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["seedRecord", userId, accessToken],
        queryFn: () => getSeedRecord(userId),
        enabled: !!userId,  //userId가 null, undefined가 아닐때 실행
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}