import React, { useState } from "react";

function NewsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // Dummy data untuk website psikolog
    const articles = [
        {
            id: 1,
            title: "Mengatasi Kecemasan Sehari-hari",
            category: "Mental Health",
            desc: "Tips praktis untuk mengelola rasa cemas dan tetap fokus menjalani aktivitas harian.",
        },
        {
            id: 2,
            title: "Pentingnya Self-Care untuk Kesehatan Mental",
            category: "Self-Care",
            desc: "Bagaimana menjaga keseimbangan hidup melalui perawatan diri yang konsisten.",
        },
        {
            id: 3,
            title: "Membangun Hubungan yang Sehat",
            category: "Relationship",
            desc: "Langkah-langkah membangun komunikasi yang baik dan hubungan yang harmonis.",
        },
        {
            id: 4,
            title: "Mindfulness untuk Pemula",
            category: "Mindfulness",
            desc: "Teknik sederhana untuk mulai berlatih mindfulness dan meningkatkan kualitas hidup.",
        },
        {
            id: 5,
            title: "Burnout di Tempat Kerja: Gejala & Solusi",
            category: "Mental Health",
            desc: "Kenali tanda-tanda burnout dan strategi untuk memulihkan semangat kerja.",
        },
    ];

    // Filter & search logic
    const filteredArticles = articles.filter(
        (a) =>
            (filter === "all" || a.category === filter) &&
            a.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mt-10">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">News & Insight</h1>
                <p className="mt-2 text-gray-300">
                    Dapatkan wawasan dan tips dari para ahli untuk menjaga kesehatan mentalmu.
                </p>
            </section>

            {/* Search & Filter */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 mt-8">
                <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full md:w-1/2"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="all">Semua Kategori</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Self-Care">Self-Care</option>
                    <option value="Relationship">Relationship</option>
                    <option value="Mindfulness">Mindfulness</option>
                </select>
            </div>

            {/* Cards */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        className="relative bg-white rounded-xl shadow p-4 text-left hover:shadow-lg transition-shadow duration-300 min-w-[350px] max-w-[350px]"
                    >
                        {/* Category Ribbon */}
                        <div className="absolute top-2 left-0 bg-primary-0 text-white px-3 py-1 transform -rotate-12 shadow text-xs font-semibold rounded-sm">
                            {article.category}
                        </div>

                        <div className="h-40 bg-gray-200 rounded mb-4"></div>
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <p className="text-gray-600 text-sm my-2">{article.desc}</p>
                        <button className="text-primary-0 font-semibold mt-2">
                            Baca Selengkapnya →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsPage;
