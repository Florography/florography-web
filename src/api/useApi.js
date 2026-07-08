import { axiosInstance } from "./axiosInstance.js";

export const getMeRequest = async () => {
    const response = await axiosInstance.get("/api/user/linked-accounts");
    return response.data;
}

export const getMyRecored = async () => {
    const response = await axiosInstance.get("api/seedrecord");
    return response.data;
}

export const getFlowerDictionary = async () => {
    const response = await axiosInstance.get("api/flowerdictionary");
    console.log(response.data);
    return response.data;
}

export const linkAccountRequest = async (provider) => {
    const response = await axiosInstance.post(`api/user/link/${provider}`);
    return response.data;
}

export const unlinkAccountRequest = async (provider) => {
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