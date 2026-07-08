import { useQuery } from "@tanstack/react-query";
import { getComment, getShareBoard } from "../../api/shareboardApi";

export const useShareBoard = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["shareboard", accessToken],
        queryFn: getShareBoard, 
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}

export const useComment = (boardId) => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["comment", accessToken, boardId],
        queryFn: () => getComment(boardId), 
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 10,
    });
}


