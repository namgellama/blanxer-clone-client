import { Footer, Hero, NavBar } from "./(components)";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#101018] via-[#1b0f2e] to-[#271249] text-white">
            <NavBar />
            <Hero />
            <Footer />
        </div>
    );
}
