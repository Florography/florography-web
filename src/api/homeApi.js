import { axiosInstance } from "./axiosInstance.js"

export const writeSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.post("/seedrecord", data);
        console.log(data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.put("/seedrecord", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getSeedRecord = async (data) => {
    try {
        const response = await axiosInstance.get("/seedrecord", { params: data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}