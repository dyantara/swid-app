import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApprovedStories } from "@/hooks/useStories";
import { Link } from "react-router-dom";
import { AddStoryModal } from "./AddStoryModal";

function StoryPage() {
    const { data: storiesData, isLoading, isError, error } = useApprovedStories();

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

            {/* Story Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(storiesData) && storiesData.length > 0 ? (
                    storiesData.map((story) => (
                        <Link to={`/stories/${story._id}`} key={story._id}>
                            <Card className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col h-full">
                                <CardContent className="flex-1 flex flex-col justify-between space-y-2">
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
        </div>
    );
}

export default StoryPage;
