import { useQuery } from "@tanstack/react-query";
import { getHeartLetter } from "../../api/heartletterApi";



export const useHeartLetters = (userId) => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["heartLetter", userId, accessToken],
        queryFn: () => getHeartLetter(userId),
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
};