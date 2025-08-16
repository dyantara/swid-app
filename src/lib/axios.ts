// lib/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // atau sessionStorage/context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // pastikan header Authorization dihapus kalau token tidak ada
        if (config.headers) delete config.headers.Authorization;
    }
    return config;
});

export default api;
