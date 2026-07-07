import { axiosInstance } from "./axiosInstance.js";

export const getMeRequest = async () => {
    try{
        const response = await axiosInstance.get("api/user/linked-accounts");
        console.log(response);
        return response.data;

    } catch(error){
        return error.response.data;
    }
}


export const getMyRecored = async () => {
    try{
        const response = await axiosInstance.get("api/seedrecord");
        return response.data;

    } catch(error){
        return error.response.data;
    }
}


export const getMyMood = async () => {
    try{
        const response = await axiosInstance.get("/api/mood");
        return response.data;

    } catch(error){
        return error.response.data;
    }
}