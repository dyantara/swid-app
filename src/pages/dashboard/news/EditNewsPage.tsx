"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useArticle, useUpdateArticle } from "@/hooks/useArticles";
import { toast } from "sonner";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ArrowLeft } from "lucide-react";

export default function EditNewsPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { data: categories } = useCategories();
    const { data: article, isLoading: isLoadingArticle } = useArticle(slug!);
    console.log(article);
    const updateArticleMutation = useUpdateArticle();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | string | null>(null);

    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
        if (article) {
            setTitle(article.title ?? "");
            setContent(article.content ?? "");
            setTags(article.tags?.join(", ") ?? "");
            setThumbnail(article.thumbnail ?? article.thumbnail ?? null);

            if (article?.category?._id) {
                setCategory(article.category._id);
            }
        }
    }, [article, categories]);

    if (isLoadingArticle) return <p>Loading...</p>;
    if (!article) return <p>Artikel tidak ditemukan</p>;

    const handleSubmit = (status: "draft" | "published") => {
        if (!article) return;

        if (status === "draft") setIsSavingDraft(true);
        if (status === "published") setIsPublishing(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (category) formData.append("category", category);
        formData.append("status", status);

        if (tags) {
            const tagsArray = tags.split(",").map((tag) => tag.trim());
            formData.append("tags", JSON.stringify(tagsArray));
        }

        // ✅ Bedakan antara thumbnail lama (string URL) & baru (File)
        if (thumbnail) {
            if (typeof thumbnail === "string") {
                formData.append("thumbnailUrl", thumbnail);
            } else {
                formData.append("thumbnail", thumbnail);
            }
        }

        updateArticleMutation.mutate(
            { id: article._id, formData },
            {
                onSuccess: () => {
                    toast.success(
                        status === "draft"
                            ? "Artikel berhasil disimpan sebagai draft ✨"
                            : "Artikel berhasil dipublikasikan 🚀"
                    );
                    navigate("/dashboard/news");
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Gagal mengupdate artikel 😢");
                },
                onSettled: () => {
                    setIsSavingDraft(false);
                    setIsPublishing(false);
                },
            }
        );
    };

    return (
        <div className="px-8">
            <div className="flex items-center gap-3 mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/dashboard/news")}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                </Button>
                <h1 className="text-2xl font-bold">Edit Berita</h1>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg mx-auto">
                <form className="space-y-4">
                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul berita"
                            required
                        />
                    </div>

                    {/* Konten */}
                    <div className="text-gray-950">
                        <label className="block text-sm font-medium mb-1">Konten</label>
                        <ReactQuill
                            key={article._id}
                            value={content}
                            onChange={setContent}
                            placeholder="Tulis isi berita..."
                            theme="snow"
                            className="bg-white text-black"
                        />
                    </div>

                    {/* Grid: Kategori, Tags, Thumbnail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Kategori</label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full">
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

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <Input
                                className="w-full"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Pisahkan dengan koma, contoh: politik, teknologi"
                            />
                        </div>

                        {/* Thumbnail */}
                        <div>
                            {thumbnail && typeof thumbnail === "string" && (
                                <div className="w-full h-48 flex-shrink-0 mb-2">
                                    <img
                                        src={thumbnail}
                                        alt={title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail</label>
                                <Input
                                    className="w-full"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/dashboard/news")}
                        >
                            Batal
                        </Button>

                        <Button
                            type="button"
                            onClick={() => handleSubmit("draft")}
                            disabled={isSavingDraft}
                            variant="secondary"
                        >
                            {isSavingDraft ? "Menyimpan..." : "Simpan sebagai Draft"}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => handleSubmit("published")}
                            disabled={isPublishing}
                        >
                            {isPublishing ? "Menyimpan..." : "Publikasikan"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
