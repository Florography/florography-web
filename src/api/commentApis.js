import { axiosInstance } from "./axiosInstance";

export const postComment = async (data) => {
    try{
        const response = await axiosInstance.post("api/comment", data)
        return response.data;
    } catch(error){
        return error.response.data;
    }
}