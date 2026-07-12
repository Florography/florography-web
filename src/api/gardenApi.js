import { axiosInstance } from "./axiosInstance";

export const saveGarden = async (data) => {
    console.log("gardenSaveButton");
    const response = await axiosInstance.post("api/garden", {params: data});
    return response.data;

}