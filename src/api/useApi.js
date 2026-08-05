import { axiosInstance } from "./axiosInstance.js";

export const getMeRequest = async () => {
    const response = await axiosInstance.get("/api/user/linked-accounts");
    return response.data;
}

export const getMyRecord = async (userId) => {
    const response = await axiosInstance.get(`/api/seedrecord/${userId}`);
    return response.data;
}

export const getFlowerDictionary = async () => {
    const response = await axiosInstance.get("/api/flowerdictionary");
    console.log(response.data);
    return response.data;
}

export const getHeartLetter = async () => {
    const response = await axiosInstance.get("/api/heartletter");
    console.log(response.data);
    return response.data;
}

export const linkAccountRequest = async (provider) => {
    const response = await axiosInstance.post(`/api/user/link/${provider}`);
    return response.data;
}

export const unlinkAccountRequest = async (provider) => {
    try{
        const response = await axiosInstance.post(`/api/user/unlink/${provider}`);
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