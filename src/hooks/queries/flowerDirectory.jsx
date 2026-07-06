import { useQuery } from "@tanstack/react-query"
import { getFlowerDictionary } from "../../api/useApi";

export const useFlowerDirectoies = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["seedRecord", accessToken],
        queryFn: getFlowerDictionary, 
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}