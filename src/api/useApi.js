import { axiosInstance } from "./axiosInstance";

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
        console.log(response);
        return response.data;

    } catch(error){
        return error.response.data;
    }
}


export const getMyMood = async () => {
    try{
        const response = await axiosInstance.get("/api/mood");
        console.log(response);
        return response.data;

    } catch(error){
        return error.response.data;
    }
}