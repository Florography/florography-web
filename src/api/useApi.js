import { axiosInstance } from "./axiosInstance.js";

export const getMeRequest = async () => {
    const response = await axiosInstance.get("api/user/linked-accounts");
    return response.data;
}

export const getMyRecored = async () => {
    const response = await axiosInstance.get("api/seedrecord");
    return response.data;
}

export const getFlowerDictionary = async () => {
    console.log("디렉터리 서치")
    const response = await axiosInstance.get("api/flowerdictionary");
    console.log(response.data)
    return response.data;
}

export const linkAccountRequest = async (provider) => {
    const response = await axiosInstance.post(`api/user/link/${provider}`);
    return response.data;
}

export const unlinkAccountRequest = async (provider) => {
    const response = await axiosInstance.delete(`api/user/link/${provider}`);
    return response.data;
}