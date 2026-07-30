import { axiosInstance } from "./axiosInstance";

export const getSeedRecord = async (userId) => {
    try {
        // userId를 문자열로 변환하여 안전하게 전달
        const id = String(userId).trim();
        const response = await axiosInstance.get(`/seedrecord/getuser?userId=${id}`);
        console.log(response);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}