function HomePage() {
    return (
        <div className="container mx-auto">
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
                        href="#about"
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
                        <a href="#" className="text-white px-4 py-2 w-52 bg-primary-0 rounded">
                            Lihat Semua Cerita →
                        </a>
                    </div>

                    {/* Scrollable Cards */}
                    <div className="flex gap-4 overflow-x-auto p-4">
                        {/* Card 1 */}
                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="Cerita 1"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Menghadapi Rasa Takut Saat Berbicara di Depan Umum
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Dulu aku selalu gemetar saat diminta bicara. Tapi kini, aku mulai
                                menemukan caraku sendiri.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="Cerita 2"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Overthinking dan Cara Aku Melawannya
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Pikiran yang terus berputar bikin aku lelah. Tapi perlahan, aku
                                belajar menenangkan diriku.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="/assets/story3.jpg"
                                alt="Cerita 3"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Ketika Burnout Mengubah Cara Pandangku
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Aku sempat merasa hampa dan kehilangan arah. Tapi itu jadi titik
                                balik untuk mengenal diri.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>

                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="/assets/story3.jpg"
                                alt="Cerita 3"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Ketika Burnout Mengubah Cara Pandangku
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Aku sempat merasa hampa dan kehilangan arah. Tapi itu jadi titik
                                balik untuk mengenal diri.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>

                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="/assets/story3.jpg"
                                alt="Cerita 3"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Ketika Burnout Mengubah Cara Pandangku
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Aku sempat merasa hampa dan kehilangan arah. Tapi itu jadi titik
                                balik untuk mengenal diri.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>

                        <div className="min-w-[280px] max-w-[280px] bg-white rounded-lg shadow p-4 flex-shrink-0 overflow-hidden">
                            <img
                                src="/assets/story3.jpg"
                                alt="Cerita 3"
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-md font-semibold text-blue-800 mb-2">
                                Ketika Burnout Mengubah Cara Pandangku
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">
                                Aku sempat merasa hampa dan kehilangan arah. Tapi itu jadi titik
                                balik untuk mengenal diri.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="bg-blue-100 py-16 px-8 my-8 mx-8 rounded-xl">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    {/* Placeholder / Future Illustration */}
                    <div className="w-full h-[300px] bg-white rounded-lg shadow flex items-center justify-center">
                        <span className="text-gray-400">[Ilustrasi nanti di sini]</span>
                    </div>
                    {/* Text Section */}
                    <div>
                        <h2 className="text-4xl font-bold text-primary-0 mb-6">Apa Itu SWID?</h2>
                        <p className="text-gray-700 text-lg mb-6">
                            <strong>SWID (Sahabat Wellbeing Indonesia)</strong> adalah komunitas
                            support yang mendukung kamu menghadapi isu kesehatan mental seperti
                            kecemasan sosial, burnout, dan overthinking. Di sini, kamu bisa
                            bercerita tanpa takut dihakimi, mendapatkan edukasi, dan tumbuh bersama.
                        </p>
                        <a
                            href="/tentang-kami"
                            className="inline-block bg-primary-0 text-white px-6 py-3 rounded hover:bg-primary-200 transition"
                        >
                            Selengkapnya
                        </a>
                    </div>
                </div>
            </section>
            <section id="articles" className="py-16 px-8 my-8 mx-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-primary-0 mb-4">Artikel & Insight</h2>
                    <p className="text-gray-600 mb-10">
                        Temukan wawasan baru tentang kesehatan mental, self-care, dan kehidupan.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow p-4 text-left">
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <h3 className="text-lg font-semibold">
                                Mengenal Emosi: Kenapa Kita Perlu Merasakannya?
                            </h3>
                            <p className="text-gray-600 text-sm my-2">
                                Emosi bukan musuhmu. Kenali mereka agar kamu bisa berdamai dengan
                                dirimu sendiri.
                            </p>
                            <button className="text-primary-0 font-semibold mt-2">
                                Baca Selengkapnya →
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl shadow p-4 text-left">
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <h3 className="text-lg font-semibold">
                                5 Cara Self-Care Saat Lagi Burnout
                            </h3>
                            <p className="text-gray-600 text-sm my-2">
                                Burnout itu nyata. Tapi kamu bisa belajar menenangkan diri dengan
                                langkah kecil.
                            </p>
                            <button className="text-primary-0 font-semibold mt-2">
                                Baca Selengkapnya →
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl shadow p-4 text-left">
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <h3 className="text-lg font-semibold">
                                Mengapa Cerita Itu Menyembuhkan?
                            </h3>
                            <p className="text-gray-600 text-sm my-2">
                                Berbagi cerita bukan hanya menolong orang lain, tapi juga
                                menyembuhkan dirimu.
                            </p>
                            <button className="text-primary-0 font-semibold mt-2">
                                Baca Selengkapnya →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="problems" className="bg-white py-16 px-8 my-8 mx-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-primary-0 mb-10">
                        Kami Hadir Untuk Kamu yang...
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-primary-0 mb-2">
                                Sering overthinking
                            </h3>
                            <p className="text-gray-600">
                                Khawatir berlebihan sampai susah tidur atau gak bisa fokus.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-primary-0 mb-2">
                                Kecemasan sosial
                            </h3>
                            <p className="text-gray-600">
                                Takut untuk speak up, takut dinilai negatif, atau sulit berteman.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-primary-0 mb-2">
                                Burnout kerja/kuliah
                            </h3>
                            <p className="text-gray-600">
                                Merasa capek terus, kehilangan motivasi, dan merasa gak cukup.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="bg-gray-50 py-16 px-8 my-8 mx-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-primary-0 mb-10">
                        Apa yang Bisa Kamu Lakukan di SWID?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10 text-left">
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

                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">📚</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    Edukasi Kesehatan Mental
                                </h3>
                                <p className="text-gray-600">
                                    Pelajari dasar-dasar self-care, emosi, dan mental health dari
                                    sumber terpercaya.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">🗣️</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Berbagi Ceritamu</h3>
                                <p className="text-gray-600">
                                    Ingin didengar? Ceritakan pengalamanmu dan bantu orang lain
                                    merasa tidak sendirian.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-primary-0 text-3xl">✍️</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Jurnal Harian</h3>
                                <p className="text-gray-600">
                                    Tulis pikiran dan perasaanmu setiap hari untuk melacak
                                    perkembangan emosimu.
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
