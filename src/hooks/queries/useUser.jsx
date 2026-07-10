import { useQuery } from "@tanstack/react-query"
import { getMeRequest, getMyRecord } from "../../api/useApi";

export const useMe = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: getMeRequest, 
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}

// export const useMySeedRecord = () => {
//     const accessToken = localStorage.getItem("accessToken");

//     return useQuery({
//         queryKey: ["mySeedRecord", accessToken],
//         queryFn: getMyRecord,
//         retry: 0,
//         staleTime: 6000 * 60 * 24,
//         gcTime: 6000 * 10,
//     });
// }