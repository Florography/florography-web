import { useQuery } from "@tanstack/react-query"
import { getMyRecord } from "../../api/useApi";

export const useSeedRecord = () => {
    const seedRecord = localStorage.getItem("seedRecord");

    return useQuery({
        queryKey: ["seedRecord", seedRecord],
        queryFn: getMyRecord, 
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}