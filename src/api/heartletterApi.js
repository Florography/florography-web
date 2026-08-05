import { axiosInstance } from "./axiosInstance";

export const createWrite = async (payload) => {
    try {
        const response = await axiosInstance.post("api/heartletter", payload);
        console.log(response.data);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}

export const updateWrite = async (data) => {
    try {
        const response = await axiosInstance.put("api/heartletter", data);
        console.log(response.data);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}

export const getHeartLetter = async (userId) => {
    try {
        const response = await axiosInstance.get(`api/heartletter/${userId}`);
        console.log(response.data);
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}
