import { useQuery } from "@tanstack/react-query"
import { getMyRecord } from "../../api/useApi";

export const useSeedRecord = (data) => {
    const seedRecord = localStorage.getItem("seedRecord");

    return useQuery({
        queryKey: ["seedRecord", seedRecord],
        queryFn: () => getMyRecord(data),
        enabled: !!data?.uid,
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}