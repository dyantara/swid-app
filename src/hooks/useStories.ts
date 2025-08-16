// hooks/useStories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface Category {
    _id: string;
    name: string;
}

export interface Story {
    _id: string;
    title: string;
    content: string;
    category: Category | null;
    image: string;
    status: "pending" | "approved" | "rejected";
    submittedAt: string;
    approvedAt?: string;
    isAnonymous: boolean;
    email?: string;
    submittedBy?: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

type StoryResponse = {
    message: string;
    count: number;
    data: Story[];
};

// --- STORIES ---
export const useStories = () =>
    useQuery<StoryResponse, Error>({
        queryKey: ["stories"],
        queryFn: async () => {
            const { data } = await api.get("/stories");
            return data;
        },
    });

export const useApprovedStories = () =>
    useQuery<Story[], Error>({
        queryKey: ["stories-approved"],
        queryFn: async () => {
            const { data } = await api.get("/stories?status=approved");
            return data.data;
        },
    });

export const useStory = (id: string) =>
    useQuery<Story, Error>({
        queryKey: ["story", id],
        queryFn: async () => {
            const { data } = await api.get(`/stories/${id}`);
            return data.data;
        },
        enabled: !!id,
    });

export const useUpdateStoryStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const { data } = await api.patch(`/stories/${id}/status`, { status });
            return data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stories"] }),
    });
};

// --- CATEGORIES ---
export const useCategories = () =>
    useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await api.get("/categories");
            return data.data; // response { message, count, data }
        },
    });

// --- ADD STORY MUTATION ---
export const useAddStory = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post("/stories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories-approved"] });
            if (onSuccess) onSuccess();
        },
    });
};
