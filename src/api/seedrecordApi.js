import { axiosInstance } from "./axiosInstance";

export const getSeedRecord = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/seedrecord/getuser?userId=${userId}`);
        console.log(response);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}