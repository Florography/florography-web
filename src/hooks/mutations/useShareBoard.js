import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment, deleteShareBoard, putComment, putLikeDown, putLikeUp, putShareBoard, registerComment, registerShareBoard } from "../../api/shareboardApi";

// 게시글 작성
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

//댓글 작성
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

//게시글 삭제
export const useShareBoardDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id,userId}) => {
            deleteShareBoard({id, userId});
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["shareboard"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}

//댓글 삭제
export const useCommentDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({boardId, userId, id}) => {
            deleteComment({boardId,userId,id});
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["comment"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}

// 게시글 수정
export const useShareBoardPutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({userId, data}) => {
            putShareBoard({userId, data});
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["shareboard"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

//댓글 수정
export const useCommentPutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({userId, data}) => {
            putComment({userId, data});
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["comment"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

//좋아요 증가
export const useLikeUpMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({id, data}) => { putLikeUp({id, data}); },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["shareboard"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

// 좋아요 취소
export const useLikeDownMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({id, data}) => {
            putLikeDown({id, data});
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(["shareboard"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}