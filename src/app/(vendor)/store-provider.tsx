import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useGetAllStores } from "@/api/vendor/store/hooks/useGetAllStores";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setStore } from "@/redux/slices/vendor/store.slice";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const { stores, isLoading } = useGetAllStores();
    const { store } = useAppSelector((state) => state.vendorStore);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading || !stores) return;

        if (stores.length === 0) {
            router.replace("/stores/new");
            return;
        }

        if (pathname === "/stores/new") {
            router.replace("/dashboard");
            return;
        }

        if (!store) dispatch(setStore({ store: stores[0] }));
    }, [isLoading, store, stores, dispatch, router, pathname]);

    return <>{children}</>;
};

export default StoreProvider;
