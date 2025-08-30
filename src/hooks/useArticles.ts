// src/hooks/useArticles.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

// Tipe data
export interface Article {
    _id: string;
    title: string;
    content: string;
    author: { _id: string; name: string; email: string };
    category?: { _id: string; name: string };
    tags?: string[];
    thumbnail?: string;
    status: "draft" | "published" | "archived";
    slug: string;
    createdAt: string;
    updatedAt: string;
}

// ✅ Ambil semua artikel
export const useArticles = () =>
    useQuery<Article[], Error>({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await api.get("/articles");
            return data.data;
        },
    });

// ✅ Ambil detail artikel by slug
export const useArticle = (slug: string) =>
    useQuery<Article, Error>({
        queryKey: ["articles", slug],
        queryFn: async () => {
            const { data } = await api.get(`/articles/${slug}`);
            return data.data;
        },
        enabled: !!slug,
    });

// ✅ Create artikel
export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post("/articles", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

// ✅ Update artikel
export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
            const { data } = await api.put(`/articles/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["articles", data._id] });
        },
    });
};

// ✅ Update status (approve/reject)
export const useUpdateArticleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const { data } = await api.patch(`/articles/${id}/status`, { status });
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

// ✅ Delete artikel
export const useDeleteArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/articles/${id}`);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};
