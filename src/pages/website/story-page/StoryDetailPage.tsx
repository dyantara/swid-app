"use client";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStory } from "@/hooks/useStories";

function StoryDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: story, isLoading, isError, error } = useStory(slug ?? "");

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
        );
    }

    if (isError || !story) {
        return (
            <div className="text-center text-red-500 py-20">
                Terjadi kesalahan: {(error as Error)?.message ?? "Story tidak ditemukan"}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back button */}
            <Link to="/story">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Story
                </Button>
            </Link>

            {/* Hero Image */}
            {story.image && (
                <div className="w-full h-80 rounded-xl overflow-hidden shadow mt-6">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <Card className="rounded-xl shadow">
                <CardContent className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline">{story.category?.name ?? "Tanpa Kategori"}</Badge>
                        <span className="text-sm text-gray-500">
                            {new Date(story.createdAt).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold">{story.title}</h1>

                    <div className="prose prose-gray max-w-none">{story.content}</div>

                    <p className="text-sm text-gray-500 mt-6">
                        Ditulis oleh:{" "}
                        {story.isAnonymous ? "Anonim" : (story.submittedBy?.name ?? "Pengguna")}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default StoryDetailPage;
