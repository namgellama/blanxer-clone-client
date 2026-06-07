import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useGetAllStores } from "@/hooks/useGetAllStores";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setStore } from "@/redux/slices/vendor-store.slice";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const { stores } = useGetAllStores();
    const { store } = useAppSelector((state) => state.vendorStore);
    const router = useRouter();

    useEffect(() => {
        if (!stores) return;

        if (stores.length === 0) return router.replace("/stores/new");

        if (!store) dispatch(setStore({ store: stores[0] }));
    }, [store, stores, dispatch]);

    return <>{children}</>;
};

export default StoreProvider;
