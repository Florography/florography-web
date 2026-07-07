import { axiosInstance } from "./axiosInstance"

export const writeSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.post("/api/seedrecord", data);
        console.log(data)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.get("/api/seedrecord", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}