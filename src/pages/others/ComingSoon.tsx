"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function ComingSoon() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbyCpZyRmJEHWEjjQgcDKnskQeyThMV5TiVCY3SLEyWswveXDbwWd8jaVvbpvfj9WSTO/exec",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        timestamp: new Date().toISOString(),
                    }),
                }
            );

            if (response.ok) {
                toast.success("🎉 Email berhasil dikirim! Kami akan kabari kamu 😉");
                e.currentTarget.reset();
            } else {
                toast.error("Gagal mengirim email. Coba lagi ya 🙏");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan jaringan 😵‍💫");
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-background">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary-0">Coming Soon 🚀</h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-md">
                Website kami sedang dibangun. Masukkan email kamu, nanti kami kabari ya!
            </p>
            <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
                <Input type="email" name="email" placeholder="Masukkan email kamu..." required />
                <Button type="submit" className="bg-primary-0 hover:bg-primary-200">
                    <Mail className="w-4 h-4 mr-2" />
                    Notify Me
                </Button>
            </form>
        </main>
    );
}
