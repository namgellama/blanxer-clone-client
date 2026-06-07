import { useQuery } from "@tanstack/react-query";

import storeApi from "@/api/vendor/store";
import { ApiError } from "@/types/api-error";
import { Store } from "@/types/vendor/store";

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
