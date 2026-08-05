import { axiosInstance } from "./axiosInstance";

export const getSeedRecord = async (userId) => {
    try {
        // userId를 문자열로 변환하여 안전하게 전달
        const id = String(userId).trim();
        const response = await axiosInstance.get(`api/seedrecord/getuser?userId=${id}`);
        console.log(response);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}


export const getSeedRecordByDate = async(userId) => {
    try {
        const id = String(userId).trim();
        const response = await axiosInstance.get(`api/seedrecord/getuser/date?userId=${id}&date=${date}`);
        console.log("특정 날짜 기록 조회:", response);
        return response.data.body;
    } catch (error) {
        console.error("특정 날짜 기록 조회 실패:", error);
        return [];
    }
}