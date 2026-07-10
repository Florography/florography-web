import { axiosInstance } from "./axiosInstance";

export const getSeedRecord = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/seedrecord/${userId}`);
        console.log(response.data);
        return response.data.body ?? [];
    } catch (error) {
        return error.response.data;
    }
}