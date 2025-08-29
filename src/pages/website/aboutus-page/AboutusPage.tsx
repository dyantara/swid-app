function AboutusPage() {
    return (
        <div className="container mx-auto space-y-4 mt-10">
            <div className="max-w-5xl mx-auto">
                {/* Hero */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-0 mb-4">Tentang SWID</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        SWID (Share What I Deal) adalah platform untuk berbagi cerita, belajar, dan
                        mendapatkan dukungan terkait kesehatan mental. Kami percaya bahwa setiap
                        cerita punya kekuatan untuk menyembuhkan.
                    </p>
                </section>

                {/* Visi Misi */}
                <section className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-semibold text-primary-0 mb-2">Visi</h2>
                        <p className="text-gray-600">
                            Menjadi ruang aman dan suportif bagi setiap orang untuk berbagi
                            pengalaman dan mendapatkan edukasi tentang kesehatan mental.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-semibold text-primary-0 mb-2">Misi</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Menyediakan platform berbagi cerita yang inklusif.</li>
                            <li>Menyebarkan edukasi kesehatan mental dari sumber terpercaya.</li>
                            <li>Membuka akses konsultasi yang mudah dan terjangkau.</li>
                            <li>Membangun komunitas suportif yang saling menguatkan.</li>
                        </ul>
                    </div>
                </section>

                {/* Tim */}
                <section>
                    <h2 className="text-2xl font-semibold text-center text-primary-0 mb-8">
                        Tim Kami
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                        {[
                            {
                                name: "Ilham Maulana",
                                role: "Frontend Developer & UI/UX Designer",
                                img: "https://randomuser.me/api/portraits/men/32.jpg",
                            },
                            {
                                name: "Siti Aisyah",
                                role: "Content Writer",
                                img: "https://randomuser.me/api/portraits/women/44.jpg",
                            },
                            {
                                name: "Ahmad Fajar",
                                role: "Mental Health Advisor",
                                img: "https://randomuser.me/api/portraits/men/56.jpg",
                            },
                        ].map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-gray-500 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AboutusPage;
