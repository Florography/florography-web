import { axiosInstance } from "./axiosInstance";

//게시글 출력
export const getShareBoard = async () => {
    try {
        const response = await axiosInstance.get("/api/shareboard");
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
