import { useApprovedStories } from "@/hooks/useStories";
import { Link } from "react-router-dom";

function HomePage() {
    const { data: stories } = useApprovedStories();


    return (
        <div className="container mx-auto space-y-4">
            <section
                id="home"
                className="flex flex-col md:flex-row items-center justify-between  p-8 gap-8"
            >
                {/* Gambar */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img src="/assets/hero1.jpg" alt="Hero" className="w-[1000px] h-auto" />
                </div>

                {/* Judul & deskripsi */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-6xl font-bold text-primary-0 mb-4">
                        Tak Perlu Hadapi Kecemasan Sendirian
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Sahabat Wellbeing Indonesia hadir untuk kamu yang sedang berjuang dengan
                        kecemasan sosial, overthinking, burnout, dan tekanan hidup lainnya. Temukan
                        ruang aman untuk bercerita, memahami diri, dan bertumbuh bersama.
                    </p>
                    <a
                        href="login"
                        className="inline-block bg-primary-0 text-white px-6 py-3 rounded hover:bg-primary-200 transition"
                    >
                        Mulai Perjalananmu
                    </a>
                </div>
            </section>
            <section id="story" className=" p-8 rounded-xl">
                {/* Header dengan garis */}
                <div className="flex items-center mb-6">
                    <h1 className="text-2xl font-bold text-primary-0 mr-4">Cerita Sahabat</h1>
                    <div className="flex-1 h-2 rounded-full bg-primary-0"></div>
                </div>

                {/* Wrapper: flex horizontal */}
                <div className="flex gap-4 overflow-x-auto">
                    {/* Card Statis */}
                    <div className="min-w-[280px] max-w-[280px] bg-blue-200 rounded-xl shadow p-6 flex-shrink-0 flex flex-col justify-center h-[404px]">
                        <h2 className="text-4xl font-bold text-white mb-4">Cerita Sahabat</h2>
                        <p className="text-white text-md mb-6">
                            Baca berbagai kisah nyata dari mereka yang berjuang dan bertumbuh
                            bersama SWID.
                        </p>
                        <Link
                            to="/story"
                            className="text-white px-4 py-2 w-52 bg-primary-0 rounded hover:bg-primary-200 transition"
                        >
                            Lihat Semua Cerita →
                        </Link>
                    </div>

                    {/* Scrollable Cards */}
                    <div className="flex gap-4 overflow-x-auto p-4">
                        {stories
                            ?.sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime()
                            ) // urut terbaru
                            .slice(0, 12) // ambil 12 pertama
                            .map((story) => (
                                <div
                                    key={story._id}
                                    className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden"
                                >
                                    <div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden">
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h2 className="text-md font-semibold text-blue-800 mb-2 line-clamp-2">
                                        {story.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {story.content}
                                    </p>
                                    <Link
                                        to={`/story/${story._id}`}
                                        className="text-blue-600 text-sm font-medium hover:underline"
                                    >
                                        Baca Selengkapnya →
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            <section id="articles" className="">
                <div className="p-8 ">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-primary-0 ">
                                Artikel & Insight
                            </h2>
                            <p className="text-gray-600">
                                Temukan wawasan baru tentang kesehatan mental, self-care, dan
                                kehidupan.
                            </p>
                        </div>

                        <div className="">
                            <a
                                href="/artikel"
                                className="px-6 py-3 bg-primary-0 text-white rounded-lg shadow hover:bg-primary-1 transition-colors"
                            >
                                Lihat Semua Artikel
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto flex-nowrap no-scrollbar pb-8">
                        {[
                            {
                                title: "Mengenal Emosi: Kenapa Kita Perlu Merasakannya?",
                                desc: "Emosi bukan musuhmu. Kenali mereka agar kamu bisa berdamai dengan dirimu sendiri.",
                            },
                            {
                                title: "5 Cara Self-Care Saat Lagi Burnout",
                                desc: "Burnout itu nyata. Tapi kamu bisa belajar menenangkan diri dengan langkah kecil.",
                            },
                            {
                                title: "Mengapa Cerita Itu Menyembuhkan?",
                                desc: "Berbagi cerita bukan hanya menolong orang lain, tapi juga menyembuhkan dirimu.",
                            },
                            {
                                title: "Tips Mengelola Stres Sehari-hari",
                                desc: "Stres itu wajar, tapi kamu bisa mengelolanya agar tetap produktif dan tenang.",
                            },
                            {
                                title: "Belajar Memahami Diri Sendiri",
                                desc: "Pahami dirimu agar kamu bisa mengambil keputusan yang lebih baik dalam hidup.",
                            },
                            {
                                title: "Menemukan Arti Hidup",
                                desc: "Kadang hidup terasa kosong, tapi ada cara untuk menemukan maknanya lagi.",
                            },
                        ].map((article, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-4 text-left hover:shadow-lg transition-shadow duration-300 min-w-[300px] max-w-[300px]"
                            >
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
            </section>
            <section id="features" className="bg-gray-50 py-16 px-8 mx-8 rounded-lg">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-primary-0 mb-10">
                        Apa yang Bisa Kamu Lakukan di SWID?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10 text-left">
                        {/* Baca Cerita Sahabat */}
                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">📖</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Baca Cerita Sahabat</h3>
                                <p className="text-gray-600">
                                    Dapatkan insight dari kisah nyata orang lain yang sedang atau
                                    pernah berjuang dengan isu yang serupa.
                                </p>
                            </div>
                        </div>

                        {/* Berbagi Cerita */}
                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">🗣️</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Berbagi Cerita</h3>
                                <p className="text-gray-600">
                                    Ceritakan pengalamanmu, jadilah inspirasi, dan bantu orang lain
                                    merasa tidak sendirian.
                                </p>
                            </div>
                        </div>

                        {/* Edukasi Kesehatan Mental */}
                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">📚</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    Edukasi Kesehatan Mental
                                </h3>
                                <p className="text-gray-600">
                                    Pelajari dasar-dasar self-care, emosi, dan kesehatan mental dari
                                    sumber terpercaya.
                                </p>
                            </div>
                        </div>

                        {/* Konsultasi */}
                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">💬</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Konsultasi</h3>
                                <p className="text-gray-600">
                                    Dapatkan ruang aman untuk berbicara dengan konselor atau
                                    pendamping yang siap mendengarkan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
