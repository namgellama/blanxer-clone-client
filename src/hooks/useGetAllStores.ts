import { useQuery } from "@tanstack/react-query";

import { Store } from "./useCreateStore";
import storeApi from "@/api/store.api";
import { ApiError } from "@/types/api-error";

export const useGetAllStores = () => {
    const {
        data: stores,
        isLoading,
        error,
    } = useQuery<Store[], ApiError>({
        queryFn: storeApi.getAll,
        queryKey: ["stores"],
    });

    return { stores, isLoading, error };
};
