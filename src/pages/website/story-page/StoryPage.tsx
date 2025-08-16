import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApprovedStories, useCategories } from "@/hooks/useStories";
import { Link } from "react-router-dom";
import { AddStoryModal } from "./AddStoryModal";

function StoryPage() {
    const { data: storiesData, isLoading, isError, error } = useApprovedStories();
    const { data: categories } = useCategories();

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 6;

    if (isLoading)
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-500 py-20">
                Terjadi kesalahan: {(error as Error).message}
            </div>
        );

    // Filter & search
    const filteredStories =
        storiesData
            ?.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()))
            .filter((story) => !categoryFilter || story.category?._id === categoryFilter) ?? [];

    // Pagination
    const totalPages = Math.ceil(filteredStories.length / pageSize);
    const paginatedStories = filteredStories.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-blue-100 via-cyan-50 to-sky-300 text-gray-800 rounded-2xl p-10 md:p-20 flex flex-col items-center text-center space-y-6 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full animate-pulse"></div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fadeIn">
                    Cerita dan Pengalaman
                </h1>
                <p className="text-lg md:text-xl max-w-2xl animate-fadeIn delay-150">
                    Bagikan pengalamanmu atau baca cerita dari pengguna lain. Cerita bisa anonim.
                </p>

                <AddStoryModal />
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Input
                    placeholder="Cari cerita..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="md:max-w-sm"
                />

                <Select
                    value={categoryFilter ?? ""}
                    onValueChange={(val) => setCategoryFilter(val || null)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Story Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {paginatedStories.length > 0 ? (
                    paginatedStories.map((story) => (
                        <Link to={`/stories/${story._id}`} key={story._id}>
                            <Card className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col h-full">
                                <CardContent className=" flex-1 flex flex-col justify-between space-y-2">
                                    {story.image && (
                                        <div className="w-full h-48 flex-shrink-0">
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold line-clamp-2">
                                            {story.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                                            {story.content}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                                        <Badge variant="outline">
                                            {story.category?.name ?? "Tanpa Kategori"}
                                        </Badge>
                                        <span>
                                            {new Date(story.createdAt).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-10">
                        Tidak ada cerita.
                    </p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-2 text-gray-700">
                        {page} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

export default StoryPage;
