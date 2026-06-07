const Hero = () => {
    return (
        <>
            <div className="h-24" />

            <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_60%)]" />

                <div className="relative z-10 max-w-4xl">
                    <div className="inline-block px-4 py-2 mb-6 text-sm rounded-full border border-white/20 bg-white/5 backdrop-blur">
                        The Commerce OS for Nepal
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                        Run Your Entire Business From
                        <br />
                        One System
                    </h1>

                    <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
                        Online + offline selling, payments, inventory, and
                        logistics — all from a single infrastructure.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-lg font-medium shadow-xl hover:opacity-90 transition">
                            Start Selling Online →
                        </button>
                        <button className="px-8 py-4 rounded-2xl border border-white/30 text-lg font-medium hover:bg-white/10 transition">
                            Explore Platform
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Online Channels",
                            desc: "Website, social commerce, and marketplace integrations.",
                        },
                        {
                            title: "Inventory Management",
                            desc: "Real-time stock sync across all your sales channels.",
                        },
                        {
                            title: "Payments & Logistics",
                            desc: "Accept payments and manage delivery from one dashboard.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-purple-500/50 transition"
                        >
                            <h3 className="text-xl font-semibold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;
