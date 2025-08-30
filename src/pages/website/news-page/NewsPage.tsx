"use client";

import * as React from "react";
import { useArticles, type Article } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCategories, type Category } from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

// ✅ Helper buat strip tag HTML
const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = DOMPurify.sanitize(html);
    return tmp.textContent || tmp.innerText || "";
};

function NewsPage() {
    const { data: articlesData, isLoading, isError, error } = useArticles();
    const { data: categories, isLoading: catLoading } = useCategories();

    const [searchQuery, setSearchQuery] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
    const [page, setPage] = React.useState(1);
    const pageSize = 6; // ✅ tampilkan 6 articles per halaman

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

    const articles: Article[] = Array.isArray(articlesData) ? articlesData : [];

    // ✅ Filter hanya published
    const publishedArticle = articles.filter((a) => a.status === "published");

    // ✅ Filter by search & kategori
    const filteredArticles = publishedArticle.filter((articles) => {
        const matchTitle = articles.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categoryFilter === "all" || articles.category?._id === categoryFilter;
        return matchTitle && matchCategory;
    });

    // ✅ Pagination (client side)
    const totalPages = Math.ceil(filteredArticles.length / pageSize);
    const paginatedArticles = filteredArticles.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16 text-center rounded-lg">
                <h1 className="text-4xl font-bold">News & Insight</h1>
                <p className="mt-2 text-gray-300">
                    Dapatkan wawasan dan tips dari para ahli untuk menjaga kesehatan mentalmu.
                </p>
            </section>

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

                {/* Articles Grid */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {paginatedArticles.length > 0 ? (
                        paginatedArticles.map((articles) => (
                            <Link to={`/news/detail/${articles.slug}`} key={articles._id}>
                                <Card className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col h-full">
                                    <CardContent className="flex-1 flex flex-col justify-between space-y-2">
                                        {articles.thumbnail && (
                                            <div className="w-full h-48 flex-shrink-0">
                                                <img
                                                    src={articles.thumbnail}
                                                    alt={articles.title}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-lg font-semibold line-clamp-2">
                                                {articles.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                                                {stripHtml(articles.content)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                                            <Badge variant="outline">
                                                {articles.category?.name ?? "Tanpa Kategori"}
                                            </Badge>
                                            <span>
                                                {new Date(articles.createdAt).toLocaleDateString(
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
                            Belum ada berita.
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

export default NewsPage;
