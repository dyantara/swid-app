"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApprovedStories, type Story } from "@/hooks/useStories";
import { useCategories, type Category } from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { AddStoryModal } from "./AddStoryModal";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function StoryPage() {
    const { data: storiesData, isLoading, isError, error } = useApprovedStories();
    const { data: categories, isLoading: catLoading } = useCategories();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
    const [page, setPage] = React.useState(1);
    const pageSize = 6; // ✅ tampilkan 6 story per halaman

    if (isLoading || catLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-20">
                Terjadi kesalahan: {(error as Error).message}
            </div>
        );
    }

    const stories: Story[] = Array.isArray(storiesData) ? storiesData : [];

    // ✅ Filter by search & kategori
    const filteredStories = stories.filter((story) => {
        const matchTitle = story.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categoryFilter === "all" || story.category?._id === categoryFilter;
        return matchTitle && matchCategory;
    });

    // ✅ Pagination (client side)
    const totalPages = Math.ceil(filteredStories.length / pageSize);
    const paginatedStories = filteredStories.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="space-y-8">
            <div className="p-12 rounded-lg mx-auto  relative bg-gradient-to-r from-blue-100 via-cyan-50 to-sky-300 text-gray-800 flex flex-col items-center justify-center text-center space-y-6 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full animate-pulse"></div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Cerita dan Pengalaman
                </h1>
                <p className="text-lg md:text-xl max-w-2xl">
                    Bagikan pengalamanmu atau baca cerita dari pengguna lain. Cerita bisa anonim.
                </p>

                <AddStoryModal />
            </div>

            <div className="space-y-8">
                {/* Search & Filter */}
                <div className="flex justify-between items-center sm:flex-row gap-4">
                    <Input
                        placeholder="Cari cerita berdasarkan judul..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="max-w-sm"
                    />
                    <Select
                        value={categoryFilter}
                        onValueChange={(val) => {
                            setCategoryFilter(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {categories?.map((cat: Category) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Story Grid */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {paginatedStories.length > 0 ? (
                        paginatedStories.map((story) => (
                            <Link to={`/story/detail/${story.slug}`} key={story._id}>
                                <Card className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col h-full">
                                    {story.image && (
                                        <div className="w-full h-48 flex-shrink-0 px-4">
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    )}

                                    <CardContent className="flex-1 flex flex-col space-y-2">
                                        {/* Konten utama: judul + snippet */}
                                        <div>
                                            <h2 className="text-lg font-semibold line-clamp-2">
                                                {story.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                                                {story.content}
                                            </p>
                                        </div>

                                        {/* Footer: kategori + tanggal */}
                                        <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                                            <Badge variant="outline">
                                                {story.category?.name ?? "Tanpa Kategori"}
                                            </Badge>
                                            <span>
                                                {new Date(story.createdAt).toLocaleDateString(
                                                    "id-ID",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card> 
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            Belum ada cerita tersedia. Yuk, bagikan ceritamu!
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            Halaman {page} dari {totalPages}
                        </span>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoryPage;
