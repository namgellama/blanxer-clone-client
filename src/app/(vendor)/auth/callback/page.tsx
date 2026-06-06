"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setStore, UserStore } from "@/redux/slices/vendor-store.slice";

const AuthCallbackPage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { store } = useAppSelector((state) => state.vendorStore);

    useEffect(() => {
        if (isLoading || !user) return;

        if (user.stores.length === 0) {
            return router.replace("/stores/new");
        }

        if (!store) {
            const selectedStore: UserStore = user.stores[0];
            dispatch(
                setStore({
                    store: selectedStore,
                }),
            );
            return;
        }

        router.replace("/dashboard");
    }, [isLoading, user, store]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner />
        </div>
    );
};

export default AuthCallbackPage;
