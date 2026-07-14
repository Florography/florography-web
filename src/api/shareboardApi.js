import { axiosInstance } from "./axiosInstance";

//게시글 출력
export const getShareBoard = async () => {
    try {
        const response = await axiosInstance.get("/api/shareboard");
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//게시글 인기순위 출력
export const getRankShareBoard = async () => {
    try{
        const response = await axiosInstance.get("/api/shareboard/rank");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//댓글 출력
export const getComment = async (boardId) => {
    try {
        const response = await axiosInstance.get(`/api/shareboard/comments/${boardId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//게시글 입력
export const registerShareBoard = async (data) => {
    try {
        const response = await axiosInstance.post("/api/shareboard", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//댓글 입력
export const registerComment = async (data) => {
    try {
        const response = await axiosInstance.post("/api/shareboard/comments", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//게시글 삭제
export const deleteShareBoard = async ({id, userId}) => {
    try {
        const response = await axiosInstance.delete(`/api/shareboard/${id}/${userId}`);
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}

// 댓글 삭제
export const deleteComment = async ({boardId, userId, id}) => {
    try {
        const response = await axiosInstance.delete(`/api/shareboard/comments/${boardId}/${userId}/${id}`);
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}

// 게시글 수정
export const putShareBoard = async ({userId, data}) => {
    try {
        const response = await axiosInstance.put(`/api/shareboard/${userId}`, data);
        return response.data;
    } catch(error) {
        return error.response.data;
    }

}

// 댓글 수정
export const putComment = async ({userId, data}) => {
    try {
        const response = await axiosInstance.put(`/api/shareboard/comments/${userId}`, data);
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}

// 좋아요 증가
export const putLikeUp = async ({id, data}) => {
    try {
        const response = await axiosInstance.put(`/api/shareboard/${id}/up`, data);
        return response.data;
    } catch(error) {
        //throw error.response?.data || error;
        return error.response.data;
    }
}

// 좋아요 취소
export const putLikeDown = async ({id, data}) => {
    try {
        const response = await axiosInstance.put(`/api/shareboard/${id}/down`, data);
        console.log("좋아요 취소" + response.data)
        return response.data;
    } catch(error) {
        // throw error.response?.data || error;
        return error.response.data;
    }
}

// 좋아요 테이블에 추가
export const registerBoardLike = async (data) => {
    try {
        const response = await axiosInstance.post("/api/shareboard/boardlike",data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
// 좋아요 테이블에 삭제
export const deleteBoardLike = async ({boardId,userId}) => {
    try {
        const response = await axiosInstance.delete(`/api/shareboard/boardlike/${boardId}/${userId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
// 좋아요 여부 확인 출력
export const getBoardLike = async ({boardId, userId}) => {
    try {
        const response = await axiosInstance.get(`/api/shareboard/boardlike/${boardId}?userId=${userId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}