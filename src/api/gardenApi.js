import { axiosInstance } from "./axiosInstance";

export const saveGarden = async (gardenData, userId, name) => {
    const payload = {
        userId,
        gardenName: name,
        gardenData: JSON.stringify(gardenData),
        createdAt: new Date().toISOString()
    };
    const response = await axiosInstance.post("api/garden", payload);
    return response.data;
};

export const getAllGardens = async () => {
    console.log("Hi");
    const response = await axiosInstance.get("api/garden");
    console.log(response.data);
    return response.data;
};

export const getGardenById = async (id) => {
    const response = await axiosInstance.get(`api/garden/${id}`);
    return response.data;
};