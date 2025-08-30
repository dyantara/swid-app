import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategories";
import api from "@/lib/axios";

export function AddStoryModal() {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data: categories, isLoading: catLoading } = useCategories();

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post("/stories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories-approved"] });
            toast.success("Cerita berhasil dikirim! Menunggu approval admin.");
            setOpen(false);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal mengirim cerita");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConfirmOpen(true);
    };

    const handleConfirmSubmit = (form: HTMLFormElement) => {
        const formData = new FormData(form);

        formData.set("isAnonymous", formData.get("isAnonymous") === "on" ? "true" : "false");

        const email = formData.get("email");
        if (!email) formData.delete("email");

        mutation.mutate(formData);
        setConfirmOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Cerita
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Tulis Cerita Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4" id="add-story-form">
                        <div>
                            <Label htmlFor="title">Judul</Label>
                            <Input id="title" name="title" required />
                        </div>

                        <div>
                            <Label htmlFor="content">Isi Cerita</Label>
                            <Textarea id="content" name="content" rows={5} required />
                        </div>

                        <div>
                            <Label htmlFor="category">Kategori</Label>
                            {catLoading ? (
                                <p>Loading kategori...</p>
                            ) : (
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full border rounded p-2"
                                    required
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories?.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="file">Gambar</Label>
                            <Input id="file" name="file" type="file" accept="image/*" required />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="isAnonymous" name="isAnonymous" />
                            <Label htmlFor="isAnonymous">Kirim sebagai anonim</Label>
                        </div>

                        <div>
                            <Label htmlFor="email">Email (opsional)</Label>
                            <Input id="email" name="email" type="email" />
                        </div>

                        <p className="text-sm text-gray-500">
                            Cerita Anda akan muncul setelah admin menyetujuinya.
                        </p>

                        <Button type="submit" disabled={mutation.isPending} className="w-full">
                            {mutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Kirim
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Konfirmasi sebelum submit */}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogTrigger asChild></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Kirim Cerita</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin mengirim cerita ini? Cerita akan muncul setelah
                            admin menyetujuinya.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleConfirmSubmit(
                                    document.getElementById("add-story-form") as HTMLFormElement
                                )
                            }
                        >
                            Kirim
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
