import { axiosInstance } from "./axiosInstance.js"

export const writeSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.post("/api/seedrecord", data);
        console.log(data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.put("/api/seedrecord", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.get("/api/seedrecord", { params: data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}