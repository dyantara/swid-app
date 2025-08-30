import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // kalau pakai cookie
});

// Request interceptor → inject token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // atau dari context/state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor → handle error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token invalid/expired
            localStorage.removeItem("token");

            // redirect ke login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
