"use client";

import { Logo } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const router = useRouter();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
                <Image src={Logo} alt="Logo" className="size-20" />

                <div className="hidden md:flex gap-8 text-sm text-white/80">
                    <a href="#" className="hover:text-white transition">
                        Solutions
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Product
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Pricing
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Company
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Resources
                    </a>
                </div>

                <div className="flex gap-4">
                    <Link href="/login" target="_blank">
                        <Button className="px-5 py-2 rounded-xl border border-white/30 text-sm hover:bg-white/10 transition">
                            Login
                        </Button>
                    </Link>

                    <Link href="/register" target="_blank">
                        <button className="px-5 py-2 rounded-xl text-sm bg-linear-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition shadow-lg">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
