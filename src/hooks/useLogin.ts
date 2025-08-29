import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    success: boolean;
    message: string;
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
};

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: async (payload) => {
            try {
                const { data } = await api.post("/users/login", payload);
                return data;
            } catch (err: any) {
                // ✅ lempar custom error supaya bisa ditangkap React Query
                throw new Error(err.response?.data?.message || "Terjadi kesalahan di server");
            }
        },
    });
};
