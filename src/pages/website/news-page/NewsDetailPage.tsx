"use client";

import { useParams, Link } from "react-router-dom";
import { useArticle } from "@/hooks/useArticles";
import { Loader2, ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function NewsDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: article, isLoading, isError, error } = useArticle(slug ?? "");

    if (isLoading) {
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

    if (!article) {
        return (
            <div className="text-center py-20 text-gray-500">
                Artikel tidak ditemukan.
                <div className="mt-4">
                    <Link to="/news">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke News
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Buat inisial author
    const authorInitials = article.author?.name
        ? article.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "A";

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back button */}
            <Link to="/news">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke News
                </Button>
            </Link>

            {/* Thumbnail */}
            {article.thumbnail && (
                <div className="w-full h-100 rounded-xl overflow-hidden shadow mt-6">
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Article Card */}
            <Card className="rounded-xl mt-6 shadow">
                <CardContent className="space-y-4">
                    {/* Title & Meta */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold">{article.title}</h1>
                        <div className="flex items-center justify-between text-gray-500 text-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">
                                            {authorInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-gray-500 text-sm">
                                        {article.author?.name ?? "Anonymous"}
                                    </span>
                                </div>
                                <span className="text-gray-500 text-sm">
                                    {new Date(article.createdAt).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                            <Badge variant="outline">
                                {article.category?.name ?? "Tanpa Kategori"}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        className="prose max-w-full"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                    ></div>
                </CardContent>
            </Card>
        </div>
    );
}

export default NewsDetailPage;
