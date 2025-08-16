// src/pages/dashboard/DashboardStories.tsx
import { useStories } from "@/hooks/useStories";
import { Link } from "react-router-dom";
import { StoriesDataTable } from "./StoriesDataTable";

function DashboardStories() {
    const { data: storyResponse, isLoading, isError, error } = useStories();
    const stories = storyResponse?.data ?? [];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary-0">Manajemen Story</h1>
                <Link
                    to="/dashboard/stories/create"
                    className="bg-primary-0 text-white px-4 py-2 rounded-lg hover:bg-primary-200 transition"
                >
                    + Tambah Story
                </Link>
            </div>

            <StoriesDataTable stories={stories} />
        </div>
    );
}

export default DashboardStories;
