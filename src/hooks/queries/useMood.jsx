import { useQuery } from "@tanstack/react-query"
import { getMyMood } from "../../api/useApi";

export const useMood = () => {
    const mood = localStorage.getItem("mood");

    return useQuery({
        queryKey: ["mood", mood],
        queryFn: getMyMood(),
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}