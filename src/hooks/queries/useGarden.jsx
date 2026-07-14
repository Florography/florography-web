import { useQuery } from "@tanstack/react-query";
import { getAllGardens, getGardenById } from "../../api/gardenApi";

export const useAllGardens = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["gardens", "all", accessToken],
        queryFn: () => getAllGardens(),
        retry: 0,
        staleTime: 60 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useGardenById = (id) => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["gardens", "detail", id, accessToken],
        queryFn: () => getGardenById(id),
        retry: 0,
        staleTime: 60 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!id,
    });
};
