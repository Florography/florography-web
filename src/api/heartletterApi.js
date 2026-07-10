import { axiosInstance } from "./axiosInstance";

export const getHeartLetter = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/heartletter/${userId}`);
        console.log(response.data);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}