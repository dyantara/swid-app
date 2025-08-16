// lib/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// tambahin interceptor buat otomatis kirim token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // atau sessionStorage/context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
