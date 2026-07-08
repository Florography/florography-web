import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerComment, registerShareBoard } from "../../api/shareboardApi";

export const useShareBoardResisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => {
            return registerShareBoard(data);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["shareboard"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

export const useCommentRegisterMutation = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => registerComment(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["comment"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    });
};