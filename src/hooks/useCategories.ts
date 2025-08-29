import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface Category {
    _id: string;
    name: string;
}

export interface CategoriesResponse {
    status: string;
    message: string;
    data: {
        count: number;
        categories: Category[];
    };
}
// --- CATEGORIES ---
export function useCategories() {
    return useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await api.get<CategoriesResponse>("/categories");

            // axios: res.data = { status, message, data: { count, categories: [...] } }
            return res.data.data.categories; // ✅ ini array of Category
        },
    });
}
