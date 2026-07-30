import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 매 요청에서 요청이 백에 가기 전에 낚아채서 새로 가져온 토큰이 있으면 accessToken header에 인증에 bearer에 토큰 넣는다

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {  //401 인증오류
            localStorage.removeItem("accessToken");
            // window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
)