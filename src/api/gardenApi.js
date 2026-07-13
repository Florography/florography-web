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
}