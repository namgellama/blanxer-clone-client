"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useAppSelector } from "@/redux/hooks";

const AuthCallbackPage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const { store } = useAppSelector((state) => state.vendorStore);

    useEffect(() => {
        if (isLoading || !user || !store) return;

        router.replace("/dashboard");
    }, [isLoading, user, store]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner />
        </div>
    );
};

export default AuthCallbackPage;
